Feature: Listagem

  Como usuário eu quero acessar a página de Listagem
  Para verificar os dados inseridos.

  Scenario: Listagem sem registros
    Given que o sistema não possui usuários cadastrados
    When eu acesso a página de listagem de usuários
    Then eu devo visualizar a lista de usuários vazia

  Scenario: Listagem com apenas um unico registro
    Given que o sistema possui apenas um unico registro
    When eu acesso a página de listagem de usuários
    Then eu vejo a lista de usuarios com apenas um registro