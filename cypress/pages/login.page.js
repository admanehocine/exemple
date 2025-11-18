class LoginPage{
    elments ={
        username: () =>  cy.get("#user-name"),
        password: () =>  cy.get("#password"),
        loginBtn: () =>  cy.get("#login-button"),
        erro_msg: () =>  cy.get("#h3[data-test-error]"),
    }
    saisirUsername(un){
        this.elments.username().type(un)
    }
    saisirPassword(pass){
        this.elments.password().type(pass)
    }
    seConnecter(){
        this.elments.loginBtn().click()
    }
    getErrorMessage(){
        return this.elments.erro_msg()
    }
}
export default  new LoginPage();