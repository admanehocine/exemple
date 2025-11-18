
//pour auto completion
/// <reference types="cypress" />
describe("fonctionnalité d'authentification", ()=>{
    beforeEach("visiter le lien",()=>{
    cy.visit("https://www.saucedemo.com/")
   })

 it('add to panier 2 element', {tags:['@secondSenario']}, () => {
    /***************************JDD**********************************/
    cy.fixture('Jeux_donne').then((users) => {
    /***************************Login produits***********************/
    cy.get('#user-name').clear().type(users.name)
    cy.get('#password').clear().type(users.pass)
    cy.get('#login-button').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')
    
    /***************************Ajouts produits**********************/
    //recuper la liste des produits total 
    //get length of elements
     cy.get('#inventory_container').then($container => {
      const totalProduits= $container.length;

      //element avant dernier de la list 
      const avantdernierIndex = totalProduits - 2;
      let prodNameTextAvantDernier
      const dernierIndex = totalProduits - 1;
      let prodNameTextDernier
      //const dernierIndex = totalProduits - 1;
      //add avant dernier  produit to panir
      /*************************First Action *************************/
      cy.get('.inventory_item').eq(avantdernierIndex).within(() => {
        //cy.get('')
        cy.get('.inventory_item_name').then($prodName => {
            prodNameTextAvantDernier = $prodName.text();
          //cy.log('Name of the product being added: ' + prodNameTextAvantDernier);
        });
        cy.get('button').should('have.text', 'Add to cart').click()
      })
      //verifier la valeur  du panier => 1
      cy.get('.shopping_cart_badge').should('have.text', '1')
      
      //go to panier
      cy.get('.shopping_cart_link').click()
      cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

      //check if the correct product is in the cart
      cy.get('.inventory_item_name').eq(0).then($prodNameCard => {
          $prodNameCard.text() == prodNameTextAvantDernier ? 
          cy.log('Le produit dans le panier est correct: ' + $prodNameCard.text())
          :
          cy.log('Erreur: Le produit dans le panier est incorrect: ' + $prodNameCard.text()); 
      });

      //Retourn to products page
      cy.get('button').contains('Continue Shopping').click()
       /*************************First Action *************************/
      cy.get('.inventory_item').eq(dernierIndex).within(() => {
        //cy.get('')
        cy.get('.inventory_item_name').then($prodName => {
            prodNameTextAvantDernier = $prodName.text();
          //cy.log('Name of the product being added: ' + prodNameTextAvantDernier);
        });
        cy.get('button').should('have.text', 'Add to cart').click()
      })
      //verifier la valeur  du panier => 1
      cy.get('.shopping_cart_badge').should('have.text', '2')
      
      //go to panier
      cy.get('.shopping_cart_link').click()
      cy.url().should('eq', 'https://www.saucedemo.com/cart.html')

      //check if the correct product is in the cart
      cy.get('.inventory_item_name').eq(0).then($prodNameCard => {
          $prodNameCard.text() == prodNameTextDernier ? 
          cy.log('Le produit dans le panier est correct: ' + $prodNameCard.text())
          :
          cy.log('Erreur: Le produit dans le panier est incorrect: ' + $prodNameCard.text()); 
      });

    
    });
    
 
    })
  })
 
 
   it('add to panier', {tags:['@firstSenario']}, () => {
    /***************************JDD**********************************/
    cy.fixture('Jeux_donne').then((users) => {
    /***************************Login produits***********************/
    cy.get('#user-name').clear().type(users.name)
    cy.get('#password').clear().type(users.pass)
    cy.get('#login-button').click()
    cy.url().should('eq', 'https://www.saucedemo.com/inventory.html')

    /***************************Ajouts produits**********************/
    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').should('have.text', 'Add to cart').click()
    })
    //verifier la valeur  du panier => 1
    cy.get('.shopping_cart_badge').should('have.text', '1')
    //ajouter 2 eme produit
    cy.get('.inventory_item').eq(1).within(() => {
      cy.get('button').should('have.text', 'Add to cart').click()
    })
    //verifier la valeur  du panier =>2
    cy.get('.shopping_cart_badge').should('have.text', '2')

    /***************************Supprission produits*******************/
    //Verifier  1 er produits du panier
    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').should('have.text', 'Remove')
    })
    //retirer  1 er  produit en clickant sur  remove
    cy.get('.inventory_item').eq(0).within(() => {
      cy.get('button').should('have.text', 'Remove').click()
    })
    //verifier  la valeur  du panier =>1
    cy.get('.shopping_cart_badge').should('have.text', '1')

    //verifier si 2 eme produit  est tjrs  dans le panier
      cy.get('.inventory_item').eq(1).within(() => {
      cy.get('button').should('have.text', 'Remove')
    })
    //clicker sur  remove  pour 2 eme produit
    cy.get('.inventory_item').eq(1).within(() => {
      cy.get('button').should('have.text', 'Remove').click()
    })
    //verifier  la valeur  du panier =>not visible
    cy.get('.shopping_cart_badge').should('not.exist')
          
    })
  })
 
})