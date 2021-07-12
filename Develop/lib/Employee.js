//creating parent class contructor function

class Employee {

    constructor (name, id, email){
        this.name=name;
        this.id=id;
        this.email=email;

    }

    // getting object function to retrieve name
    getName(){
        return this.name;
    }

    // getting object function to retrieve id
    getId(){
        return this.id;
    }

    // getting object function to retrieve email
    getEmail(){
        return this.email;
    }

    // // getting object function to retrieve role
    getRole(){
        return 'Employee' ;
    }
}

module.exports = Employee;