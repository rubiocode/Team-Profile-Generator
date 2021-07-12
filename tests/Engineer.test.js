const { expect } = require("@jest/globals");
const Engineer = require("../Develop/lib/Engineer");

test ("Can set GitHub username using constructor function", () => {
    const gitHubUsername = "GitHubUsername";
    const employee = new Engineer ("Lidia", 100, "test@example.com", gitHubUsername);
    expect (employee.gitHubUsername).toBe (gitHubUsername);
});

test ("getGitHub() returns GitHub username", () =>{
    const gitHubUsername = "GitHubUsername";
    const employee = new Engineer ("Lidia", 100, "test@example.com", "GitHubUsername");
    expect (employee.getGitHub()).toBe (gitHubUsername);
});

test ("getRole() returns \'Engineer\'", () =>{
    const role= "Engineer";
    const employee = new Engineer ("Lidia", 100, "test@example.com", "GitHubUsername")
    expect (employee.getRole()).toBe(role);
});