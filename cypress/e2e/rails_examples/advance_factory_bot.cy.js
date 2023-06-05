describe('More Rails using factory bot examples', function() {
  beforeEach(() => {
    cy.app('clean') // have a look at cypress/app_commands/clean.rb
  })

  it('using response from factory bot', function() {
    cy.appFactories([['create', 'post', { title: 'Good bye Mars'} ]]).then((results) => {
      const record = results[0];

      cy.visit(`/todo_lists/${record.id}`);
    });
    cy.contains("Good bye Mars")
  })

  it('using response from multiple factory bot', function() {
    cy.appFactories([
      ['create', 'post', { title: 'My First Todo'} ],
      ['create', 'post', { title: 'My Second Todo'} ]
    ]).then((results) => {
      cy.visit(`/todo_lists/${results[0].id}`);
      cy.contains("My First Todo")

      cy.visit(`/todo_lists/${results[1].id}`);
      cy.contains("My Second Todo")
    });
  })
})
