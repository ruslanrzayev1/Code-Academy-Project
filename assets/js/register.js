function register() {
  const registerName = document.getElementById("registerName").value;
  const registerEmail = document.getElementById("registerEmail").value;
  const registerPassword = document.getElementById("registerPassword").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const acceptTermsCheckbox = document.getElementById("acceptTerms");

  // Check if passwords match
  if (registerPassword !== confirmPassword) {
    console.error("Passwords do not match");
    // You can display an error message to the user here
    return;
  }

  // Check if the user has accepted the terms
  if (!acceptTermsCheckbox.checked) {
    console.error("Please accept the terms and conditions");
    // You can display an error message to the user here
    return;
  }

  axios
    .post("https://655c83c825b76d9884fd6f17.mockapi.io/profile", {
      email: registerEmail,
      name: registerName,
      password: registerPassword,
    })
    .then((response) => {
      console.log("Registration successful:", response.data);

      localStorage.setItem("isLoggedIn", "true");

      setTimeout(() => {
        window.location.href = "./home.html";
      }, 2000);
    })
    .catch((error) => {
      console.error("Error during registration:", error);
    });
}
