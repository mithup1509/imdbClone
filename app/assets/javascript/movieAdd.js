

document
  .getElementById("add-movie-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    clearErrors();

    let isValid = true;
    const formData = {};

    const requiredInputs = document.querySelectorAll(
      "#add-movie-form input[required]"
    );

    requiredInputs.forEach(function (input) {
      const errorElement = document.getElementById(`${input.id}-error`);

      if (input.value.trim() === "") {
        isValid = false;
        displayError(
          input,
          errorElement,
          `${input.id.charAt(0).toUpperCase() + input.id.slice(1)} is required.`
        );

        input.addEventListener("input", function () {
          clearErrorMessage(input, errorElement);
        });
      }

      let country=document.getElementById("country").value;
      formData["country"]=country;
      formData[input.id] = input.value;
    });

    if (isValid) {
        clearForm();
      console.log(formData);
    }
  });

function displayError(input, errorElement, message) {
  input.classList.add("input-error");
  errorElement.textContent = message;
  errorElement.classList.add("error-text");
}

function clearErrorMessage(input, errorElement) {
  input.classList.remove("input-error");
  errorElement.classList.remove("error-text");
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error-message");
  const inputElements = document.querySelectorAll(".input-box");

  errorElements.forEach(function (error) {
    error.textContent = "";
    error.classList.remove("error-text");
  });

  inputElements.forEach(function (input) {
    input.classList.remove("input-error");

    // Remove the input event listener that clears the error message
    input.removeEventListener("input", function () {
      clearErrorMessage(input, errorElement);
    });
  });
}


function clearForm(){
    const inputElements = document.querySelectorAll(".input-box");
    inputElements.forEach((input)=>{
        input.value="";
    })
}