///<reference types="cypress" />

describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.visit('http://localhost:4000');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients'); // Добавляем alias
  });

  it('обавление ингредиента в конструктор работает корректно', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').find('button').click();
    cy.get('[data-cy=price]').should('have.text', '90');
    cy.get('[data-cy=switching]')
      .find('.move_button')
      .should('have.class', 'move_button');
  });

  it('открыть модальное окно', () => {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').click();
    cy.url().should('include', '/ingredients/643d69a5c3f7b9001cfa0942');
    cy.contains('Детали ингредиента').should('exist');
  })

  it('закрыть модальное окно', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa0942]').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=close-modal]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  })

  describe('cоздание заказа', () => {})
});
