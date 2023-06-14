let defaultregexPattern = /.*/; // Default
let lettersRegexPattern = /^[A-Za-z, ]*[^ ][A-Za-z, ]*$/;
// Alphabetic
let numbersRegexPattern = /^\d+$/; // numbers
let decimalRegexPattern = /^\d+(\.\d+)?$/; //decimal
let dateRegexPattern = /^\d{4}-\d{2}-\d{2}$/; //date
let imageUrlRegexPattern = /\.(jpeg|jpg|gif|png|svg)$/i; //image

function validateInput(inputElement, regexPattern) {
  let inputValue = inputElement.value;
  let errorElement = document.querySelector(`#${inputElement.id}-error`);

  if (inputValue !== "" && inputValue.match(regexPattern)) {
    inputElement.classList.remove("input-error");
    errorElement.classList.remove("error-text");
    return true;
  } else {
    inputElement.classList.add("input-error");
    errorElement.classList.add("error-text");

    return false;
  }
}

let addMovieForm = document.getElementById("add-movie-form");
addMovieForm.addEventListener("submit", (event) => {
  event.preventDefault();

  let titleValidate = validateInput(
    document.getElementById("title"),
    lettersRegexPattern
  );

  let actorsValidate = validateInput(
    document.getElementById("actors"),
    lettersRegexPattern
  );

  let directorValidate = validateInput(
    document.getElementById("director"),
    lettersRegexPattern
  );
  let languageValidate = validateInput(
    document.getElementById("language"),
    lettersRegexPattern
  );
  let plotValidate = validateInput(
    document.getElementById("plot"),
    lettersRegexPattern
  );
  let releasedValidate = validateInput(
    document.getElementById("released"),
    dateRegexPattern
  );
  let runtimeValidate = validateInput(
    document.getElementById("runtime"),
    numbersRegexPattern
  );
  let typeValidate = validateInput(
    document.getElementById("type"),
    lettersRegexPattern
  );
  let writerValidate = validateInput(
    document.getElementById("writer"),
    lettersRegexPattern
  );
  let genreValidate = validateInput(
    document.getElementById("genre"),
    lettersRegexPattern
  );
  let posterValidate = validateInput(
    document.getElementById("poster"),
    imageUrlRegexPattern
  );
  let ratingValidate = validateInput(
    document.getElementById("rating"),
    decimalRegexPattern
  );

  if (
    titleValidate &&
    actorsValidate &&
    directorValidate &&
    languageValidate &&
    plotValidate &&
    releasedValidate &&
    runtimeValidate &&
    typeValidate &&
    writerValidate &&
    genreValidate &&
    posterValidate &&
    ratingValidate
  ) {
    let title = document.getElementById("title").value;
    let runtime = document.getElementById("runtime").value;
    let plot = document.getElementById("plot").value;
    let actors = document.getElementById("actors").value;
    let director = document.getElementById("director").value;
    let language = document.getElementById("language").value;
    let released = document.getElementById("released").value;
    let writer = document.getElementById("writer").value;
    let country = document.getElementById("country").value;
    let genre = document.getElementById("genre").value;
    let poster = document.getElementById("poster").value;
    let movietype = document.getElementById("type").value;
    let rating = document.getElementById("rating").value;

    let newMovie = {
      title: title,
      runtime: runtime,
      plot: plot,
      actors: actors,
      director: director,
      language: language,
      released: released,
      writer: writer,
      country: country,
      genre: genre,
      poster: poster,
      movietype: movietype,
      rating: rating,
    };

    fetch("http://127.0.0.1:3000/api/moviedetail/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMovie),
    })
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          return "Error in Creating";
        }
      })
      .then(() => {
        document.querySelector(".movie-success").classList.add("success");
        clearForm();
        setTimeout(() => {
          document.querySelector(".movie-success").classList.remove("success");
        }, 3000);
        clearForm();
      })
      .catch((err) => {
        return err;
      });

    console.log(
      title,
      runtime,
      plot,
      actors,
      director,
      language,
      released,
      writer,
      country,
      genre,
      poster,
      movietype,
      rating
    );
  }
});

let inputs = document.querySelectorAll(
  "#add-movie-form input:not([type='submit'])"
);

inputs.forEach((input) => {
  input.addEventListener("keyup", () => {
    let regexPattern;
    if (
      input.id === "title" ||
      input.id === "actors" ||
      input.id === "director" ||
      input.id === "language" ||
      input.id === "plot" ||
      input.id === "type" ||
      input.id === "writer" ||
      input.id === "genre"
    ) {
      regexPattern = lettersRegexPattern;
    } else if (input.id === "runtime") {
      regexPattern = numbersRegexPattern;
    } else if (input.id === "rating") {
      regexPattern = decimalRegexPattern;
    } else if (input.id === "released") {
      regexPattern = dateRegexPattern;
    } else if (input.id === "poster") {
      regexPattern = imageUrlRegexPattern;
    } else {
      regexPattern = defaultregexPattern;
    }

    validateInput(input, regexPattern);
  });
});

function clearForm() {
  const inputElements = document.querySelectorAll(".input-box");
  inputElements.forEach((input) => {
    input.value = "";
  });
}


