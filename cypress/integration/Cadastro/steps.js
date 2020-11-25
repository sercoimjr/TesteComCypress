/// <reference types="cypress" />

//biblioteca para uso de dados randomicos
let Chance = require('chance')
let chance = new Chance()

//para executar utilizando o arquivo de configuração para cucumber
//npx cypress open --config-file cypress-cucumber.json

Given(/^que o usuário está na página de cadastro$/, () => {
  cy.server()
  cy.route('POST', '**/api/1/databases/userdetails/collections/newtable?**').as('postNewtable')
  cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**').as('postUsertable')
  cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**').as('getNewtable')

  //preenchimento de campos
  cy.visit('Register.html')
});

When(/^ele informa os dados de um novo usuário$/, () => {
  cy.get('input[placeholder="First Name"]').type(chance.first())
  cy.get('input[placeholder="Last Name"]').type(chance.last())
  cy.get('input[type="email"]').type(chance.email())
  cy.get('input[type="tel"]').type(chance.phone({ formatted: false }))

  cy.get('input[value="Male"]').check()

  //campo checkbox, preencher assim
  cy.get('input[value="Cricket"]').check()
  //ou
  cy.get('input[type=checkbox]').check('Movies')

  cy.get('#Skills').select('Javascript')
  cy.get('#countries').select('Iceland')
  cy.get('select#country').select('New Zealand', { force: true })
  cy.get('#yearbox').select('1980')
  cy.get('select[placeholder="Month"]').select('June')
  cy.get('#daybox').select('11')


  cy.get('input#firstpassword').type('1Arroba@')
  cy.get('input#secondpassword').type('1Arroba@')

  //upload de arquivo - attach file
  cy.get('input#imagesrc').attachFile('print.jpg')
});

When(/^salva as informações$/, () => {
  cy.get('#submitbtn').click();
});

Then(/^o novo usuário deve ser cadastrado$/, () => {
  //validação para a rota que submete o formulario
  cy.wait('@postNewtable').then((resNewtable) => {
    cy.log(resNewtable.status)
    expect(resNewtable.status).to.be.equal(200)
  })
  cy.wait('@postUsertable').then((resUsertable) => {
    cy.log(resUsertable.status)
    expect(resUsertable.status).to.be.equal(200)
  })
  cy.wait('@getNewtable').then((getNewtable) => {
    cy.log(getNewtable.status)
    expect(getNewtable.status).to.be.equal(200)
  })

  //validação para o direcionamento para a tela com listagem de usuários
  //captura a URL que esta aberta e verifica se possui a string Webtable
  cy.url().should('contain', 'WebTable')
});
