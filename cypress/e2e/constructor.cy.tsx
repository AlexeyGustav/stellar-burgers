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
});

describe('cоздание заказа', () => {
  beforeEach(() => {
    cy.intercept('GET', 'api/auth/user', {
      fixture: 'user.json'
    }).as('getUser');
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients');
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as('postOrder');

    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refreshToken')
    );
    cy.setCookie('accessToken', 'test-accessToken');
    cy.visit('http://localhost:4000');

  });

  afterEach(() => {
    cy.clearLocalStorage();
    cy.clearCookies();
  });

  it('cобирается бургер', () => {
    cy.get('[data-cy=643d69a5c3f7b9001cfa093d]').find('button').click();
    cy.get('[data-cy=643d69a5c3f7b9001cfa0941]').find('button').click();

    // Вызывается клик по кнопке «Оформить заказ»
    cy.get('[data-cy=order-button]').find('button').click();
    
    // Ждем моки заказов и пользователя
    cy.wait('@getUser');
    cy.wait('@postOrder').then((interception) => {
        cy.log('Запрос postOrder был перехвачен!');  // Проверяем, что код внутри then выполнился
        cy.log('Ответ от сервера:', interception.response?.body);  // Выводим тело ответа в консоль

        // Проверяется, что модальное окно открылось и номер заказа верный
        cy.get('[data-cy=order-number]').should('exist');
        cy.contains('76767').should('exist');

        // Закрывается модальное окно и проверяется успешность закрытия
        cy.get('[data-cy=close-modal]').click();
        cy.get('[data-cy=order-number]').should('not.exist');
        cy.contains('76767').should('not.exist');
    });

    // Проверяется, что конструктор пуст
    cy.get('[data-cy="bun"]').should('not.exist');
    cy.get('[data-cy="switching"]').should('not.exist');
  });
})
