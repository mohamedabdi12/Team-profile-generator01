# Team-profile-generator01

Table of Contests


-Description -Instalation -Usage -Licences -Contribution -Test -Question

Description

As a manager I want to generate a webpage that displays my team's basic info so that I have quick access to emails and GitHub profiles

Install

npm install

Usage

The project must generate a team.html page in the output directory, that displays a nicely formatted team roster. Each team member should display the following in no particular order:

*Name

*Role

*ID

Role-specific property (School, link to GitHub profile, or office number)

Licence

None

Contribution

Use validation to ensure that the information provided is in the proper expected format.

* Add the application to your portfolio.


Test

npm run test

Questions

*mohamedabdi12 GitHub

*Email lovegoldone@gmail.com


Screen Shots


<img width="1440" alt="Screenshot 2020-07-11 at 9 45 04 PM" src="https://user-images.githubusercontent.com/63940676/87239096-e1a3ce00-c3bf-11ea-9a8d-10b0f1b7fb8d.png">


## Video Demo

https://drive.google.com/file/d/11LSGLD8GoIw4nDRH5qyCdbzNfKi3qqoU/view

![giphy](https://user-images.githubusercontent.com/63940676/87333728-63941400-c4f2-11ea-91d3-ed0214526a05.gif)


# Techniques and Technologies Used to make this project.


This app was created using Object-Oriented Programming concepts, namely using classes and constructors to create "team member" objects based on information entered by the user. The app is run using Node.js, and uses the "Inquirer" and "FS" node modules. Files for different objects are also stored in separate .js files and passed among one another using module.exports and require.

This app uses concepts from Test-Driven Development. Jest is used to perform tests on all the class constructors to ensure that they behave as expected. The FS node module is used to generate an HTML file from strings written in JavaScript. Since the app will work no matter how many team members the user adds to the system, the HTML is built in a piecemeal fashion, starting with the head and part of the body. For each team member object created, a new column with a card inside containing the team member information is added. Then when the last member has been added, the last bit of the HTML is added to the file. One complication experienced during this process was that since the fs.appendFile method is asynchronous, the bottom part of the HTML could be added before the HTML containing information on the last team member had been added. In order to deal with this, the function that adds the team member information to the HTML was converted into a promise, and only once the promise was resolved would the bottom part of the HTML be added to the output file.