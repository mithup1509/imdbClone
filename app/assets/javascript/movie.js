let currenturl = window.location.href;
let url = currenturl.split("/");
imdbID = url[url.length - 1];

let cookie = getCookie();

let array = cookie ? cookie.split("=")[1] : [];
let cookieArray = array.length !== 0 ? JSON.parse(array) : [];

function getCookie() {
  let cookie = decodeURIComponent(document.cookie);
  return cookie;
}
let userid;
function handleWatchReview() {
  userid = cookieArray.id;
  window.location.href = `/review/${imdbID}`;
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
  const modalNouser = document.querySelector(".modal-nouser");
  modalNouser.classList.remove("modal-box");

  const modal = document.querySelector(".modal-rate");
  modal.classList.remove("modal-box");
}

let reviewsid;

function handlestarRate(reviewid) {
  if (cookieArray.length === 0) {
    showNouserModel();
  } else {
    reviewid ? (reviewsid = reviewid) : (reviewsid = "");

    const modal = document.querySelector(".modal-rate");
    modal.classList.add("modal-box");
  }
}

let selectedRating;

function handleStarRating(event) {
  selectedRating = event.target.value;
}

function handleSubmitRating() {
  if (selectedRating) {
    if (selectedRating >= 7) {
      reviewInput = "osm 👌";
    } else if (selectedRating < 7 && selectedRating >= 4) {
      reviewInput = "average 😐 ";
    } else {
      reviewInput = "not good 👎";
    }

    if (reviewsid === "") {
      let review = {
        movieid: imdbID,
        userid: cookieArray.id,
        review: reviewInput,
        rating: selectedRating,
      };

      fetch("http://127.0.0.1:3000/api/userreview/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {});
      reviewsid = "";
    } else {
      let review = {
        movieid: imdbID,
        userid: cookieArray.id,
        review: reviewInput,
        rating: selectedRating,
      };
      fetch(`http://127.0.0.1:3000/api/userreview/${reviewsid}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(review),
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          window.location.reload();
        })
        .catch((error) => {
          return error;
        });
      reviewsid = "";
    }
    const modal = document.querySelector(".modal-rate");
    modal.classList.remove("modal-box");
  } else {
    console.log("No rating selected");
    const modal = document.querySelector(".modal-rate");
    modal.classList.remove("modal-box");
  }
}

function handleClickSignin() {
  var currentURL = window.location.href;
  var newURL = currentURL.replace(`movie/${imdbID}`, "/signin");

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
  var newURL = currentURL.replace(`movie/${imdbID}`, "/signin");

  window.location.href = newURL;
}
