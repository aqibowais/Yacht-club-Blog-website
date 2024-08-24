import {
  auth,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase.js";

let email = document.getElementById("email");
let password = document.querySelector(".pass-key");
let loginBtn = document.getElementById("login");

const login = (event) => {
  event.preventDefault();
  loginBtn.value = "Loading...";

  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((_) => {
      Toastify({
        text: "Successfully Logged In",
        duration: 3000,
      }).showToast();

      email.value = "";
      password.value = "";
      loginBtn.value = "LOGIN";
    })
    .catch((error) => {
      loginBtn.value = "LOGIN";
      Toastify({
        text: `Error Occurred: ${error.message}`,
        duration: 3000,
      }).showToast();
    });
};

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = "../home/home.html";
  }
});

loginBtn.addEventListener("click", login);
