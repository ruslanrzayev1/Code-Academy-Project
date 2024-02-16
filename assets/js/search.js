// const urlParams = new URLSearchParams(window.location.search);
// const skills = urlParams.get("skills");
const searchVacancies = document.querySelector('.search-vacancies');

// axios
//   .get(`https://655c83c825b76d9884fd6f17.mockapi.io/vacancies?ob=${skills}`)
//   .then((res) => {
//     displayJobItems(res.data);
//   })
//   .catch((error) => {
//     console.error("Error fetching data:", error);
//   });

// function displayJobItems(jobItems) {
//   jobItems.forEach((item) => {
//     let jobDiv = document.createElement('div');
//     jobDiv.innerHTML = `
//       <p>${item.job}</p>
//     `;
//     searchVacancies.appendChild(jobDiv);
//   });
// }

// document.addEventListener('DOMContentLoaded', function () {  
// const urlParams = new URLSearchParams(window.location.search);
//   const skills = urlParams.get('search');

//   axios.get(`https://655c83c825b76d9884fd6f17.mockapi.io/vacancies`)
//     .then(res => {
//       db = res.data.products
//       const filteredItems = db.filter(item => item.job.toLowerCase().includes(skills.toLowerCase()));

//       filteredItems.forEach(item => {
//         let searchDiv = document.createElement('div');
//         searchDiv.className = "searchDiv"
//         searchDiv.innerHTML = `
      
//         <p>${item.job}</p>
       
//         `
//         searchVacancies.append(searchDiv)
//       });
//     })
//     .catch(error => console.error('Error fetching data:', error));
// });
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