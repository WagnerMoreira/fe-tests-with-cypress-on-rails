describe("Rails using rails fixtures examples", function () {
  beforeEach(() => {
    cy.app("clean"); // have a look at cypress/app_commands/clean.rb
  });

  it("loading all fixtures", function () {
    cy.appFixtures();
    cy.visit("/");

    cy.get("#todo-list-link")
      .contains("Show this todo list")
      .should(($text) => {
        expect($text).not.to.contain("Good bye Mars");
        expect($text).not.to.contain("Hello World");
      });

    cy.get("#todo-list-link").click();

    cy.get("#todo-title").then((el) => {
      expect(el).to.contain(
        "Created using Rails test fixtures called from a cypress command"
      );
    });

    cy.get("#todo-description").then((el) => {
      expect(el).to.contain(
        "Tomato bruschetta with balsamic glaze is an easy Italian appetizer topped with tomatoes, onions, garlic, basil and olive oil. Delicious, fresh and simple."
      );
    });
  });

  it.only("using single rails fixtures with param, open and edit a todo", function () {
    cy.appFixtures({ fixtures: ["todo_lists"] });
    cy.visit("/");

    cy.get("#todo-list-link").click();
    cy.get("#todo-edit").click();

    cy.get("#todo_list_title")
      .clear()
      .type("Title edited during a cypress test");
    cy.get("input[type=submit]").click();
    cy.get("#todo-title").then((el) => {
      expect(el).to.contain("Title edited during a cypress test");
    });
  });

  // The the cypress_fixtures folders doesn't exist, it's an example
  it.skip("loading another folder of fixtures", function () {
    cy.appFixtures({ fixtures_dir: "test/cypress_fixtures" });
    cy.visit("/");

    cy.get("#todo-list-link")
    .contains("Show this todo list")
    .should(($text) => {
      expect($text).not.to.contain("Good bye Mars");
      expect($text).not.to.contain("Hello World");
    });
  });
});
