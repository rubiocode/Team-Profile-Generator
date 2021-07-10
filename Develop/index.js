const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");

const Intern = require("./lib/Intern");

const inquirer = require('inquirer');

const fs = require('fs');

const members = [];

const questions = [
    {
        type: 'input',
        name: 'name',
        message: "What is the employee's full name?",
        validate: nameInput => (nameInput ? true : "You MUST enter your full name")
    },
    {
        type: 'input',
        name: 'id',
        message: "What is the employee's ID?",
        validate: idInput => (idInput ? true : "You MUST enter your employee's ID")
    },
    {
        type: 'input',
        name: 'email',
        message: "What is the employee's email?",
        validate: emailInput => (emailInput ? true : "You MUST enter your email")
    },
    {
        type: 'list',
        name: 'role',
        message: "What is the employee's role?",
        choices: ['Manager', 'Engineer', 'Intern'],
        validate: roleList => (roleList ? true : "You MUST choose one")
    },
    {
        type: 'input',
        name: 'officeNumber',
        message: "What is the manager's office number?",
        when: (response) => response.role === 'Manager',
        validate: officeNumberInput => (officeNumberInput ? true : "You MUST enter the manager's office number")
    },
    {
        type: 'input',
        name: 'school',
        message: "What school is the intern attending?",
        when: (response) => response.role === 'Intern',
        validate: schoolInput => (schoolInput ? true : "You MUST enter school name")
    },
    {
        type: 'input',
        name: 'github',
        message: "What is the engineer's GitHub username?",
        when: (response) => response.role === 'Engineer',
        validate: githubInput => (githubInput ? true : "You MUST enter GitHub username")
    },
]

const promptUser = () => {
    return inquirer
        .prompt(questions)
};

const writeToFile = (response) => {

    const id= response.id;
    const email= response.email;
    const name= response.name;
    const role = response.role;

    switch (role) {
        case 'Manager':
            const manager= new Manager(name, id, email, response.officeNumber);
            employees.push(manager);
            break;
        case 'Intern':
            const intern= new Intern(name, id, email, response.school);
            employees.push(intern);
            break;
        case 'Engineer':
            const engineer= new Engineer(name, id, email, response.github);
            employees.push(engineer);
            break;
    }

};

const init = () => {
    promptUser()
    .then((response)=>writeToFile(response))
    .then(() => console.log('Congratulations! You have successfully created your team profile.'))
    .catch((err) => console.error(err));
};
init();