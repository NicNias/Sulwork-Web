describe('Página Tabela de Colaboradores', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4200');
  });

  it('Deve exibir o título da página corretamente', () => {
    cy.contains('h1', 'Tabela de Colaboradores').should('be.visible');
  });

  it('Deve navegar para o formulário ao clicar em "Cadastrar Colaborador"', () => {
    cy.contains('button', 'Cadastrar Colaborador').click();

    cy.url().should('include', '/cadastro');
    cy.get('form').should('be.visible');
  });
});
