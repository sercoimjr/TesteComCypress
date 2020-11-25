/// <reference types="cypress" />

//npx cypress open--config - file cypress - cucumber.json

Given(/^que o sistema não possui usuários cadastrados$/, () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: '**/api/1/databases/userdetails/collections/newtable?**',
    status: '200',
    response: [] //retornando um array vazio para a chamada da rota!!
  })
    .as('getNewtable')
});

When(/^eu acesso a página de listagem de usuários$/, () => {
  cy.visit('WebTable.html')
});

Then(/^eu devo visualizar a lista de usuários vazia$/, () => {
  //valida que a tabela possui apeas uma unica linha, a de cabeçalho
  cy.get('div[role="row"]').should('have.length', 1)
});

Given(/^que o sistema possui apenas um unico registro$/, () => {
  cy.server()
  cy.route({
    method: 'GET',
    url: '**/api/1/databases/userdetails/collections/newtable?**',
    status: '200',
    response: 'fx:webtable-get-1'
    //arquivo com json com um unico elemento
    //retornando um array com um unico elemento para a chamada da rota!!
  })
    .as('getNewtable')
});

Then(/^eu vejo a lista de usuarios com apenas um registro$/, () => {
  //vamos validar se o telefone retornado para o unico registro na tabela é o que foi mockado
  //seletor complexo, usando um alias ao final (.as())
  //find foi usado porque existe um outro div dentro da celula buscada
  //.eq(4) -> pegou o quinto registro da linha -> quinta celula
  cy.get('div[role="row"] div[role="gridcell"]').eq(4).find('div').as('divCellPhone')
  cy.get('@divCellPhone').should('contain.text', '8750595857') //assetiva
});
