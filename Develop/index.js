
const Manager = require("./lib/Manager");

const Engineer = require("./lib/Engineer");

const Intern = require("./lib/Intern");

const inquirer = require('inquirer');

const fs = require('fs');


// setting up empty array to have all employee members added to the the HTML page
const employees = [];


// Setting up questions to be use in node, each question has validation to prevent no user entry
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
    }
]


// Setting up function to start prompts and to switch roles and questions based on user selection
function promptUser() {
    inquirer
        .prompt(questions)
        .then(response => {
            const name = response.name;
            const id = response.id;
            const email = response.email;
            const role = response.role;

            switch (role) {
                case 'Manager':
                    const manager = new Manager(name, id, email, response.officeNumber);
                    employees.push(manager);
                    startHtml(manager);
                    break;
                case 'Intern':
                    const intern = new Intern(name, id, email, response.school);
                    employees.push(intern);
                    startHtml(intern);
                    break;
                case 'Engineer':
                    const engineer = new Engineer(name, id, email, response.github);
                    employees.push(engineer);
                    startHtml(engineer);
                    break;
            }

            inquirer.prompt({
                type: 'confirm',
                name: 'more',
                message: 'Would you like to add another employee?'
            })

            // Adding more team members if yes user will keep going through prompts
            .then(response => {
                if(response.more){
                    promptUser();
                } else {
                    // if no more members to be added, the information entered will be added to HTML 
                    writeHtml();
                }
            })
        })
}


// Function to start HTML file upon starting prompts in node
function htmlInit(){
    const html=`<!DOCTYPE html>
    <html class="uk-background-muted">
    
    <head>
        <title>My Team</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- UIkit CSS -->
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.7.0/dist/css/uikit.min.css">
    
        <!-- Fontawesome-->
        <script src="https://kit.fontawesome.com/c502137733.js"></script>
    </head>
    
    <body>
        <h1 class="uk-heading-lead uk-heading-line uk-text-center uk-text-italic uk-text-warning uk-padding"><span>My Team</span></h1>
        <div class="uk-container uk-margin">
            <div class="uk-grid-column-medium uk-grid-row-large uk-child-width-1-3@s uk-text-center uk-flex-center uk-grid-match"
                uk-grid uk-scrollspy="target: > div; cls: uk-animation-slide-bottom; delay: 250">`;

    fs.writeFile("./output/team.html", html, function(err) {
        if (err){
            console.log(err);
        }
    });

    console.log('HTML init');
}

// function to start adding the member selections
function startHtml(employees){
    return new Promise(function(resolve, reject){
        const email = employees.getEmail();
        const id = employees.getId();
        const name = employees.getName();
        const role = employees.getRole();

        let data="";

        if (role === "Engineer"){
            const gitHubUsername = employees.getGitHub();

            data = `<div>
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <span class="uk-text-warning"><i class="fas fa-lg fa-glasses"></i></span>
                        </div>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom"> ${name} </h3>
                            <p class="uk-text-meta uk-margin-remove-top"> || Engineer || </p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <ul class="uk-list uk-list-none uk-text-right">
                        <li>ID: ${id} </li>
                        <li>Email: <a href="mailto: email"> ${email} </a></li>
                        <li>GitHub: <a href="https://github.com/${gitHubUsername}" target="_blank" rel="noopener noreferrer"> ${gitHubUsername} </a></li>
                    </ul>
                </div>
            </div>
        </div>`
        } else if (role === "Intern"){
            const school = employees.getSchool();
            data = `<div>
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <span class="uk-text-warning"><i class="fas fa-lg fa-user-graduate"></i></span>
                        </div>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom"> ${name} </h3>
                            <p class="uk-text-meta uk-margin-remove-top">|| Intern ||</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <ul class="uk-list uk-list-none uk-text-right">
                        <li>ID: ${id} </li>
                        <li>Email: <a href="mailto:email"> ${email} </a></li>
                        <li>School: ${school} </li>
                    </ul>
                </div>
            </div>
        </div>`
        } else {
            const officeNumber = employees.getOfficeNumber();
            data= `<div>
            <div class="uk-card uk-card-default">
                <div class="uk-card-header">
                    <div class="uk-grid-small uk-flex-middle" uk-grid>
                        <div class="uk-width-auto">
                            <span class="uk-text-warning"><i class="fas fa-lg fa-mug-hot"></i></span>
                        </div>
                        <div class="uk-width-expand">
                            <h3 class="uk-card-title uk-margin-remove-bottom"> ${name} </h3>
                            <p class="uk-text-meta uk-margin-remove-top">|| Manager ||</p>
                        </div>
                    </div>
                </div>
                <div class="uk-card-body">
                    <ul class="uk-list uk-list-none uk-text-right">
                        <li>ID: ${id} </li>
                        <li>Email: <a href="mailto:email"> ${email} </a></li>
                        <li>Office Number: ${officeNumber} </li>
                    </ul>
                </div>
            </div>
        </div>`
        }

        console.log("adding employee");

        fs.appendFile("./output/team.html", data, function (err){
            if (err){
                return reject(err);
            };

            return resolve();
        });
    });
}


// function to write final part of html file and append the entire HTML file to the correct folder location
function writeHtml(){
    const html = `</div>
    </div>
    <!-- UIkit JS -->
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.0/dist/js/uikit.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.0/dist/js/uikit-icons.min.js"></script>
</body>

</html>`;

    fs.appendFile("./output/team.html", html, function (err){
        if (err){
            console.log(err);
        };
    });

    console.log("HTML done");
}

// function to initiate prompts and to start HTML file 
function initApp(){
    htmlInit();
    promptUser();
}

// initialization of the app 
initApp();

