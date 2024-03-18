import {
  el,
  setChildren
} from 'redom';
// import 'bootstrap';

import Inputmask from 'inputmask';
import IMask from 'imask';

export const createForm = () => {

  const container = el("div.container mb-5 p-4#container");
  setChildren(window.document.body, container);

  const h1 = el("h1.h1 p-4", "Форма для онлайн-оплаты");
  // setChildren(container, h1);

  const form = el("form.form#form", {
    autocomplete: "off"
  });
  setChildren(container, h1, form);

  const cardNumberDiv = el("div.form__input-box");

  const cardNumberInput = el("input.form__input-inp#cardnumber", {
    type: "text",
    name: "cardnumber",
    placeholder: "Введите номер карты",
    autocomplete: "off",
    'data-valid': 'false',
    required: true,
  });

  const cardNumberErrorMessage = el("p.error-message validate-error-label", "Введите  корректный номер карты  ...");

  // setChildren(cardNumberDiv, cardNumberErrorMessage);

  setChildren(cardNumberDiv, cardNumberInput, cardNumberErrorMessage);

  const cardExpirationDaterDiv = el("div.form__input-box");

  const cardExpirationDateInput = el("input.form__input-inp#cardexpirationdate", {
    type: "text",
    name: "cardexpirationdate",
    placeholder: "Введите дату окончания действия карты",
    autocomplete: "off",
    'data-valid': 'false',
    required: true,
  });

  const cardExpirationDateErrorMessage = el("p.error-message validate-error-label", "Введите  корректyю дату  ...");

  setChildren(cardExpirationDaterDiv, cardExpirationDateInput, cardExpirationDateErrorMessage);

  const cvcDiv = el("div.form__input-box");
  const cvcInput = el("input.form__input-inp#cvc", {
    type: "text",
    name: "cvc",
    placeholder: "Введите cvc",
    autocomplete: "off",
    'data-valid': 'false',
    required: true,
  });

  const cvcErrorMessage = el("p.error-message validate-error-label", "Введите  корректный код  с оборота карты ...");

  setChildren(cvcDiv, cvcInput, cvcErrorMessage);

  const emailDiv = el("div.form__input-box");
  const emailInput = el("input.form__input-inp email#email", {
    type: "text",
    name: "email",
    placeholder: "Введите email",
    autocomplete: "off",
    'data-valid': 'false',
    required: true,
  });
  const emailErrorMessage = el("p.error-message validate-error-label", "Введите  корректную почту ...");
  setChildren(emailDiv, emailInput, emailErrorMessage);

  const btn = el("button.form__btn btn-disabled", {
    type: "submit"
  }, "Оплатить");

  setChildren(form, cardNumberDiv, cardExpirationDaterDiv, cvcDiv, emailDiv, btn);



  // валидация для полей
  const masknumberCard = Inputmask('9999 9999 9999 9999 [99]');
  masknumberCard.mask(cardNumberInput);

  const lazyMask = IMask(cardExpirationDateInput, {
    mask: Date,
    autofix: true,
    pattern: 'm/`y',
    // pattern: 'm/`Y',
    blocks: {
      m: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
      },
      y: {
        mask: IMask.MaskedRange,
        // для того, чтобы год был с 2024  from: 240
        from: 240,
        to: 999,
        maxLength: 2,
        autofix: true, // bound value
      },

    },
  });

  const maskNumberCvc = Inputmask('999');
  maskNumberCvc.mask(cvcInput);

  const maskEmail = Inputmask({
    mask: '*{1,20}[.*{1,20}][.*{1,20}][.*{1,20}]@*{1,20}[.*{2,6}][.*{1,2}]',
    greedy: false,
    onBeforePaste(pastedValue, opts) {
      pastedValue = pastedValue.toLowerCase();
      return pastedValue.replace('mailto:', '');
    },
    definitions: {
      '*': {
        validator: "[0-9A-Za-z!#$%&'*+/=?^_`{|}~-]",
        casing: 'lower',
      },
    },
  });

  // const maskEmail = Inputmask({regex: "^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$"});
  maskEmail.mask(emailInput);

  // /^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i




  return {
    container,
    form,
    cardNumberDiv,
    cardExpirationDaterDiv,
    cvcDiv,
    emailDiv,
    btn,
    emailInput,
    cvcInput,
    cardExpirationDateInput,
    cardNumberInput,
    cardNumberErrorMessage,
    cardExpirationDateErrorMessage,
    cvcErrorMessage,
    emailErrorMessage,
  }
}
