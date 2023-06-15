let cookie = getCookie();
let array = cookie ? cookie.split("=")[1] : [];
let cookieArray = array.length !== 0 ? JSON.parse(array) : [];


// let logoutButtonNavbar=document.querySelector(".navbar-logout-button");



// if (cookieArray.length === 0) {

//   logoutButtonNavbar.disabled = true;
// } else {
//   logoutButtonNavbar.disabled = false;

// }




function getCookie() {
  let cookie = decodeURIComponent(document.cookie);
  return cookie;
}



function handlehome(){
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
   
    window.location.href = "signin";
  }
  
  