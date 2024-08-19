import { auth, signOut } from "../firebase.js";
let logoutBtn = document.getElementById("logout");

const logOut = () => {
  signOut(auth)
    .then(() => {
      Toastify({
        text: "Logout Successfully",
        duration: 3000,
      }).showToast();

      window.location.href = "../login/login.html";
    })
    .catch((error) => {
      Toastify({
        text: `Error Occured : ${error}`,
        duration: 3000,
      }).showToast();
    });
};

logoutBtn.addEventListener("click", logOut);




//carousel slider
$(document).ready(function() {
  // Activate the carousel
  $('#carousel-example-generic').carousel({
    interval: 3000, // Slide interval time in milliseconds (3 seconds)
    pause: "hover" // Pause the carousel on mouse hover
  });
  
  // Optional: Add smooth sliding when clicking controls
  $('.carousel-control').click(function(e) {
    e.preventDefault();
    $('#carousel-example-generic').carousel($(this).data('slide'));
  });
  });