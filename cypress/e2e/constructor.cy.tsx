///<reference types="cypress" />

const testUrl = 'http://localhost:4000';
const souceIngridient = '643d69a5c3f7b9001cfa0942';
const moveButton = 'move_button';
const details = 'Детали ингредиента';
const closeModal = 'close-modal';
const orderNumber = 'order-number';
const switching = 'switching';
 
describe('проверяем доступность приложения', () => {
  beforeEach(() => {
    cy.visit(testUrl);
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' }).as('getIngredients'); // Добавляем alias
  });

  it('обавление ингредиента в конструктор работает корректно', () => {
    cy.get(`[data-cy=${souceIngridient}]`).find('button').click();
    cy.get('[data-cy=price]').should('have.text', '90');
    cy.get(`[data-cy=${switching}]`)
      .find(`.${moveButton}`)
      .should('have.class', `${moveButton}`);
  });

  it('открыть модальное окно', () => {
    cy.contains(details).should('not.exist');
    cy.get(`[data-cy=${souceIngridient}]`).click();
    cy.url().should('include', `/ingredients/${souceIngridient}`);
    cy.contains(details).should('exist');
  })

  it('закрыть модальное окно', () => {
    cy.get(`[data-cy=${souceIngridient}]`).click();
    cy.contains(details).should('exist');
    cy.get(`[data-cy=${closeModal}]`).click();
    cy.contains(details).should('not.exist');
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
    cy.visit(testUrl);

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
        cy.get(`[data-cy=${orderNumber}]`).should('exist');
        cy.contains('76767').should('exist');

        // Закрывается модальное окно и проверяется успешность закрытия
        cy.get(`[data-cy=${closeModal}]`).click();
        cy.get(`[data-cy=${orderNumber}]`).should('not.exist');
        cy.contains('76767').should('not.exist');
    });

    // Проверяется, что конструктор пуст
    cy.get('[data-cy="bun"]').should('not.exist');
    cy.get(`[data-cy=${switching}]`).should('not.exist');
  });
})
