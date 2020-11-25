Feature: Cadastro de usuário
  Como usuario do sistema desejo realizar o cadastro de um novo usuario
  Para que este possa ter acesso ao sistema


  Scenario: Cadastro de um nono usuário
    Given que o usuário está na página de cadastro
    When ele informa os dados de um novo usuário
    And salva as informações
    Then o novo usuário deve ser cadastrado