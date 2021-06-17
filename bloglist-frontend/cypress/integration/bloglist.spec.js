describe('Blog List', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    const user = {
      username: 'testy_mctestface',
      name: 'Test',
      password: 'test'
    }

    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('test')
      cy.get('#login-button').click()

      cy.contains('logged in')
    })

    it('fails with incorrect credentails', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.contains('Wrong username or password')
    })

    it('error alert is red', function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('password')
      cy.get('#login-button').click()

      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('testy_mctestface')
      cy.get('#password').type('test')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.get('#toggler').click()
      cy.get('#title').type('Test Post')
      cy.get('#author').type('Testy McTestFace')
      cy.get('#url').type('http://www.test.com')
      cy.get('#blog-submit').click()
      cy.contains('Test Post')
    })

    it('A blog can be liked', function() {
      cy.get('#toggler').click()
      cy.get('#title').type('Test Post')
      cy.get('#author').type('Testy McTestFace')
      cy.get('#url').type('http://www.test.com')
      cy.get('#blog-submit').click()
      cy.get('#view-button').click()
      cy.get('#like-button').click()
      cy.contains('1')
    })
  })
})