let _isValid;

export const createDataValidAtributeFalse = (input) => {
    input.setAttribute('data-valid', false);
    _isValid = input.dataset.valid;

}

export const createDataValidAtributeTrue = (input) => {
    input.setAttribute('data-valid', true);
    _isValid = input.dataset.valid;

}


