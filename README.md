# NodeJS Streams: Cheatsheet and examples

##### Attached JS files

- Main example: [index.js](./index.js), [server.js](./server.js)
- Stream overview files, showing the API and provided events:
	- [Readables.js](./Readable.js)
	- [Writables.js](./Writable.js)
	- [Transform.js](./Transform.js)
- A crypto wrapper: [crypto.js](./crypto.js)

##### Running examples

```sh
git clone https://github.com/pguth/node-streams.git
cd node-streams
npm install
budo --live --host localhost index.js
# in a second terminal:
node server.js
# Now go to http://localhost:9966 and select one of the text files with the file picker.
# Within index.js uncomment the function calls that are of interest to you.
```

## Cheatsheet
<sup>99% of this text stems from [https://nodejs.org/api/stream.html]()</sup>

> Almost all Node.js programs, no matter how simple, use Streams in some way.

All streams are instances of EventEmitter. You can load the Stream base classes by doing require('stream'). It is not necessary to implement Stream interfaces in order to consume streams in your programs.

#### Three major concepts
<sup>See: [Node.js streams demystified](https://gist.github.com/joyrexus/10026630)</sup>

1. **Source** - Where the data comes from.
2. **Pipeline** - Where you filter or transform your data as it passes through,
3. **Sink** - Where your data ultimately goes.

#### Five classes of streams
<sup>See: [Node.js streams demystified](https://gist.github.com/joyrexus/10026630)</sup>

1. **Readable** - sources
2. **Writable** - sinks
3. **Duplex** - both source and sink
4. **Transform** - in-flight stream operations
5. **Passthrough** - stream spy

# Consume streams

## Readables

Streams start out in paused mode. The fastest way to get data out of a readable is to subscribe to the `data` event.

To inititate **flowing mode**:

- Add a data event handle
- Call `.resume()`
- Call `.pipe()` to send data to a writable
- If the stream has not been explicitly paused: attach a `data` event listener.

Calling `.read()` does not switch the stream into flowing mode.

To inititate **paused mode**:

- Call `.pause()`  
If pipe desinations are set calling `.pause()` does not guarantee that the stream stays paused since they could ask for more data.
- Remove any `data` event handlers *and* remove all pipe destinations by caling `.unpipe()`.

**Strategies** for reading a readable:

- In flowing mode:
    - Attach a `.pipe()` destination.
    - Subscribe to the `data` event (and unpause if explicitly paused).
- In paused mode:
    - Subscribe to the `readable` event and call `.read()` on every event (until the `end` event fires).

### Events
  - `data`
  - `end`
  - `close`
  - `error`
  - `readable`

### Methods
  - `.pipe(destination[, options])` → \<stream.Readable> destination stream  
Multiple destinations can be piped to safely.
    - options \<Object> Pipe options
        - **end** \<Boolean> End the writer when the reader ends. Default = true
  - `.unpipe([destination])`
  - `.read([size])` → \<String> | \<Buffer> | \<Null>  
	This method should only be called in paused mode. In flowing mode, this method is called automatically until the internal buffer is drained.  
	Causes a `data` event.  
	The read() method pulls some data out of the internal buffer and returns it. If there is no data available, then it will return null.
  - `.isPaused()` → \<Boolean>
  - `.pause()` → this
  - `.resume()` → this
  - `.setEncoding(encoding)` → this
  - `.readable.unshift(chunk)`  
  	Unlike stream.push(chunk), stream.unshift(chunk) will not end the reading process by resetting the internal reading state of the stream. Following the call to unshift() with an immediate stream.push('') will reset the reading state appropriately, however it is best to simply avoid calling unshift() while in the process of performing a read.
  - `.wrap(stream)`

## Writables

### Events

- `drain`  
If `.write()` returned false, `drain` will indicate when to write again.
- `error`
- `finish`  
When `.end()` has been called and all data is flushed.
- `pipe` → \<stream.Readable> source stream  
When `.pipe()` is called
- `unpipe` → \<stream.Readable> source stream

### Methods

- `.cork()`  
Forces buffering of all writes. Continues on `.uncork()` or `.end()`.
- `.end([chunk][, encoding][, callback])`  
Callback for when the stream is finished.
- `.setDefaultEncoding(encoding)`
- `.uncork()`
- `.write(chunk[, encoding][, callback])` → bool  
Callback for when this chunk of data is flushed.
The return value indicates if you should continue writing right now. This return value is strictly advisory. Wait for the 'drain' event before writing more data.


# Implement streams

1. **Extend** the appropriate parent class in your own subclass.
2. **Call** the appropriate parent class constructor in your constructor, to be sure that the internal mechanisms are set up properly.
3. **Implement** one or more specific methods, as detailed below.

| Use-case                  | Class     | Method(s) to implement    
| ------------------------- | --------- | ------------------------- 
| Reading only              | Readable  | \_read!                     
| Writing only              | Writable  | \_write!, \_writev?           
| Reading and writing       | Duplex    | \_read!, \_write!, \_writev?    
| Operate on written data,
  then read the result      | Transform | \_transform!, \_flush?         

In your implementation code, it is very important to never call the methods described in API for Stream Consumers. Otherwise, you can potentially cause adverse side effects in programs that consume your streaming interfaces.

**Note:** Method prefixed with an underscore are internal to the class that defines it, and should not be called directly by user programs. However, you are expected to override this method in your own extension classes.


## Readable

`stream.Readable.call(this, [options])`

- options \<Object>
    - **highWaterMark** \<Number> The maximum number of bytes to store in the internal buffer before ceasing to read from the underlying resource. Default = 16384 (16kb), or 16 for objectMode streams
    - **encoding** \<String> If specified, then buffers will be decoded to strings using the specified encoding. Default = null
    - **objectMode** \<Boolean> Whether this stream should behave as a stream of objects. Meaning that stream.read(n) returns a single value instead of a Buffer of size n. Default = false
    - **read** \<Function> Implementation for the stream._read() method.
- **Methods**
    - `._read([size])`  
	When _read() is called, if data is available from the resource, the _read() implementation should start pushing that data into the read queue by calling this.push(dataChunk). _read() should continue reading from the resource and pushing data until push returns false, at which point it should stop reading from the resource. Only when _read() is called again after it has stopped should it start reading more data from the resource and pushing that data onto the queue.  
	The size argument is advisory.
	- `.push(chunk[, encoding])` → \<Boolean> Whether or not more pushes should be performed  
	If a value other than null is passed, The push() method adds a chunk of data into the queue for subsequent stream processors to consume. If null is passed, it signals the end of the stream (EOF), after which no more data can be written.


## Writable
    
`stream.Writable.call(this, [options])`

- options \<Object>
	- **highWaterMark** \<Number> Buffer level when stream.write() starts returning false. Default = 16384 (16kb), or 16 for objectMode streams.
	- **decodeStrings** \<Boolean> Whether or not to decode strings into Buffers before passing them to stream._write(). Default = true
	- **objectMode** \<Boolean> Whether or not the stream.write(anyObj) is a valid operation. If set you can write arbitrary data instead of only Buffer / String data. Default = false
	- **write** \<Function> Implementation for the stream._write() method.
	- **writev** \<Function> Implementation for the stream._writev() method.
- **Methods**
	- `._write(chunk, encoding, callback)`  
	"chunk" Will always be a buffer unless the decodeStrings option was set to false and an encoding is given.  
	Call the often "next" named callback function (optionally with an error argument) when you are done processing the supplied chunk.


## Duplex

`stream.Duplex.call(this, [options])`

- options \<Object>
    - **allowHalfOpen** \<Boolean> Default = true. If set to false, then the stream will automatically end the readable side when the writable side ends and vice versa.
    - **readableObjectMode** \<Boolean> Default = false. Sets objectMode for readable side of the stream. Has no effect if objectMode is true.
    - **writableObjectMode** \<Boolean> Default = false. Sets objectMode for writable side of the stream. Has no effect if objectMode is true.


## Transform

`stream.Transform.call(this, [options])`

- options \<Object>
    - **transform** \<Function> Implementation for the stream._transform() method.
    - **flush** \<Function> Implementation for the stream._flush() method.
- **Events**
    - `finish`, `end`  
    The 'finish' and 'end' events are from the parent Writable and Readable classes respectively. The 'finish' event is fired after stream.end() is called and all chunks have been processed by stream.\_transform(), 'end' is fired after all data has been output which is after the callback in stream.\_flush() has been called.
- **Methods**
    - `._transform(chunk, encoding, callback)`  
    "chunk" will always be a buffer unless the decodeStrings option was set to false and an encoding is given.  
    Call the callback function (optionally with an error argument and data) when you are done processing the supplied chunk.  
    If you supply a second argument to the callback it will be passed to the push method.
    - `._flush(callback)`  
    This will be called at the very end, after all the written data is consumed, but before emitting 'end' to signal the end of the readable side. Call the callback function (optionally with an error argument) when you are done flushing any remaining data.


## Simplified Constructor API

In simple cases there is now the added benefit of being able to construct a stream without inheritance by passing the appropriate methods without the "_" as constructor options:

```js
var duplex = new stream.Duplex({
  read: function(n) {
    // sets this._read under the hood

    // push data onto the read queue, passing null
    // will signal the end of the stream (EOF)
    this.push(chunk);
  },
  write: function(chunk, encoding, next) {
    // sets this._write under the hood

    // An optional error can be passed as the first argument
    next()
  }
});
```


## Acknowledgements :fireworks:

This material was produced as a preparation of myself for a presentation in a row of presentations held together with these cool guys:

- [Streams Introduction](http://slides.com/queicherius/reactive-pattern#/) by [David](https://github.com/queicherius).
- RxJS introduction by [Paul](https://github.com/paulsonnentag).
