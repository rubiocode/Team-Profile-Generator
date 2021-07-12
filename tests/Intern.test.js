const { expect } = require("@jest/globals");
const Intern = require("../lib/Intern");

test ("Can set school using constructor function", () => {
    const school = "school";
    const employee = new Intern ("Lidia", 100, "test@example.com", school);
    expect (employee.school).toBe (school);
});

test ("getSchool() to return intern's school", () =>{
    const school = "school";
    const employee = new Intern ("Lidia", 100, "test@example.com", "school");
    expect (employee.getSchool()).toBe (school);
});

test ("getRole() to return \'Intern\'", () =>{
    const role= "Intern";
    const employee = new Intern ("Lidia", 100, "test@example.com", "school")
    expect (employee.getRole()).toBe(role);
});