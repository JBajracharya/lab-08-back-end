# lab-08-back-end

**Author**: Phong Doan and Jitendra Bajracharya
**Version**: 4.0.0 (increment the patch/fix version number if you make more commits past your first submission)

## Overview
<!-- Provide a high level overview of what this application is and why you are building it, beyond the fact that it's an assignment for this class. (i.e. What's your problem domain?) -->
When the user visits the website and enters the location it populates map, weather data, event data from the database or if the database is empty it gets the data from api and stores it in the database. 

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
npm init
npm install pq express cors superagent dotenv
create database
psql -d <database-name> -f <path/to/filename>



## Architecture
<!-- Provide a detailed description of the application design. What technologies (languages, libraries, etc) you're using, and any other relevant design information. -->
psql, express, node, npm, cors, superagent, ajax, javascript, api

## Change Log
<!-- Use this area to document the iterative changes made to your application as each feature is successfully implemented. Use time stamps. Here's an examples:
01-01-2001 4:59pm - Application now has a fully-functional express server, with a GET route for the location resource.-->
10:30am: created database, added all dependencies
12:00pm: user imput checks to see if database contains data that the query is linked with, if not the apis will grab the data and input into the database and show the results
## Credits and Collaborations
<!-- Give credit (and a link) to other people or resources that helped you build this application. -->
Assignment Partner: Phong Doan, Jitendra Bajracharya