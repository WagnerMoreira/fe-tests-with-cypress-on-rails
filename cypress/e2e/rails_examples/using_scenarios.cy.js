describe("Rails using scenarios examples", function () {
  beforeEach(() => {
    cy.app("clean"); // have a look at cypress/app_commands/clean.rb
  });

  it("setup basic scenario, visit one todo", function () {
    cy.appScenario("basic");
    cy.visit("/");
    cy.get("#todo-list-link")
      .contains("Show this todo list")
      .should(($text) => {
        // clean should of removed these from other tests
        expect($text).not.to.contain("Good bye Mars");
        expect($text).not.to.contain("Hello World");
        // expect($text).to.contain('foccacia is a simple italian bread that is very simple to bake')
      });

    cy.get("#todo-list-link").click();

    cy.get("#todo-title").then((el) => {
      expect(el).to.contain("Created using a cypress command");
    });

    cy.get("#todo-description").then((el) => {
      expect(el).to.contain("foccacia is a simple italian bread that is very simple to bake");
    });
  });

  it("Edit one todo", () => {
    cy.appScenario("basic");
    cy.visit("/");

    cy.get("#todo-list-link").click()
    cy.get("#todo-edit").click()


    cy.get("#todo_list_title").clear().type("Title edited during a cypress test")
    cy.get("input[type=submit]").click()
    cy.get("#todo-title").then((el) => {
      expect(el).to.contain("Title edited during a cypress test")
    })
  })

  it("example of missing scenario failure", function () {
    cy.visit("/");
    cy.appScenario("basic");
    // cy.appScenario('missing') // uncomment these if you want to see what happens
  });

  it("example of missing app failure", function () {
    cy.visit("/");
    cy.appScenario("basic");
    // cy.app('run_me') // uncomment these if you want to see what happens
  });
});
