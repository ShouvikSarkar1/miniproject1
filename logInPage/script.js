document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const showSignup = document.getElementById("show-signup");
  const showLogin = document.getElementById("show-login");

  // Show sign-up form
  showSignup.addEventListener("click", function (event) {
    event.preventDefault();
    loginForm.style.display = "none";
    signupForm.style.display = "block";
  });

  // Show login form
  showLogin.addEventListener("click", function (event) {
    event.preventDefault();
    signupForm.style.display = "none";
    loginForm.style.display = "block";
  });
});
