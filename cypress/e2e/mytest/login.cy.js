
//pour auto completion
/// <reference types="cypress" />
import loginPage from "../../pages/login.page"

describe("fonctionnalité d'authentification", ()=>{

   beforeEach("visiter le lien",()=>{
    //depart de chaque test "le given" url
    cy.visit("https://www.saucedemo.com/")

   })
 
  it("login with invalid saisir  loginpage",()=>{
    /// je cible le champs username avec son identifiant et saisie le nom username
    loginPage.saisirUsername("cedric")
    loginPage.saisirPassword("sauce")
    loginPage.seConnecter()
   // cy.get("span.title").should("be.visible")
    cy.url().should("eq", "https://www.saucedemo.com/")

   
    
    })
it("login with valid credentials" , {tags: ['smoke']},()=>{
/// je cible le champs username avec son identifiant
   cy.visit("https://www.saucedemo.com/")
    cy.get("#user-name").type("standard_user")
    ///je saisie le nom username
  
 ///je passe au passexord
    cy.get("#password").type("secret_sauce")

    // je passe au bouton
    cy.get("#login-button").click()
    //verifie s'il existe le titre product dans la page d'accueil
   //ou  cy.get("span.title").should("be.visible")
     cy.url().should("eq", "https://www.saucedemo.com/inventory.html")
 })
it("login with invalid credentials",()=>{
/// je cible le champs username avec son identifiant et saisie le nom username
    cy.get("#user-name").type("cedric")
 
   / //je passe au passexord
    cy.get("#password").type("sauce")

    // je basse au bouton
    cy.get("#login-button").click()
    //verifie s'il existe le titre product dans la page d'accueil
   // cy.get("span.title").should("be.visible")
    cy.url().should("eq", "https://www.saucedemo.com/")
  
})

    //ajouter  les types
/*it("login fixture empty credentials",()=>{
    //fixture envoie  une  promesse 
    //pour tester avec des donnees externes
    cy.fixture("Jeux_donne").then((data)=>{
        cy.get("#user-name").type(data.name)
        cy.get("#password").type(data.pass)
        cy.get("#login-button").click()
        cy.url().should("eq", "https://www.saucedemo.com/")
    })
/// je cible le champs username avec son identifiant et saisie le nom username
}
)*/

it('Test login avec toutes les données', () => {
    //jeux de donnée  ddt "data driven testing"
    cy.fixture('Jeux_donne_one_items').then((users) => {
      users.forEach((user) => {
        // Entrée utilisateur
        //visiter a chaque fois la page de login
        cy.visit("https://www.saucedemo.com/")
        cy.get('#user-name').clear().type(user.name)
        cy.get('#password').clear().type(user.pass)
        cy.get('#login-button').click()

        // Vérification du résultat
        if (user.result === 'ok') {
          cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
          // Déconnexion pour le prochain test
          cy.get('#react-burger-menu-btn').click()
          cy.get('#logout_sidebar_link').click()
        } else {
          cy.get('[data-test="error"]').should('be.visible')
        }
      })
    })
  })
})