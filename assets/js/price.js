// LOGIN GORSENMESI......
document.addEventListener("DOMContentLoaded", function () {
  const userIcon = document.getElementById("userIcon");

  updateHeader();

  userIcon.addEventListener("click", function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn === "true") {
      logout();
    } else {
      window.location.href = "./login.html";
    }
  });
});

function updateHeader() {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const userIcon = document.getElementById("userIcon");

  if (isLoggedIn === "true") {
    // User is logged in, show logout option
    userIcon.innerHTML = `
        <img src="./assets/images/user-avatar-placeholder.png" alt="User Avatar" />
        <div class="logout-option">
          <a href="#" onclick="logout()">Logout</a>
        </div>
      `;
  } else {
    // User is not logged in
    userIcon.innerHTML = `
        <img src="./assets/images/user-avatar-placeholder.png" alt="User Avatar" />
      `;
  }
}

function logout() {
  // Perform logout logic
  // Remove login status from local storage
  localStorage.removeItem("isLoggedIn");

  // Update the header
  updateHeader();
}
