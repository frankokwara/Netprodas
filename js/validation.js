// getting the values from the users
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

const form = document.getElementById('signup');

// add event listener to the form
form.addEventListener('submit', function (e) {
    // prevent the form from submitting/reloading
    e.preventDefault();

    let isUsernameValid = checkUsername(), emailValid = checkEmail(),
        isPasswordValid = checkPassword();
    
    let isFormValid = isUsernameValid && emailValid && isPasswordValid;

    if (isFormValid) {
        showMessage("User created Successfully...");
    }

})

// returns false if the input argument is empty
const isRequired = value => value === "" ? false : true;


// returns false if the length argument is not between the min and max argument
const isBetween = (length, min, max) => length < min || length > max ? false : true;

// check if email is valid using regular expression
const isEmailValid = (email) => {
    const re = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    return re.test(email);
    // console.log(re.test(email));
}

// check if the password is strong, which match a specific pattern
// using regular expression
const isPasswordSecure = (password) => {
    const re = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    return re.test(password);
    // console.log(re.test(password));
}

// displaying error messages
const showError = (message) => {
    // get the error element
    const error = document.getElementById('error');

    // add the bootstrap error class to the element
    error.className += "text-danger";

    // display error on the element
    error.innerHTML = message;
}

// displaying success message
const showMessage = (message) => {
    // get the message element
    const msg = document.getElementById('msg');

    // add the bootstrap success class to the element
    msg.className += "text-success";

    // display message on the element
    msg.innerHTML = message;
}

// check if the username matches the pattern
const checkUsername = () => {
    let valid = false;

    let min = 3, max = 25;

    // get the value from the user input
    const userInput = username.value.trim();

    // check if username is not empty
    if (!isRequired(userInput)) {
        showError('please enter your username');
    } else if (!isBetween(userInput.length, min, max)) {
        showError(`username must be between ${min} to ${max} character long`);
    } else {
        valid = true;
    }
    return valid;
}

const checkEmail = () => {
    let valid = false;

    const emails = email.value.trim();
    
    if (!isRequired(emails)) {
        showError("Email cannot be empty");
    } else if (!isEmailValid(emails)) {
        showError("Email is not valid");
    } else {
        valid = true;
    }
    return valid;
}

const checkPassword = () => {
    let valid = false;

    const passwords = password.value.trim();

    if (!isRequired(passwords)) {
        showError('Password cannot be empty')
    } else if (!isPasswordSecure(passwords)) {
        showError('password must be at least 8 characters that include atleast 1 lowercase, 1 uppercase, 1 number and 1 symbol');
    } else {
        valid = true
    }

    return valid;
}
