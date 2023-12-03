# Project - TastyTV

> TastyTV is a movie and tv show live-streaming service.Client requires promotional website to pubicisize the company and its offerings.
> Live demo [_here_](https://jxrtpd.csb.app/).

## Table of Contents

- [General Info](#general-information)
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Screenshots](#screenshots)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)

## General Information

# Introduction

Project is to create a site that will help users discover movies and tv shows.
The main aspects it intends to solve when creating the website is to promote the company and its services.

# Project purpose

Requrements see below:-

- Display information about the company and social links (Home page).
- Proggramme stream schedule twelve hourly (Programme page). - Regular announcements.
  Further to above,see following:-
- Special feature, which allows people to get a random tasty movie reccomendation from client collection. - Website links to clients social media accounts on youtube, instagram, twitter, facebook and linkedin.

- Wireframes and User Stories see below
  > [_here_](https://miro.com/welcomeonboard/eEtWTWxKMmhXcjA1bDVPYXpPVEdVYW1ZaFlnUHN1eERJam1IaUQzRXdqS3o2NFZXT2ZjNlpnamd5a1h1WGFBbnwzMDc0NDU3MzYzNTg5OTQ3NDMx?invite_link_id=699842500565).

## Screenshots

![User Stories](./assets/img/userstories.png)
![Wireframe](./assets/img/wireframe2.png)

## Technologies Used

- HTML - version: 5.0
- CSS - version: 3.0
- JavaScript: version ES6

## Features

List the ready features here:

- Links to social media accounts when clicked opens the link in a new tab.
- Provides a random movie suggestion when clicked.
- Once registered a message appears at the bottom of the page.
- Clear the registration form if user needs to start again.

## Setup

Where is it located?

> Web link [_here_](https://1jyqr.csb.app/).
> CodeSandbox link [_here_](https://codesandbox.io/s/project-tastytv-sp-1jyqr).

## Planning Stage

- With reference to client brief, a wireframe and user story was created.
- I looked at class tutorials, metacritic, apple and imdb for conceptual ideas (streaming sites not promotional).
- Sitmap starts with the Homepage (static) which will connect:-
  - Announcement
  - Programme
  - Random movie page
  - Registration
    As well as including the client initial requirements. The wireframe includes some extras such as the burger menu, sign in button, search feature etc.

## Development Stage

#Retrospective


## Usage

How does one go about using it?
Various use cases and code examples here.

- Various web browsers such as Chrome, Firefox, Edge etc.
- Different OS e.g. Windows and Mac.
- Different devices for a responsive test.
  Not responsive on all devices e.g. mobiles & tablets.

Usage across pages listed below:-
Homepage:-

- Includes placeholder for image and video (if required).
- When clicked, the links to social media pages in the company information box open in a new tab. Another option is also in the footer but are not active.
  `<a href="https://www.youtube.com/" target="_blank">`
- When clicked, Navigate between pages located in the header.
  `<a href="announcement.html">Announcement</a>`

Announcement:-

- Includes palceholder for images and future announcements (lorem ipsum).

Programming:-

- Display the twelve hour streaming programme schedule.
  So on a Monday from 09:00 to 21:00 one movie will repeat.
  Then from 21:00 to 09:00(Tuesday) a different movie will repeat.
  See programme.js file for code.

Random:-

- Includes a feature to get a random movie by a click of a button.
- When clicked on "Recommend a Movie", it provides a random movie suggestion.
  See random.js file for code.

Registration:-

- Includes text fields, text areas, radio and check buttons.
- When register button is clicked, it displays a message.
- When clicked on the reset button, it deletes the content.
  see registration.js file for code.

## Project Status

Project is: _Complete_

## Problem-Solving Strategy

- Break down client breif into smaller sections to work on each day.
- Reread the client breif, wireframe and user stories.
- Look at my resources i.e what I have been given & what is required.
- Debugging options (Understand and analyse problem)
  - W3C HTML and CSS validator when created or made changes to files.
  - console.log to check results when implementing code or debugging.
  - use debugger for functions looking through scope tab and compared with tutorial.
  - Read through code block by block.
  - Check where sections of code are related to each other.
  - rewrote block of code from scratch to see if it helps debug.
- Get parts of the site and code checked by someone besides myself for a fresh perspective.

## Room for Improvement

Room for improvement:

- Programming page needs to be edited to make it readable.
- Registration - form fields require improvement e.g. password field does not hide password.
- Upload more content, style and interactive.
- Orientation of some of the images/vid could be tilted.
- Get the images to enlarge when user hovers over it.
- Nav links could go in the burger menu as the header could be better.
- Could be improved by reducing the number of pages i.e putting some of the content into sections on the same page.
- Extra's test file has helped me figure out that the html has some issue with its layout.

To do:

- Create responsive website and also possible app for user friendly, quicker access and save having to download content from the server (cache on app).
- Burger menu could be extra feature added if client requests for it to include social media links.
- When hover over text changes color or size (images)
- Implement icons instead of sign in button or text links. Along with social media icons.
- Random movie pages to automatically give suggestions without clicking the button.
- Open sign in form in a new window when clicked sign in.
- Some more extra features from the user stories copy.
- See movie ratings and reviews in the programme and reccomendation page.
- The registration process to show suggesstions if details are incorrect.

## Acknowledgements

Give credit here.

- This project was inspired by class tutorials, metacritic, apple and imdb.
- This project was based on [this tutorial](https://www.example.com).
- [Metacritic](https://www.metacritic.com/).
- [IMDB](https://www.imdb.com/).
- [Apple](https://www.apple.com/uk/).
- [README](https://github.com/ritaly/README-cheatsheet).
- [Flexbox & Grid](https://mugx7.csb.app/).
- [Flexbox & Grid practice](https://3ojfd.csb.app/).
- [CSS grid](https://1egol.csb.app/).
- [prework](https://c7nnn.csb.app/).
- [prework test](https://sqeoc.csb.app/).
- [ojects & callbacks](https://lpgkn.csb.app/)
- [Random](https://stackoverflow.com/questions/4550505/getting-a-random-value-from-a-javascript-array)
- [Javascript first steps](https://nsd4c.csb.app/index.js)
- [DOM Rainbow Loops](https://g5nbf.csb.app/)
- [Practice Excercise 2](https://t9y4s.csb.app/#page-home)
- [Assignment Arrays](https://hpd72.csb.app/)
- [Freecodecamp Loops](https://www.freecodecamp.org/news/javascript-array-of-objects-tutorial-how-to-create-update-and-loop-through-objects-using-js-array-methods/)
- [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach).
- [DOM manipulation study](https://mpqcw.csb.app/)
- [CSS tricks](https://css-tricks.com/snippets/css/a-guide-to-flexbox/#flexbox-properties)
- [CSS tricks](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [W3schools - onreset](https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_onreset3).
- [W3schools](https://www.w3schools.com/).
- [MDN](https://developer.mozilla.org/en-US/).

## Contact

Created by [Stanton] - If any questions, feel free to contact me.
