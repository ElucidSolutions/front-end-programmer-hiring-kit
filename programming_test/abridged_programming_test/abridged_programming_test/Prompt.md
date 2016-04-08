Programming Assessment
======================

Introduction
------------

First, thank you for applying to Elucid's software development team! We greatly appreciate your interest.

In this programming exercise, you will be asked to create a simple JavaScript library and to use the functions that you define in that library to create a small website. Don't panic! We are not trying to catch you on some obscure programming feature, or quiz you on some arcane programming methodology. Instead, we created this exercise to highlight your programming style - your ability to write clear, concise, and well structured code that correctly satisfies a set of simple specifications.

In this assessment, you will be given three files:

* index.html

  The HTML file that will represent your small website.

* index.js

  The JavaScript file that will contain your simple JavaScript library.

* index.css

  The CSS Stylesheet that should contain any CSS directives.

Please take a moment to familiarize yourself with the contents of each.

You will be given 2 hours to complete the exercises below. You may reference any online material that you'd like. If you find that anything is unclear, please, do no hesitate to ask for help. We will be happy to assist you and the time taken to do so will not be counted against you.

Good Luck!

Rubric
------

We will evaluate your code against five criteria:

1. Correctness

  * Does your code execute without errors within Chrome (version 48+)? 
  * Does your code correctly implement the specified functions?
  * Does your code correctly handle special cases noted within the prompts?

2. Clarity

  * Is your code consistently formatted?
  * Is your code well documented?
  * Do you use intelligible and meaningful function and variable names?

3. Structure

  * Do you use higher-order functions and function composition to structure your code?
  * Is your code well organized linearly?

4. Conciseness

  * Have you factored out common functions and shared variables to minimize redundancy?

5. Completeness

  * Do your functions satisfy their specifications?
  * Have you completed all of the given exercises?

Exercises
---------

You have been asked to create a small JavaScript library that will manipulate book citations and to use the functions defined within that library to create a simple website.

This library will consist of a collection of JavaScript functions that each accept a citation array and return either information about the citation array or some collection of citations from the array.

Citation arrays will contain citation objects that will have the following structure:

> {title: STRING, authors: [STRING], year: INT}

where for every citation: 

  * citation.title, is a string that represents the cited book's title

  * citation.authors, is a string array that lists the referenced work's authors

  * and citation.year, is an integer that represents the year in which the given book was published.

Once you have defined all of the functions that make up the book citation library, you will be asked to demonstrate your knowledge of CSS by styling a simple HTML table given in index.html.

1. Create a function that accepts a citation array and an integer that represents a year and returns those citation objects within the array that were published in the given year.

2. Create a function that accepts a citation array and a string that represents an author's name and returns those array elements that were written by the given author.

3. Code a function that accepts a citation array and a string and returns those array elements whose titles contain the given string as a substring.

  Note: this function should return those entries that match the given string exactly - I.E. case sensitive.

4. Write a function that accepts a citation array object and returns an array listing the names of those authors listed in the array. The returned array should not contain any duplicate entries and should be sorted alphabetically. 

5. Code another function that accepts a citation array and an object that represents a search query and returns those array elements that match the query.

  Note: Every search query object must have the following structure: 

  > {title: STRING, authors: [STRING], years: {start: INT, end: INT}}

  For example:

  > {title: 'Concrete', authors: ['Knuth'], years: {start: 1900, end: 2000}}

  Every search parameter is optional. If the search query does not contain any search parameters, return every database entry.

6. index.html contains a simple HTML table displaying the citations listed within the global DATABASE variable defined in index.js.

  In the index.css file include whatever CSS directives you need to ensure that the table:

  * displays even numbered rows with a light blue background

  * and highlights rows with a light orange background whenever the a user hovers their mouse over them.
