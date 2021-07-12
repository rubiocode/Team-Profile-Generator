const Employee = require ('./Employee')


// subclass Engineer from parent class Employee
class Engineer extends Employee {
    constructor (name, id, email, gitHubUsername){
        super (name, id, email);
        this.gitHubUsername = gitHubUsername;
    }

    // getting object function to retrieve GitHub username
    getGitHub(){
        return this.gitHubUsername;
    }

    // getting object function to retrieve updated role to Engineer
    getRole(){
        return "Engineer"
    } 
}

module.exports = Engineer;