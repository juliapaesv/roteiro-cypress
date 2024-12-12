describe('TODOMvc App', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('')
  })

  it('Insere uma tarefa', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('');

    cy.get('[data-cy=todo-input]')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1);

    cy.get('[data-cy=todos-list] > li [data-cy=remove-todo-btn]')
      .invoke('show')
      .click();

    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit(''); 

    cy.get('[data-cy=todo-input]')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .first()
      .click();

    cy.get('[data-cy=filter-active-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.get('[data-cy=filter-completed-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.get('[data-cy=filter-all-link')
      .click();
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 2);
  });

  it('Insere múltiplas tarefas', () => {
    cy.visit('');
  
    const tasks = [
      'Tarefa 1',
      'Tarefa 2',
      'Tarefa 3'
    ];
  
    tasks.forEach(task => {
      cy.get('[data-cy=todo-input]')
        .type(`${task}{enter}`);
    });
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', tasks.length)
      .each((item, index) => {
        cy.wrap(item).should('have.text', tasks[index]);
      });
  });
  
  it('Marca tarefa como completa', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('Tarefa para completar{enter}');
  
    cy.get('[data-cy=todos-list] > li [data-cy=toggle-todo-checkbox]')
      .click();
  
    cy.get('[data-cy=todos-list] > li')
      .should('have.class', 'completed');
  });
  
  it('Verifica input vazio não adiciona tarefa', () => {
    cy.visit('');
  
    cy.get('[data-cy=todo-input]')
      .type('{enter}');
  
    cy.get('[data-cy=todos-list]')
      .children()
      .should('have.length', 0);
  });
});