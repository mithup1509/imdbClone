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

let forgetpassForm = document.getElementById("forgetpass-form");
forgetpassForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let emailValidate = validateInput(
    document.getElementById("forgetpass-email"),
    emailRegexPattern
  );
  let passwordValidate = validateInput(
    document.getElementById("forgetpass-password"),
    passwordRegexPattern
  );
  let rePasswordValidate = validateInput(
    document.getElementById("forgetpass-repassword"),
    passwordRegexPattern
  );

  if (emailValidate && passwordValidate && rePasswordValidate) {
    let userEmail = document.getElementById("forgetpass-email").value;
    let password = document.getElementById("forgetpass-password").value;

    if (password === document.getElementById("forgetpass-repassword").value) {
      document
        .querySelector(".forgetpass-re-enterpassword")
        .classList.remove("input-error");
      document
        .querySelector(".forgetpass-repassword-alert-message")
        .classList.remove("error-message");

      let userdata = {
        password: password,
      };

      let existingFormData = fetchUsers()
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log(data);
          let elementid;
          data.forEach((element) => {
            if (element.email === userEmail) {
              elementid = element.id;
              return;
            }
          });

          if (elementid) {
            document.querySelector(".no-email").classList.remove("input-error");
            fetch(`http://127.0.0.1:3000/api/createaccount/${elementid}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(userdata),
            })
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                document
                  .querySelector(".password-success")
                  .classList.add("success-password");
                document
                  .querySelector(".forgetpass-signin")
                  .classList.add("success-password");
                setTimeout(() => {
                  document
                    .querySelector(".password-success")
                    .classList.remove("success-password");
                }, 3000);
                resetForm();
              });
          } else {
            document.querySelector(".no-email").classList.add("input-error");
            console.log("kuar");
          }
        })
        .catch((err) => {
          return err;
        });
    } else {
      document
        .querySelector(".forgetpass-re-enterpassword")
        .classList.add("input-error");
      document
        .querySelector(".forgetpass-repassword-alert-message")
        .classList.add("error-message");
    }
  }
});

let inputs = document.querySelectorAll(
  "#forgetpass-form input:not([type='submit'])"
);
inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    let regexPattern;
    if (
      input.id === "forgetpass-password" ||
      input.id === "forgetpass-repassword"
    ) {
      regexPattern = passwordRegexPattern;
    } else if (input.id === "forgetpass-email") {
      regexPattern = emailRegexPattern;
    } else {
      regexPattern = defaultregexPattern;
    }

    validateInput(input, regexPattern);
  });
});

function resetForm() {
  document.getElementById("forgetpass-email").value = "";
  document.getElementById("forgetpass-password").value = "";
  document.getElementById("forgetpass-repassword").value = "";
}

function handleforgetSignin() {
  window.location.href = "signin";
}

function fetchUsers() {
  return fetch("http://127.0.0.1:3000/api/createaccount/");
}
