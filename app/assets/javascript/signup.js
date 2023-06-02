let defaultregexPattern = /.*/; // Default pattern for non-password fields
let usernameRegexPattern= /^[A-Za-z]+$/; // Alphabetic characters only for username
let emailRegexPattern=/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email pattern
let passwordRegexPattern=/.{8,}/; // Minimum 8 characters for password fields


function validateInput(inputElement, regexPattern) {
  let inputValue = inputElement.value;
  let errorElement = document.querySelector(
    `.${inputElement.id}-alert-message`
  );

  if (inputValue !== "" && inputValue.match(regexPattern)) {
    inputElement.classList.remove("input-error");
    errorElement.classList.remove("error-message");
    return true;
  } else {
    inputElement.classList.add("input-error");
    errorElement.classList.add("error-message");
   
    return false;
  }
}

let createAccountForm = document.getElementById("createaccount-form");
createAccountForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let nameValidate = validateInput(
    document.getElementById("username"),usernameRegexPattern
    
  );
  let emailValidate = validateInput(
    document.getElementById("email"),
   emailRegexPattern
  );
  let passwordValidate = validateInput(
    document.getElementById("password"),
   passwordRegexPattern
  );
  let rePasswordValidate = validateInput(
    document.getElementById("repassword"),
  passwordRegexPattern
  );

  if (nameValidate && emailValidate && passwordValidate && rePasswordValidate ) {
    let username = document.getElementById("username").value;
    let userEmail = document.getElementById("email").value;
    let password = document.getElementById("password").value;
if(password===document.getElementById("repassword").value){
  document.querySelector(".re-enterpassword").classList.remove("input-error");
  document.querySelector(".repassword-alert-message").classList.remove("error-message");


  let userdata = {
    name: username,
    email: userEmail,
    password: password,
  };

  let existingFormData = localStorage.getItem("userData");
  let formdata = existingFormData ? JSON.parse(existingFormData) : [];
  let addLocalStorage = !formdata.some(
    (element) => element.email === userEmail
  );

  if (addLocalStorage) {
    document
      .querySelector(".already-account-alert")
      .classList.remove("input-error");
    resetForm();

    formdata.push(userdata);

    localStorage.setItem("userData", JSON.stringify(formdata));
    window.location.href = "signin";
  } else {
    document
      .querySelector(".already-account-alert")
      .classList.add("input-error");
  }
}else{
 
  document.querySelector(".re-enterpassword").classList.add("input-error");
  document.querySelector(".repassword-alert-message").classList.add("error-message");
}
  }
});

let inputs = document.querySelectorAll(
  "#createaccount-form input:not([type='submit'])"
);
inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
let regexPattern;
    if (input.id === "password" || input.id === "repassword") {
      regexPattern = passwordRegexPattern;
    } else if (input.id === "email") {
      regexPattern = emailRegexPattern;
    } else if (input.id === "username") {
      regexPattern = usernameRegexPattern;
    }else{
      regexPattern = defaultregexPattern;
    }

    validateInput(input, regexPattern);
  });
});

function resetForm() {
  document.getElementById("username").value = "";
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
  document.getElementById("repassword").value = "";
}

function handleClick() {
  console.log("hello");
  window.location.href = "signin";
}
