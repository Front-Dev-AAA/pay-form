import {
  createForm
} from './createForm';
// тестирование элементов создания формы - плайсхолдеры
describe('Проверка cоздания элементов формы', () => {
  test('должна создавать элементы формы с правильными плейсхолдерами', () => {
    const formElements = createForm();
    const {
      emailInput,
      cvcInput,
      cardExpirationDateInput,
      cardNumberInput
    } = formElements;
    expect(cardNumberInput.getAttribute('placeholder')).toBe(
      'Введите номер карты',
    );
    expect(cardExpirationDateInput.getAttribute('placeholder')).toBe('Введите дату окончания действия карты');
    expect(cvcInput.getAttribute('placeholder')).toBe('Введите cvc');
    expect(emailInput.getAttribute('placeholder')).toBe('Введите email');
  });
});
