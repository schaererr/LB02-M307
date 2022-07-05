const form = document.getElementById('form');
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const birthdate = document.getElementById('date');
const option1 = document.getElementById('option-1');
const option2 = document.getElementById('option-2');
const option3 = document.getElementById('option-3');
const email = document.getElementById('email');
const number = document.getElementById('number');
const password = document.getElementById('password');
const passwordcheck = document.getElementById('passwordcheck');


// Show input error message
function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

// Show success outline
function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';
}

// Show Radio Error
function showErrorRadio(input, message) {
    const radioControl = input.parentElement.closest('.form-control');
    radioControl.className = 'form-control error';
    const small = radioControl.querySelector('small');
    small.innerText = message;
}

// Radio Success
function showSuccessRadio(input) {
    const radioControl = input.parentElement.closest('.form-control');
    radioControl.className = 'form-control success';
}


// Check Date
function checkDate(input) {
    let today = new Date()
    let birthday = new Date(input.value);
    let age = new Date(today - birthday).getFullYear() - new Date(0).getFullYear()
    if (input.value!=='' && age >= 13) {
        showSuccess(input);
    } else {
        showError(input, 'Date is not valid. Minimum age for signup is 13.');
    }
}

// Check Radio Buttons
function checkRadioButtons(input) {
    if (document.getElementById('option-1').checked) {
        showSuccessRadio(input)
    } else if (document.getElementById('option-2').checked) {
        showSuccessRadio(input)
    } else if (document.getElementById('option-3').checked) {
        showSuccessRadio(input)
    } else {
        showErrorRadio(input, 'Please Select an Account Type')
    }
}

// Check Email
function checkEmail(input) {
    const emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailValidation.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email not valid');
    }
}

// Check Number
function checkNumber(input) {
    const numberValidation = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;
    if (numberValidation.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Number not valid');
    }
}

// Check Password
function checkPassword(input) {
    const PasswordValidation = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (PasswordValidation.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Password must be atleast 8 Characters long and include one Number and Special Character');
    }
}

// Verify Password
function PasswordVerification(input) {
    const passwordValue = (password.value.trim());
    const passwordcheckValue = (passwordcheck.value.trim());
    if (passwordValue !== passwordcheckValue) {
        showError(input, 'Password does not match');
    } else {
        showSuccess(input);
    }
}





// Check required fields
function checkRequired(inputArr) {
    let isRequired = false;
    inputArr.forEach(function(input) {
        if (input.value.trim() === '') {
            showError(input,`${getFieldName(input)} is required`);
            isRequired = true;
        }
    });

    return isRequired;
}


// Check input length
function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input,
            `${getFieldName(input)} must be atleast ${min} characters long`
        );
    } else if (input.value.length > max) {
        showError(input,
            `${getFieldName(input)} must be shorter than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

// Get fieldname
function getFieldName(input) {
    return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}




// Validate form input elements
function validateForm() {
    checkLength(firstname, 2, 20);
    checkLength(lastname, 2, 20);
    checkDate(birthdate)
    checkEmail(email);
    checkNumber(number);
    checkPassword(password);
    PasswordVerification(passwordcheck)
    checkRadioButtons(option1, option2, option3)
    checkRequired([firstname, lastname, birthdate, email, number, password, passwordcheck])
}





// Event listeners
form.addEventListener('submit', function(e) {
    e.preventDefault();
    validateForm();
});