import {
  auth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "./firebase.js";

let email = document.getElementById('signupEmail');
let password = document.getElementById('signupPswd');
let signupBtn = document.getElementById('signupBtn');

const signUp = (event) => {
  event.preventDefault()
  signupBtn.value = "Loading...";
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((user) => {
      console.log(user)
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
        text: `Error Occured : ${error}`,
        duration: 3000,
      }).showToast();
    });
};

onAuthStateChanged(auth, (user) => {
  if (user) {
    window.location.href = './home/home.html';
  }
});

signupBtn.addEventListener("click", signUp);

