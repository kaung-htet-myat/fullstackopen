/* eslint-disable no-trailing-spaces */
/* eslint-disable no-undef */
/* eslint-disable indent */
describe('Blog Lists', function () {

    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'Kaung Htet',
            username: 'kaung-htet',
            password: 'pa$$word'
        }
        cy.request('POST', 'http://localhost:3003/api/users/', user)
        cy.visit('http://localhost:3000')
    })
    it('login page is displayed', function () {
        cy.contains('Blog Lists')
        cy.contains('Login to the application')
    })

    describe('login attempt', function () {

        it('succeed and logged in', function () {
            cy.get('#username').type('kaung-htet')
            cy.get('#password').type('pa$$word')
            cy.contains('Submit').click()
            cy.contains('User: kaung-htet')
        })
        it('fails with wrong password', function () {
            cy.get('#username').type('kaung-htet')
            cy.get('#password').type('password')
            cy.contains('Submit').click()

            cy.get('#error-message')
                .should('contain', 'Wrong username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')
                .and('have.css', 'border-style', 'solid')
        })
    })


    describe('When logged in', function () {
        beforeEach(function () {
            cy.login({ username: 'kaung-htet', password: 'pa$$word' })
        })

        it('a new blog can be created', function () {
            cy.createBlog({
                title: 'another cypress blog',
                author: 'Christopher',
                url: 'cypress.blog'
            })

            cy.contains('another cypress blog')
        })

        describe('and have many blogs', function () {
            beforeEach(function () {
                cy.createBlog({
                    title: 'cypress blog 1',
                    author: 'Christopher',
                    url: 'cypress.blog',
                    likes: 10
                })
                cy.createBlog({
                    title: 'cypress blog 2',
                    author: 'Christopher',
                    url: 'cypress.blog',
                    likes: 4
                })
                cy.createBlog({
                    title: 'cypress blog 3',
                    author: 'Christopher',
                    url: 'cypress.blog',
                    likes: 5
                })
            })

            it('can like a blog', function () {
                cy.contains('cypress blog 2')
                    .contains('view')
                    .click()

                // number of likes before clicking like button
                cy.contains('cypress blog 2')
                    .parent()
                    .contains('0')

                // click the like button
                cy.contains('cypress blog 2')
                    .parent()
                    .contains('like')
                    .click()

                // number of likes after cliking like button
                cy.contains('cypress blog 2')
                    .parent()
                    .contains('1')
            })

            it('can remove a blog', function () {
                cy.contains('cypress blog 3')
                    .contains('view')
                    .click()

                // before clicking remove button
                cy.contains('cypress blog 3')

                // click the remove button
                // removing can also be done from command
                cy.contains('cypress blog 3')
                    .parent()
                    .contains('remove')
                    .click()

                // after cliking remove button
                cy.should('not.contain', 'cypress blog 3')
            })

            describe('logged in as another user', function () {
                beforeEach(function () {
                    cy.get('#logout-button').click()
                    const user = {
                        name: 'Christopher',
                        username: 'christopher',
                        password: 'pa$$word'
                    }
                    cy.request('POST', 'http://localhost:3003/api/users/', user)
                    cy.visit('http://localhost:3000')
                    cy.login({ username: 'christopher', password: 'pa$$word' })
                })

                it('cannot remove a blog as another user', function () {

                    cy.contains('cypress blog 2')
                        .contains('view')
                        .click()

                    // before clicking remove button
                    cy.contains('cypress blog 2')

                    // click the remove button
                    // removing can also be done from command
                    cy.contains('cypress blog 2')
                        .parent()
                        .contains('remove')
                        .click()

                    // after cliking remove button
                    cy.get('#error-message')
                        .should('contain', 'You cannot delete this post')
                        .and('have.css', 'color', 'rgb(255, 0, 0)')
                        .and('have.css', 'border-style', 'solid')
                })
            })

            it.only('blogs are sorted by likes', function () {

                cy.visit('http://localhost:3000')

                cy.get('.view-button').each((view) => {
                    cy.wrap(view).click()
                })

                cy.get('.likes').then(($likes) => {
                    let biggest = parseInt($likes[0].innerText)
                    let checker = false
                    console.log($likes.length)

                    Cypress.$.makeArray($likes).map((like) => {
                        console.log(like.innerText)
                        checker = parseInt(like.innerText) <= biggest
                        biggest = parseInt(like.innerText)
                        console.log(checker)
                    })

                    cy.wrap(checker).should('eq', true)
                })                
            })
        })
    })
})