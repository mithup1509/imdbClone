let signinButton = document.getElementsByClassName("signin-text")[0];
let logoutButton = document.querySelector(".logout");
let signButton = document.querySelector(".signin-button");
let yourReviewButton = document.querySelector(".your-review-button");
let cookie = getCookie();
let array = cookie.split("=")[1];
let cookieArray = array ? JSON.parse(array) : [];

if (!cookieArray.email) {
  signinButton.innerHTML = "signin";

  signButton.disabled = false;
} else {
  signinButton.innerHTML = cookieArray.email;
  signButton.disabled = true;
}

function handleClick() {
  window.location.href = "signin";
}
function clickOnCard(imdbID) {
  console.log(imdbID);
  window.location.href = `movie/${imdbID}`;
}

function handleYourRevieew() {
  window.location.href = `yourrating`;
}

function openNav() {
  document.querySelector(".mysidenav").classList.add("sidebar");
}

const closeButtons = document.querySelector(".close");

closeButtons.addEventListener("click", closeModal);

function closeModal() {
  document.querySelector(".mysidenav").classList.remove("sidebar");
}
function handleAddMovie() {
  window.location.href = "movieadd";
}
function handleWatchlist() {
  window.location.href = "watchlist";
}

function setCookie(user, data, seconds) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${user}=${data};${expires};path=/`;
}

function getCookie() {
  let cookie = decodeURIComponent(document.cookie);
  return cookie;
}

function deleteCookie() {
  setCookie("user", null, null);
  window.location.href = "signin";
}

let searchname = document.querySelector("#search");
let filterType = document.getElementById("filtertype");
let sortTypeSelect = document.getElementById("sorttype");
let dropdown = document.getElementById("dropdown");
let searchValue = "";
let filterValue = "";
let sortValue = "";

searchname.addEventListener("keyup", searchName);
filterType.addEventListener("change", updateFilterValue);
sortTypeSelect.addEventListener("change", updateSortValue);
dropdown.addEventListener("change", updateDropdownValue);

function updateFilterValue() {
  filterValue = filterType.value;
  fetchData();
}

function updateSortValue() {
  sortValue = sortTypeSelect.value;
  fetchData();
}

function updateDropdownValue() {
  fetchData();
}

let searchTimer;

function searchName() {
  clearTimeout(searchTimer);
  searchTimer = setTimeout(() => {
    searchValue = searchname.value;
    fetchData();
  }, 1000);
}

function fetchData() {
  fetch(
    `http://127.0.0.1:3000/homepage/searchValue/?search=${searchValue}&filtertype=${filterValue}&dropdown=${dropdown.value}&sorttype=${sortValue}`
  )
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        if (data.movie) {
          document.querySelector(".container").innerHTML = data.movie;
        } else {
          document.querySelector(".container").innerHTML =
            '<h1 class="no-data-homepage">No data found</h1>';
        }
      } else {
        document.querySelector(".container").innerHTML =
          '<h1 class="no-data-homepage">No data found</h1>';
      }
    })
    .catch((error) => {
      return error;
    });
}

fetchData();
