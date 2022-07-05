const validateLib = require('./ValidationLib');

function validateUser(userObj) {
    let result = validateLib.checkRequired("firstname", userObj.firstname);
    if (result.isNotValid) {return result;}

    result = validateLib.checkLength("firstname", userObj.firstname, 2, 25);
    if (result.isNotValid) {return result;}

    result = validateLib.checkRequired("lastname", userObj.lastname);
    if (result.isNotValid) {return result;}

    result = validateLib.checkLength("lastname", userObj.lastname, 2, 25);
    if (result.isNotValid) {return result;}


    result = validateLib.checkRequired("date", userObj.date);
    if (result.isNotValid) {return result;}

    result = validateLib.checkDate("date", userObj.date);
    if (result.isNotValid) {return result;}


    // Radio Buttons


    result = validateLib.checkRequired("email", userObj.email);
    if (result.isNotValid) {return result;}

    result = validateLib.checkEmail("email", userObj.email);
    if (result.isNotValid) {return result;}



    result = validateLib.checkRequired("number", userObj.number);
    if (result.isNotValid) {return result;}

    result = validateLib.checkNumber("number", userObj.number);
    if (result.isNotValid) {return result;}


    result = validateLib.checkRequired("password", userObj.password);
    if (result.isNotValid) {return result;}

    result = validateLib.checkLength("password", userObj.password, 8);
    if (result.isNotValid) {return result;}

    result = validateLib.checkPassword("password", userObj.password, 8);
    if (result.isNotValid) {return result;}


    result = validateLib.checkRequired("passwordcheck", userObj.passwordcheck);
    if (result.isNotValid) {return result;}

    /*
    result = validateLib.PasswordVerification("passwordcheck", userObj.passwordcheck);
    if (result.isNotValid) {return result;}
    */


    return false;
}


module.exports = {
    validateUser
}
