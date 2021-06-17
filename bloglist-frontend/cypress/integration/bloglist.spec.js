describe('Blog List', function() {
  beforeEach(function() {
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('ornellasd')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with incorrect credentails', function() {
      cy.get('#username').type('ornellasd')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    it('error alert is red', function() {
      cy.get('#username').type('ornellasd')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })
})
