const form = document.querySelector("form");

const fullName = document.querySelector("#name");
const fullNameError = document.querySelector("#nameError");
const email = document.querySelector("#email");
const emailError = document.querySelector("#emailError");
const subject = document.querySelector("#subject");
const subjectError = document.querySelector("#subjectError");
const message = document.querySelector("#message");
const messageError = document.querySelector("#messageError");

const checkbox = document.querySelector("#accept");
const checkboxError = document.querySelector("#checkboxError");

const sentMessage = document.querySelector(".sentMessage");

function validateForm(event) {
    event.preventDefault();
    
    if (checkLength(fullName.value, 5)) {
        fullNameError.style.display = "none";
    } else {
        fullNameError.style.display = "block";
    }

    if (validateEmail(email.value)) {
        emailError.style.display = "none";
    } else {
        emailError.style.display = "block";
    }

    if (checkLength(subject.value, 15)) {
        subjectError.style.display = "none";
    } else {
        subjectError.style.display = "block";
    }

    if (checkLength(message.value, 25)) {
        messageError.style.display = "none";
    } else {
        messageError.style.display = "block";
    }

    if (checkbox.checked) {
        checkboxError.style.display = "none";
    } else {
        checkboxError.style.display = "block";
    }

    if (checkLength(fullName.value, 5) && validateEmail(email.value) && checkLength(subject.value, 15) && checkLength(message.value, 25) && checkbox.checked) {
        sentMessage.style.display = "block";
        form.reset();
    } else {
        sentMessage.style.display = "none";
    }
}

form.addEventListener("submit", validateForm);

function checkLength(value, len) {
    if (value.trim().length >= len) {
        return true;
    } else {
        return false;
    }
}

function validateEmail(email) {
    const regEx = /\S+@\S+\.\S+/;
    const patternMatches = regEx.test(email);
    return patternMatches;
}