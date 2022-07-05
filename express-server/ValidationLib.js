// Show input error message
function showError(id, message) {
    return `${id}: ${message}`;
}

// Show success outline
function showSuccess(id) {
    return `${id} successfully validated!`;
}


// Check Date
function checkDate(id, input) {
    let result = {
        isNotValid: true,
        msg: showError(id, 'Date is not valid')
    }
    let today = new Date()
    let birthday = new Date(input);
    let age = new Date(today - birthday).getFullYear() - new Date(0).getFullYear()
    if (input!=='' && age >= 13) {
        result = {
            isNotValid: false
        }
    }
    return result;
}

// Check Email
function checkEmail(id,input) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailValidation.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Email is not valid')
        }
    }
    return result;
}

//check Number
function checkNumber(id,input) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const numberValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (!numberValidation.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Number is not valid')
        }
    }
    return result;
}

// Check Password
function checkPassword(id, input) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const PasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!PasswordValidation.test(input.trim())) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Password is not valid')
        }
    }
    return result;
}


/*
// Verify Password
function PasswordVerification(id, input) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    const passwordValue = (input.password);
    const passwordcheckValue = (input.passwordcheck);
    if  (passwordValue !== passwordcheckValue) {
        result = {
            isNotValid: true,
            msg: showError(id, 'Password is not valid')
        }
    }
    return result;
}
*/

// Check required fields
function checkRequired(id, input) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    if (input.trim() === '') {
        result = {
           isNotValid: true,
           msg: showError(id, `${input.toString()} is required`)
        }
    }
    return result;
}


// Check input length
function checkLength(id, input, min, max) {
    let result = {
        isNotValid: false,
        msg: showSuccess(id)
    }
    if (input.length < min) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} must be at least ${min} characters`)
        }
    } else if (input.length > max) {
        result = {
            isNotValid: true,
            msg: showError(id,
                `${id} must be shorter than ${max} characters`)
        }
    }
    return result;
}

module.exports = {
    checkRequired,
    checkLength,
    checkDate,
    checkEmail,
    checkNumber,
    checkPassword,
    //PasswordVerification
}