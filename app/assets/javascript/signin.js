let defaultregexPattern = /.*/; // Default pattern for non-password fields
let emailRegexPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // Email pattern
let passwordRegexPattern = /.{8,}/; // Minimum 8 characters for password fields

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

let signInForm = document.getElementById("signin-form");
signInForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let emailValidate = validateInput(
    document.getElementById("email"),
    emailRegexPattern
  );

  let passwordValidate = validateInput(
    document.getElementById("password"),
    passwordRegexPattern
  );
  let emailInput = document.getElementById("email").value;
  let passwordInput = document.getElementById("password").value;

  if (emailValidate && passwordValidate) {
    fetchUsers()
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        let users = data;

        let userExists = users.some((element) => element.email === emailInput);
        let passwordCorrect = false;

        let passwordExists;

        if (userExists) {
          passwordExists = users.some(
            (element) => element.password === passwordInput
          );
        } else {
          document.querySelector(".no-account").classList.add("input-error");

          document
            .querySelector(".email-alert-message")
            .classList.add("error-message");
        }

        if (passwordExists) {
          passwordCorrect = true;
          let matchingUser = users.find(
            (element) =>
              element.email === emailInput && element.password === passwordInput
          );
          resetForm();
          setCookie(matchingUser);
          window.location.href = `/`;
          sessionStorage.setItem("user", emailInput);
        } else {
          document
            .querySelector(".password-incorrect")
            .classList.add("error-message");
          document
            .querySelector(".password-input")
            .classList.add("input-error");
        }
      });
  }
});

let inputs = document.querySelectorAll(
  "#signin-form input:not([type='submit'])"
);
inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    let regexPattern = defaultregexPattern;

    if (input.id === "password") {
      regexPattern = passwordRegexPattern;
    } else if (input.id === "email") {
      regexPattern = emailRegexPattern;
    }

    validateInput(input, regexPattern);
  });
});

function resetForm() {
  document.getElementById("email").value = "";
  document.getElementById("password").value = "";
}
function handleClick() {
  window.location.href = "signup";
}

function fetchUsers() {
  return fetch("http://127.0.0.1:3000/api/createaccount/");
}

function setCookie(user) {
  const date = new Date();
  date.setTime(date.getTime() + 1 * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `user=${JSON.stringify(user)};${expires};path=/`;
}
