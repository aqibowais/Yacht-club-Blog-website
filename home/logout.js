import { auth, signOut,onAuthStateChanged } from "../firebase.js";
let logoutBtn = document.getElementById("logout");
let loader = document.getElementsByClassName('loader')
const logOut = (event) => {
  logoutBtn.value = ""
  logoutBtn.id = 'loader'
  event.preventDefault()
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
onAuthStateChanged(auth, (user) => {
  if (!user) {
    // Redirect to login if not authenticated
    window.location.href = "../login/login.html";
  }
});
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