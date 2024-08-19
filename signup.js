import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "../firebase.js";

let email = document.getElementById("signupEmail");
let password = document.getElementById("signupPswd");
let signupBtn = document.getElementById("signupBtn");

const signUp = (event) => {
  event.preventDefault();
  signupBtn.value = "Loading...";
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      Toastify({
        text: "Account created Successfully",
        duration: 3000,
      }).showToast();

      email.value = "";
      password.value = "";
      signupBtn.value = "Sign UP";
    })
    .catch((error) => {
      signupBtn.value = "Sign UP";
      Toastify({
        text: `Error Occurred: ${error.message}`,
        duration: 3000,
      }).showToast();
    });
};

// Handle authentication state changes
onAuthStateChanged(auth, (user) => {
  if (user && window.location.pathname.includes("index")) {
    window.location.href = "../home/home.html";
  }
});

signupBtn.addEventListener("click", signUp);
