const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const teamArray = [];
// Base Questions to keep Dry
const baseQuestions = [{
        type: 'input',
        name: 'name',
        message: "Please enter the employee\'s: name:",
    },

    {
        type: 'input',
        name: 'id',
        message: "Please enter the employee\'s: id:",
    },

    {
        type: 'input',
        name: 'email',
        message: "Please enter the employee\'s email:",
    }
];
// Manager Questions
const managerQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'officeNumber',
        message: "Please enter the office number:",
    },
];
// Intern Questions
const internQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'school',
        message: 'Please enter your last or current place for education:',
    },
];
// Engineer Questions
const engineerQuestions = [
    ...baseQuestions,
    {
        type: 'input',
        name: 'github',
        message: 'Please enter your GitHub username:',
    },
];
// Hiring a manager
inquirer.prompt(managerQuestions)
    .then((response) => {
        const manager = new Manager(response.name, response.id, response.email, response.officeNumber);
        teamArray.push(manager);
        determineEmployee();
    });
//Determine Employee to Hire
function determineEmployee() {
    const employeeQuestions = [{
        name: 'choice',
        type: 'list',
        message: 'What would you like to add:',
        choices: ['Intern', 'Engineer', 'Done'],
    }, ];
    inquirer.prompt(employeeQuestions)
        .then((answers) => {
            if (answers.choice === 'Intern') {
                internInfo();
            }
            if (answers.choice === 'Engineer') {
                engineerInfo();
            }
            if (answers.choice === 'Done') {
                createHTMLFile();
            }
        })
}
//Create Intern for Team
function internInfo() {
    inquirer.prompt(internQuestions)
        .then((response) => {
            const intern = new Intern(response.name, response.id, response.email, response.school);
            teamArray.push(intern);
            determineEmployee();
        })
}
//Create Engineer for Team
function engineerInfo() {
    inquirer.prompt(engineerQuestions)
        .then((response) => {
            const engineer = new Engineer(response.name, response.id, response.email, response.github);
            teamArray.push(engineer);
            determineEmployee();
        })
}

function createHTMLFile() {
    // write the html file from the team array
    try {
        const html = render(teamArray);
        // create the file using fs library
        fs.writeFileSync(outputPath, html);
    } catch (error) {
        console.log(error);
    }
}

//init();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```