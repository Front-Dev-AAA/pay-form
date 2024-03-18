// форма
import {
  createForm
} from "./createForm";
import {
  el,
  mount
} from 'redom';
// иконки карт
import {
  createIconcard
} from "./createIconcard";
const icon = createIconcard();
const valid = require('card-validator');
import {
  createDataValidAtributeFalse,
  createDataValidAtributeTrue
} from "./function";
const validator = require('email-validator');

// функция сделана для тестирования cvc
export function validateCvc(cvc) {
  const cvcInfo = valid.cvv(cvc);
  // ломаем функцию, для проверки тестов
  // cvcInfo.isValid = true;
  return cvcInfo.isValid;
}


export function validateCardNumber(cardNumber) {
  const cardInfo = valid.number(cardNumber);
  return cardInfo;
}


console.log(validateCardNumber('95064'));
// !numberValidation.isPotentiallyValid

export const validFunctiton = () => {
  const form = createForm();
  // функция создания атрибутов валидности карты
  function getDataInput() {
    const cardNumberData = form.cardNumberInput.dataset.valid;

    const cardExpirationDateData = form.cardExpirationDateInput.dataset.valid;

    const cardCvcCvvData = form.cvcInput.dataset.valid;

    const cardEmailData = form.emailInput.dataset.valid;

    const isDisabled = cardNumberData !== 'true' || cardExpirationDateData !== 'true' || cardCvcCvvData !== 'true' || cardEmailData !== 'true';



    if (isDisabled) {
      form.btn.classList.add('btn-disabled');
    } else {

      form.btn.classList.remove('btn-disabled');
    }

  }
  // обработка инпута кредитной карты
  let imageElement;
  form.cardNumberInput.addEventListener('blur', () => {
    // const numberValidation = valid.number(form.cardNumberInput.value);
    const numberValidation = validateCardNumber(form.cardNumberInput.value);
    // console.log(numberValidation);
    // console.log(numberValidation.card);

    if (!numberValidation.isPotentiallyValid) {
      if (imageElement) {
        imageElement.remove();
      }
      form.cardNumberErrorMessage.classList.remove('error-message');
      createDataValidAtributeFalse(form.cardNumberInput);
      getDataInput();
    } else {
      form.cardNumberErrorMessage.classList.add('error-message'); // opacity: 0;
      createDataValidAtributeTrue(form.cardNumberInput);
      getDataInput();
    }
    if (numberValidation.card) {
      form.cardNumberErrorMessage.classList.add('error-message'); // opacity: 0;
      // console.log(form.cardNumberInput.value);
      for (let index = 0; index < icon.length; index++) {
        if (numberValidation.card.type === icon[index].name) {
          if (imageElement) {
            imageElement.remove();
          }
          imageElement = el("img.img-card", {
            src: icon[index].src
          });
          mount(form.cardNumberDiv, imageElement);
        }
      }

    }
    if (numberValidation.card == null) {
      form.cardNumberErrorMessage.classList.remove('error-message');
      createDataValidAtributeFalse(form.cardNumberInput);
      getDataInput();
    }
  });

  // обработка инпута даты
  form.cardExpirationDateInput.addEventListener('blur', () => {
    // метод expirationDate библиотеки  card-validator получает дату из инпута
    // valid.expirationDate(value: string|object, maxElapsedYear: integer): object
    // Параметр maxElapsedYear определяет, через сколько лет в будущем срок действия карты должен считаться действительным.
    // Значение по умолчанию равно 19, поэтому карты со сроком действия 20 или более лет в будущем не будут считаться действительными.
    //  Его можно переопределить, передав integer в качестве второго аргумента.
    const cardExpirationDate = valid.expirationDate(form.cardExpirationDateInput.value);

    console.log(cardExpirationDate);
    if (!cardExpirationDate.isPotentiallyValid) {
      form.cardExpirationDateErrorMessage.classList.remove('error-message'); // ошибка
      createDataValidAtributeFalse(form.cardExpirationDateInput);
      getDataInput();
    } else {
      form.cardExpirationDateErrorMessage.classList.add('error-message');
      createDataValidAtributeTrue(form.cardExpirationDateInput);
      getDataInput();
      let today = new Date();
      if (((today.getFullYear() - 2000) == cardExpirationDate.year) && ((today.getMonth() + 1) >= Number(cardExpirationDate.month))) {
        form.cardExpirationDateErrorMessage.classList.remove('error-message'); // ошибка
        createDataValidAtributeFalse(form.cardExpirationDateInput);
        getDataInput();
      }
      if ((null == cardExpirationDate.year) || (null == cardExpirationDate.month)) {
        form.cardExpirationDateErrorMessage.classList.remove('error-message'); // ошибка
        createDataValidAtributeFalse(form.cardExpirationDateInput);
        getDataInput();
      }
    }
  });

  // обработка инпута CVC
  form.cvcInput.addEventListener('blur', () => {
    // valid.cvv(value: string, maxLength: integer): object
    // Проверка cvv по умолчанию проверяет числовую строку длиной 3 символа.
    // Можно maxLengthпереопределить, передав в integerкачестве второго аргумента.
    // Обычно вы меняете эту длину с 3 на 4 в случае карты American Express, которая ожидает 4-значный CID.

    // const cardCvcCvv = valid.cvv(form.cvcInput.value);

    const cardCvcCvv = validateCvc(form.cvcInput.value);
    // console.log(cardCvcCvv);
    if (!cardCvcCvv) {
      form.cvcErrorMessage.classList.remove('error-message'); // ошибка
      createDataValidAtributeFalse(form.cvcInput);
      getDataInput();
    } else {
      form.cvcErrorMessage.classList.add('error-message'); // убираем ошибку
      createDataValidAtributeTrue(form.cvcInput);
      getDataInput();
    }



  });
  // обработка инпута электронной почты
  form.emailInput.addEventListener('blur', () => {

    const emailValid = validator.validate(form.emailInput.value);
    // console.log(emailValid);


    if (emailValid !== true) {
      form.emailErrorMessage.classList.remove('error-message'); // ошибка
      createDataValidAtributeFalse(form.emailInput);
      getDataInput();
    } else {
      form.emailErrorMessage.classList.add('error-message'); // показать ошибку
      createDataValidAtributeTrue(form.emailInput);
      getDataInput();
    }
  });

// let x=10;
// console.log(x);
}

