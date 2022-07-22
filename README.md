# Library

This is a simple library app that uses the Web Storage API.

**Link to project:** https://vzmars.github.io/library/

![alt text](https://i.imgur.com/JiLb9It.png)

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

There are 3 classes used in this app. The Book class holds all the details of a book. The Library class holds all the books in an array and has all the logic regarding adding/removing a book. The Display Controller class is in charge of displaying everything and has all the logic related to localStorage. The user’s library is saved to localStorage and if their library is empty it adds some default books to the library. There is also form validation to prevent users from submitting a book without any data.

## Optimizations:

I would like to remove all the logic related to localStorage from the Display Controller class and move it all to a class of its own. I would also like to limit the use of global variables used in this project.

## Lessons Learned:

This was a great opportunity to use the Web Storage API to have persistent data even when the user has closed and reopened their browser. Adding the form validation was also useful to prevent users from submitting books with no title, author, and page count.

## More Projects:

Take a look at these other projects that I have in my portfolio:

**Jikan App:** https://github.com/vzMars/jikan-app

**TodoList:** https://github.com/vzMars/todo-list

**Restaurant Page:** https://github.com/vzMars/restaurant-page
