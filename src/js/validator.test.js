import { validateCvc,  validateCardNumber } from './validator';


// проверка cvc
describe('Проверка валидации CVV/CVC карты', () => {
  test('пропускает строку с тремя цифровыми символами', () => {
    const validCvc = '555';
    const isValid = validateCvc(validCvc);
    expect(isValid).toBe(true);
  });

  test('не пропускает строки с 1-2 цифровыми символами', () => {
    const shortCvc = '63';
    const isValid = validateCvc(shortCvc);
    expect(isValid).toBe(false);
  });

  test('не пропускает строки с 4+ цифровыми символами', () => {
    const longCvc = '7777';
    const isValid = validateCvc(longCvc);
    expect(isValid).toBe(false);
  });

  test('не пропускает строки с тремя нецифровыми символами', () => {
    const invalidCvc = 'sф7';
    const isValid = validateCvc(invalidCvc);
    expect(isValid).toBe(false);
  });

});


// проверка номера карты
describe('Проверка валидации номера карты', () => {
  test('пропускает корректный номер карты', () => {
    const validCardNumber = '5536914106095064';
    const isValid = validateCardNumber(validCardNumber);
    expect(isValid.isValid).toBe(true);
  });

  test('не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
    const invalidCardNumber = '2200-4568,89Po45';
    const isValid = validateCardNumber(invalidCardNumber);
    expect(isValid.isValid).toBe(false);
  });

  test('не пропускает строку с недостаточным количеством цифр', () => {
    const shortCardNumber = '5536914';
    const isValid = validateCardNumber(shortCardNumber);
    expect(isValid.isValid).toBe(false);
  });

  test('не пропускает строку со слишком большим количеством цифр', () => {
    const longCardNumber = '4111111111111111111111111';
    const isValid = validateCardNumber(longCardNumber);
    expect(isValid.isValid).toBe(false);
  });
});



