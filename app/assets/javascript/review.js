let currenturl = window.location.href;
let url = currenturl.split("/");
imdbID = url[url.length - 1];

let rate;

let cookie = getCookie();
let array = cookie ? cookie.split("=")[1] : [];
let cookieArray = array.length !== 0 ? JSON.parse(array) : [];

function getCookie() {
  let cookie = decodeURIComponent(document.cookie);
  return cookie;
}
let userid;
function handleAddReview() {
  if (cookieArray.length === 0) {
    showNouserModel();
  } else {
    userid = cookieArray.id;
    const modal = document.querySelector(".modal");
    modal.classList.add("modal-box");
  }
}

function showNouserModel() {
  const modal = document.querySelector(".modal-nouser");
  modal.classList.add("modal-box");
}

const closeButtons = document.querySelectorAll(".close");

closeButtons.forEach((button) => {
  button.addEventListener("click", closeModal);
});

function closeModal() {
  const modal = document.querySelector(".modal");
  modal.classList.remove("modal-box");

  const modalNoUser = document.querySelector(".modal-nouser");
  modalNoUser.classList.remove("modal-box");
}

let reviewForm = document.getElementById("review-form");
let reviewContainer = document.querySelector(".review-container");

reviewForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const reviewInput = document.getElementById("review");

  if (reviewInput.value !== "") {
    let reviewElement = document.createElement("div");
    reviewElement.classList.add("review");
    let review = {
      movieid: imdbID,
      userid: cookieArray.id,
      review: reviewInput.value,
      rating: rate,
    };

    fetch("http://127.0.0.1:3000/api/userreview/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(review),
    })
      .then((res) => {
        if (res) {
          return res.json();
        } else {
          return "Error in Creating";
        }
      })
      .catch((error) => {
        return error;
      });
  }
  reviewInput.value = "";
  window.location.reload();
  closeModal();
});

function handleClickSignin() {
  var currentURL = window.location.href;
  var newURL = currentURL.replace(`review/${imdbID}`, "/signin");

  window.location.href = newURL;
}

function handlehome() {
  window.location.href = "/";
}

function setCookie(user, data, seconds) {
  const date = new Date();
  date.setTime(date.getTime() + seconds * 24 * 60 * 60 * 1000);
  let expires = "expires=" + date.toUTCString();
  document.cookie = `${user}=${data};${expires};path=/`;
}

function deleteCookie() {
  setCookie("user", null, null);
  var currentURL = window.location.href;
  var newURL = currentURL.replace(`review/${imdbID}`, "/signin");

  window.location.href = newURL;
}
