const Employee = require("../lib/Employee");

describe ("Employee", () =>{
    it ("Creates the Employee object", () =>{
        const employee = new Employee();
        expect (typeof(employee)).toBe("object");
    });

    it ("Creates name using constructor function", () => {
        const name = "Lidia";
        const employee = new Employee(name);
        expect (employee.name).toBe(name);
    });

    it ("Creates id using constructor function", ()=>{
        const id= 100;
        const employee = new Employee ("Lidia", id);
        expect (employee.id).toBe(id);
    });

    it ("Creates email using constructor function", () =>{
        const email= "test@example.com";
        const employee = new Employee ("Lidia", 100, email);
        expect (employee.email).toBe(email);
    });


    describe ("getName", () => {
        it ("Can get name using getName method", () =>{
            const name = "Lidia";
            const employee = new Employee(name);
            expect (employee.getName()).toBe(name)
        });
    });

    describe ("getId", () => {
        it ("Can get ID using getId method", () =>{
            const id = 100;
            const employee = new Employee("Lidia", id);
            expect (employee.getId()).toBe(id)
        });
    });

    describe ("getEmail", () => {
        it ("Can get email using getEmail method", () =>{
            const email = "test@example.com";
            const employee = new Employee("Lidia", 100, email);
            expect (employee.getEmail()).toBe(email)
        });
    });

    describe ("getRole", () => {
        it ("returns \'Employee\'", () =>{
            const role = "Employee";
            const employee = new Employee("Lidia", 100, "test@example.com");
            expect (employee.getRole()).toBe(role)
        });
    });

});