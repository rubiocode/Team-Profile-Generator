const Employee = require ('./Employee')

//Subclass Intern from parent class Employee

class Intern extends Employee {
    constructor(name, id, email, school){
        super(name, id, email);
        this.school= school;
    }

    // getting object function to retrieve school
    getSchool(){
        return this.school;
    }

    // getting object function to update role to intern
    getRole(){
        return "Intern";
    }
}

module.exports = Intern;