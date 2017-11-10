One of the most important aspects of writing maintainable code is being able to notice the recurring themes in that code and optimize them. This is an area where knowledge of design patterns can prove invaluable.

In the first part of this book, we will explore the history and importance of design patterns which can really be applied to any programming language. If you're already sold on or are familiar with this history, feel free to skip to the chapter "What is a Pattern?" to continue reading.

Design patterns can be traced back to the early work of an architect named Christopher Alexander. He would often write publications about his experience in solving design issues and how they related to buildings and towns. One day, it occurred to Alexander that when used time and time again, certain design constructs lead to a desired optimal effect.

In collaboration with Sara Ishikawa and Murray Silverstein, Alexander produced a pattern language that would help empower anyone wishing to design and build at any scale. This was published back in 1977 in a paper titled "A Pattern Language", which was later released as a complete hardcover book.

Some 30 years ago, software engineers began to incorporate the principles Alexander had written about into the first documentation about design patterns, which was to be a guide for novice developers looking to improve their coding skills. It's important to note that the concepts behind design patterns have actually been around in the programming industry since its inception, albeit in a less formalized form.

One of the first and arguably most iconic formal works published on design patterns in software engineering was a book in 1995 called Design Patterns: Elements Of Reusable Object-Oriented Software. This was written by Erich Gamma,Richard Helm,Ralph Johnson andJohn Vlissides - a group that became known as the Gang of Four (or GoF for short).

The GoF's publication is considered quite instrumental to pushing the concept of design patterns further in our field as it describes a number of development techniques and pitfalls as well as providing twenty-three core Object-Oriented design patterns frequently used around the world today. We will be covering these patterns in more detail in the section "Categories of Design Patterns".

In this book, we will take a look at a number of popular JavaScript design patterns and explore why certain patterns may be more suitable for your projects than others. Remember that patterns can be applied not just to vanilla JavaScript (i.e standard JavaScript code), but also to abstracted libraries such as jQuery or dojo as well. Before we begin, let’s look at the exact definition of a "pattern" in software design.





What is a Pattern?

A pattern is a reusable solution that can be applied to commonly occurring problems in software design - in our case - in writing JavaScript web applications. Another way of looking at patterns are as templates for how we solve problems - ones which can be used in quite a few different situations.

So, why is it important to understand patterns and be familiar with them? Design patterns have three main benefits:

Patterns are proven solutions: They provide solid approaches to solving issues in software development using proven techniques that reflect the experience and insights the developers that helped define them bring to the pattern.
Patterns can be easily reused:A pattern usually reflects an out of the box solution that can be adapted to suit our own needs. This feature makes them quite robust.
Patterns can be expressive:When we look at a pattern there’s generally a set structure and vocabulary to the solution presented that can help express rather large solutions quite elegantly.
Patterns are not an exact solution. It’s important that we remember the role of a pattern is merely to provide us with a solution scheme. Patterns don’t solve all design problems nor do they replace good software designers, however, they do support them. Next we’ll take a look at some of the other advantages patterns have to offer.

Reusing patterns assists in preventing minor issues that can cause major problems in the application development process.What this means is when code is built on proven patterns, we can afford to spend less time worrying about the structure of our code and more time focusing on the quality of our overall solution. This is because patterns can encourage us to code in a more structured and organized fashion avoiding the need to refactor it for cleanliness purposes in the future.
Patterns can provide generalized solutions which are documented in a fashion that doesn't require them to be tied to a specific problem. This generalized approach means that regardless of the application (and in many cases the programming language) we are working with, design patterns can be applied to improve the structure of our code.
Certain patterns can actually decrease the overall file-size footprint of our code by avoiding repetition.By encouraging developers to look more closely at their solutions for areas where instant reductions in repetition can be made, e.g. reducing the number of functions performing similar processes in favor of a single generalized function, the overall size of our codebase can be decreased. This is also known as making code more DRY.
Patterns add to a developer's vocabulary, which makes communication faster.
Patterns that are frequently used can be improved over time by harnessing the collective experiences other developers using those patterns contribute back to the design pattern community. In some cases this leads to the creation of entirely new design patterns whilst in others it can lead to the provision of improved guidelines on how specific patterns can be best used. This can ensure that pattern-based solutions continue to become more robust than ad-hoc solutions may be.


We already use patterns everyday

To understand how useful patterns can be, let's review a very simple element selection problem that the jQuery library solves for us.

Imagine that we have a script where for each DOM element found on a page with class "foo" we wish to increment a counter. What's the most efficient way to query for this collection of elements? Well, there are a few different ways this problem could be tackled:

Select all of the elements in the page and then store references to them. Next, filter this collection and use regular expressions (or another means) to only store those with the class "foo".
Use a modern native browser feature such as querySelectorAll() to select all of the elements with the class "foo".
Use a native feature such as getElementsByClassName() to similarly get back the desired collection.
So, which of these options is the fastest? It's actually option 3. by a factor of 8-10 times the alternatives. In a real-world application however, 3. will not work in versions of Internet Explorer below 9 and thus it's necessary to use 1. where both 2. and 3. aren't supported.

Developers using jQuery don't have to worry about this problem however, as it's luckily abstracted away for us using the Facade pattern. As we'll review in more detail later, this pattern provides a simple set of abstracted interfaces (e.g $el.css(), $el.animate()) to several more complex underlying bodies of code. As we've seen, this means less time having to be concerned about implementation level details.

Behind the scenes, the library simply opts for the most optimal approach to selecting elements depending on what our current browser supports and we just consume the abstraction layer.

We're probably all also familiar with jQuery's $("selector"). This is significantly more easy to use for selecting HTML elements on a page versus having to manually opt for getElementById(), getElementsByClassName(), getElementByTagName() and so on.

Although we know that querySelectorAll() attempts to solve this problem, compare the effort involved in using jQuery's Facade interfaces vs. selecting the most optimal selection paths ourselves. There's no contest! Abstractions using patterns can offer real-world value.

We'll be looking at this and more design patterns later on in the book.

--
The text is an excerpt from "Learning JavaScript Design Patterns" a book by Addy Osmani: https://addyosmani.com/resources/essentialjsdesignpatterns/book/
