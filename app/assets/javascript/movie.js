let currenturl = window.location.href;
let url = currenturl.split("/");
imdbID = url[url.length - 1];
function fetchmovie() {
  const apiKey = "a589d196";

  return fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
}

let email = sessionStorage.getItem("useremail");
console.log(email);

let ratingReview = [];

let eachMovie = [];
fetchmovie()
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data, "ajhs", data.Actors);
    let actors = data.Actors.split(", ");
    let genre = data.Genre.split(", ");

    let movieCard = document.createElement("div");
    movieCard.innerHTML = `
<div class="title">
    <p>${data.Title}</p>
</div>
<div class="maincontainer">

    <div class="poster-image">
        <div class="poster">
            <img src="${data.Poster}"
                alt="poster">

        </div>
        <div class="rating">
            <p class="imdb-rating">⭐ ${data.imdbRating}/10</p>
        </div>
    </div>
    <div class="details">
        <div class="runtime">
            <p class="time">
            Runtime:${parseInt(
              data.Runtime.substring(0, 3) / 60
            )}hrs ${parseInt(data.Runtime.substring(0, 3) % 60)}min</p>

            </p>
        </div>
        <div class="plot">
            <p class="movie-plot">
                "${data.Plot}"

            </p>
        </div>

        <div class="actors">Actors:
            <ul>
            ${actors
              .map((element) => {
                return `<li>${element}</li>`;
              })
              .join("")}
            </ul>
        </div>
        <div class="genre">Genre :
            <ul>
            ${genre
              .map((element) => {
                return `<li>${element}</li>`;
              })
              .join("")}
            </ul>
        </div>

        <div class="director">
            <p class="director-name">Director : ${data.Director}</p>
        </div>

        <div class="language">
            <p class="movie-lang">Language : ${data.Language}</p>
        </div>

        <div class="released-year">
            <p class="year">Released: ${data.Released}</p>
        </div>
        <div class="writer">
            <p class="writer-name">Writer : ${data.Writer}</p>
        </div>
        <div class="votes">
            <p class="imdb-votes">❤️ ${data.imdbVotes}</p>
        </div>
    </div>

</div>
`;

    movieCard.setAttribute("class", "movie");
    document.querySelector(".container").appendChild(movieCard);
  });

document
  .getElementById("open-review-modal")
  .addEventListener("click", showModal);


function showModal() {
  if (email === "signin") {
    showNouserModel();
  } else {
    const modal = document.querySelector(".modal");
    modal.classList.add("modal-box");
    // modal.style.display = "block";
  }
}

function showNouserModel() {
  const modal = document.querySelector(".modal-nouser");
  modal.classList.add("modal-box");
  //  modal.style.display="block";
}

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

function closeModal() {
  console.log("hello");
  const modal = document.querySelector(".modal");
  modal.classList.remove("modal-box");

  const modalNouser = document.querySelector(".modal-nouser");
  modalNouser.classList.remove("modal-box");
}


let reviewForm = document.getElementById("review-form");
let reviewContainer = document.querySelector(".review-container");

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const reviewInput = document.getElementById("review");

  if (nameInput.value !== "" && reviewInput.value !== "") {
    let reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    reviewElement.innerHTML = `
            <ul class="unorder-list">
                <li class="li-name">👤 ${nameInput.value}</li>
                <br>
                <li class="li-review">${reviewInput.value}</li>
            </ul>
     
        `;
    reviewContainer.appendChild(reviewElement);
    console.log(nameInput.value, reviewInput.value);
  }

  nameInput.value = "";
  reviewInput.value = "";
  closeModal();
});

function handleClick() {
  window.location.href = "/";
}

function handleClickSignin() {
  var currentURL = window.location.href; // Get the current URL
  var newURL = currentURL.replace(`/movie/${imdbID}`, "/signin"); // Replace "/movie/tt1490017" with "/signin" in the URL

  console.log(newURL);

  // Perform the redirect
  window.location.href = newURL;
}
