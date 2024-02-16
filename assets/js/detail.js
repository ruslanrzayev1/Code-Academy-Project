document.addEventListener("DOMContentLoaded", () => {
  const vacancyDetails = document.getElementById("vacancyDetails");

  const getUrlParameter = (name) => {
    name = name.replace(/[[]/, "\\[").replace(/[\]]/, "\\]");
    const regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    const results = regex.exec(location.search);
    return results === null
      ? ""
      : decodeURIComponent(results[1].replace(/\+/g, " "));
  };

  const jobId = getUrlParameter("id");

  axios
    .get(`https://655c83c825b76d9884fd6f17.mockapi.io/vacancies/${jobId}`)
    .then((res) => {
      const vacancies = res.data;
      vacancies.map((item) => {
        vacancyDetails.innerHTML = `
                <h2>${item.job}</h2>
                <p><strong>Company:</strong> ${item.company}</p>
            `;
      });
    });
});

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