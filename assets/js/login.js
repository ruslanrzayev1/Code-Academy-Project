function login() {
  const loginEmail = document.getElementById("loginEmail").value;
  const loginPassword = document.getElementById("loginPassword").value;

  axios
    .get("https://655c83c825b76d9884fd6f17.mockapi.io/profile")
    .then((response) => {
      const user = response.data.find(
        (user) => user.email === loginEmail && user.password === loginPassword
      );

      if (user) {
        console.log("Login successful:", user);
        document.getElementById("loginErrorMessage").textContent = "";

        localStorage.setItem("isLoggedIn", "true");

        setTimeout(() => {
          window.location.href = "/home.html";
        }, 2000);
      } else {
        console.error("Login failed: Invalid email or password");
        document.getElementById("loginErrorMessage").textContent =
          "Invalid email or password";
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
}
