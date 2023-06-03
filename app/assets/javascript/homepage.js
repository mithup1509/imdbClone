const apiKey = "a589d196";
function fetchMovies(url) {
  console.log(url);
  return fetch(`${url}`);
}

let signinButton = document.getElementsByClassName("signin-text")[0];

signinButton.innerHTML = !sessionStorage.getItem("user")
  ? "signin"
  : sessionStorage.getItem("user");
let moviesDetails = [];

fetchMovies(
  `https://www.omdbapi.com/?apikey=${apiKey}&s=movie&type=movie&plot=full&page=1&pageSize=20`
)
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    moviesDetails = data.Search;
    createMovies(data.Search);
    return data.Search;
  })
  .then(() => {})
  .catch((error) => {
    console.log(error);
  });

function createMovies(moviesDetails) {
  moviesDetails.length === 0
    ? "no data"
    : moviesDetails.forEach((element) => {
        let cardContainer = document.createElement("div");
        cardContainer.innerHTML = `  <div class="poster">
          <img src="${element.Poster}"
              alt="movie image" data-imdbid="${element.imdbID}">
          <div class="content">
              <h2 class="title" value='${element.Title}'>${element.Title}</h2> 
                  <p class="year">Released Year:${element.Year}</p>
            <p id="type">Movie Type: ${element.Type}</p>
          </div>
      </div>`;

        cardContainer.setAttribute("class", "card-container");
        document.querySelector(".container").appendChild(cardContainer);

        let image = cardContainer.querySelector("img");
        image.addEventListener("click", function () {
          let imdbID = this.dataset.imdbid;
          clickOnCard(imdbID);
          localStorage.setItem("imdbID", imdbID);
          console.log(imdbID);
        });
      });
}

function handleClick() {
  let signinText = document.getElementsByClassName("signin-text")[0];
  if (signinText.innerHTML !== "signin") {
    let userDataString = localStorage.getItem("userData");
    let userData = JSON.parse(userDataString);
    let removeuser = userData.filter((element) => {
      console.log(element.email, signinText.innerHTML);
      return element.email !== signinText.innerHTML;
    });

    localStorage.setItem("userData", JSON.stringify(removeuser));
    signinText.innerHTML = "signin";
    window.location.href = "signin";
  } else {
    window.location.href = "signin";
  }
}
function clickOnCard(imdbID) {
  window.location.href = `movie/${imdbID}`;
}

let searchname = document.querySelector(".search-button");
searchname.addEventListener("click", searchName);

function searchName() {
  const searchValue = document.getElementById("search").value.toLowerCase();
  const dropdownValue = document.getElementById("dropdown").value;
  const container = document.querySelector(".container").children;

  fetchMovies(
    `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchValue}&type=${dropdownValue}&plot=full&page=1&pageSize=20`
  )
    .then((response) => response.json())
    .then((data) => {
      document.querySelector(".container").innerHTML = "Wait a Bit";

      createMovies(data.Search);
    })
    .catch((error) => {
      console.log(error);
    });
}

let sorttype = document.getElementById("sorttype");
sorttype.addEventListener("click", sortmovies);
function sortmovies(e) {
  let movies = Array.from(document.getElementsByClassName("title"));
  let sorttypeValue = document.getElementById("sorttype").value;

  if (sorttypeValue === "title") {
    movies.sort((a, b) => a.innerHTML.localeCompare(b.innerHTML));
  } else if (sorttypeValue === "year") {
    movies.sort(
      (a, b) =>
        parseInt(a.nextElementSibling.innerHTML.substring(14)) -
        parseInt(b.nextElementSibling.innerHTML.substring(14))
    );
  }

  let container = document.querySelector(".container");

  movies.forEach((title) => {
    let cardContainer = title.closest(".card-container");
    container.appendChild(cardContainer);
  });
}

let filterType = document.getElementById("filtertype");
filterType.addEventListener("click", filterData);
function filterData() {
  const moviesYears = Array.from(document.getElementsByClassName("year"));
  const filterTypeValue = document.getElementById("filtertype").value;

  moviesYears.forEach((year) => {
    const parentCard = year.parentElement.parentElement.parentElement;
    const yearValue = parseInt(year.innerHTML.split(":")[1]);

    if (
      (filterTypeValue === "2000" && yearValue <= 2000) ||
      (filterTypeValue === "2001-2010" &&
        yearValue >= 2001 &&
        yearValue <= 2010) ||
      (filterTypeValue === "2011" && yearValue >= 2011) ||
      filterTypeValue === "all"
    ) {
      parentCard.style.display = "block";
    } else {
      parentCard.style.display = "none";
    }
  });
}


function handleAddMovie(){
  window.location.href="movieadd";
}