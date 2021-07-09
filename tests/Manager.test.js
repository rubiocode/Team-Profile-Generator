const { expect } = require("@jest/globals");
const Manager = require("../lib/Manager");

test ("Creates office number using constructorfunction", () => {
    const officeNumber = 720;
    const employee = new Manager("Lidia", 100, "test@example.com", officeNumber);
    expect(employee.officeNumber).toBe(officeNumber);
});

test ("getOfficeNumber() returns office number", () =>{
    const officeNumber = 720;
    const employee = new Manager("Lidia", 100, "test@example.com", officeNumber)
    expect(employee.getOfficeNumber()).toBe(officeNumber);
});

test ("getRole() returns \'Manager\'", () =>{
    const role= "Manager";
    const employee = new Manager("Lidia", 100, "test@example.com", 720)
    expect (employee.getRole()).toBe(role);
});