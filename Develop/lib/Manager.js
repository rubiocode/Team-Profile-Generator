const Employee = require ('./Employee')


//Subclass Manager parent class employee
class Manager extends Employee {
    constructor (name, id, email, officeNumber){
    super (name, id, email);
    this.officeNumber = officeNumber; 
    }

    // getting object function to retrieve office number
    getOfficeNumber(){
        return this.officeNumber;
    }

    // getting object function to update role to manager
    getRole(){
        return 'Manager';
    }
}

module.exports = Manager;