let searchInp = document.querySelector("#searchinp-for-home");
const changeInpColor = () => {
  searchInp.style.backgroundColor = "#2A41E8";
  searchInp.style.border = "none";
};
searchInp.addEventListener("focus", function () {
  this.placeholder = "";
});

searchInp.addEventListener("blur", function () {
  this.placeholder = "vakansiyanın adı yaxud açar-söz";
});

//Search sehifesine gonderme.............

// document.getElementById("sendButton").addEventListener("click", function () {
//   // const category = document.getElementById("category").value;
//   const skills = document.getElementById("skills").value;
//   // const region = document.getElementById("region").value;
//   // const workHours = document.getElementById("workHours").value;
//   // const education = document.getElementById("education").value;
//   // const experience = document.getElementById("experience").value;
//   // const minSalary = document.getElementById("min-salary").value;
//   // const maxSalary = document.getElementById("max-salary").value;

//   window.location.href = `search.html?skills=${skills}`;
// });
document.getElementById("sendButton").addEventListener("click", function () {
  // Get the selected job from the dropdown
  var selectedJob = document.getElementById("skills").value;

  // Make an API request using Axios
  axios
    .get("https://655c83c825b76d9884fd6f17.mockapi.io/vacancies")
    .then((response) => {
      // Check if the selected job exists in the API response
      var matchingJob = response.data.find((job) => job.job == selectedJob);

      if (matchingJob) {
        // If job matches, redirect to search.html and map the job information
        window.location.href = "search.html?p=" + matchingJob.job;
      } else {
        alert("Selected job not found in the API.");
      }
    })
    .catch((error) => console.error("Error fetching data:", error));
});

//ETRAFLI AXTARIS acilib baglanmasi...............

function toggleDiv() {
  const jobFilterForm = document.getElementById("jobFilterForm");
  jobFilterForm.classList.toggle("hidden");
  jobFilterForm.classList.toggle("visible");
}

function filterVacancies() {
  const category = document.getElementById("category").value;
  const skills = document.getElementById("skills").value;
  const region = document.getElementById("region").value;
  const minSalary = parseFloat(document.getElementById("minSalary").value) || 0;
  const maxSalary =
    parseFloat(document.getElementById("maxSalary").value) || Infinity;

  axios
    .get("https://655c83c825b76d9884fd6f17.mockapi.io/vacancies")
    .then((res) => {
      const filteredVacancies = res.data.filter((item) => {
        const salary = parseFloat(item.salary);
        return (
          (category === "" || item.job === category) &&
          (skills === "" || item.job === skills) &&
          (region === "" || item.location === region) &&
          salary >= minSalary &&
          salary <= maxSalary
        );
      });

      // Redirect to the searchResults.html page
      window.location.href = `./searchResults.html?category=${category}&skills=${skills}&region=${region}`;
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function filterJobs() {
  const searchInput = document.getElementById("searchinp-for-home");
  const searchTerm = searchInput.value.trim();

  window.location.href = `search.html?search=${encodeURIComponent(searchTerm)}`;
}

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

let allvacancies = document.querySelector(".all-vacancies-cnt");
let limit = 5;

// const createDetailPage = (job) => {
//   // Create a new HTML document
//   let newPage = window.open("", "_blank");

//   // Write the HTML content for the new page
//   newPage.document.write(`
//     <!DOCTYPE html>
//     <html lang="en">
//     <head>
//       <meta charset="UTF-8">
//       <meta name="viewport" content="width=device-width, initial-scale=1.0">
//       <title>Job Details - ${job.job}</title>
//     </head>
//     <body>
//       <h2>${job.job}</h2>
//       <p><strong>Company:</strong> ${job.company}</p>
//       <p><strong>Description:</strong> ${job.description}</p>
//       <!-- Add more job details as needed -->
//       <button onclick="window.close()">Close</button>
//     </body>
//     </html>
//   `);
// };z

const sortForLastVacancy = () => {
  allvacancies.innerHTML = "";
  axios
    .get(`https://655c83c825b76d9884fd6f17.mockapi.io/vacancies`)
    .then((res) => {
      db = res.data;
      const limitedData = db.slice(0, limit);
      limitedData.map((item) => {
        let homeVac = document.createElement("div");
        let homeVacMain = document.createElement("div");
        homeVacMain.className = "homeVacMain col-12 ";
        homeVac.className = "homeVac";
        homeVac.innerHTML = `        
                  <div class="jobname-and-company">
                      <h3>${item.job}</h3>
                      <p><i class="fa-solid fa-buildings"></i> ${item.company}</p>
                  </div>
                  <div class="more">
                      <a href="detail.html?id=${item.id}" target="_blank">Ətraflı</a>
                  </div>       
              `;
        homeVacMain.appendChild(homeVac);
        allvacancies.appendChild(homeVacMain);
      });
    });
};

window.onload = () => {
  sortForLastVacancy();
};

function sortForHighSalary() {
  allvacancies.innerHTML = "";
  axios
    .get("https://655c83c825b76d9884fd6f17.mockapi.io/vacancies")
    .then((res) => {
      const sortedVacancies = res.data.sort(
        (a, b) => parseFloat(b.salary) - parseFloat(a.salary)
      );
      const limitedData = sortedVacancies.slice(0, limit);

      displayVacancies(limitedData);
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
}

function displayVacancies(vacancies) {
  const allVacanciesContainer = document.querySelector(".all-vacancies-cnt");

  allVacanciesContainer.innerHTML = "";

  vacancies.forEach((item) => {
    let homeVac = document.createElement("div");
    let homeVacMain = document.createElement("div");
    homeVacMain.className = "homeVacMain col-12 ";
    homeVac.className = "homeVac";
    homeVac.innerHTML = `        
    <div class="jobname-and-company">
    <h3>${item.job}</h3>
    <p><i class="fa-solid fa-buildings"></i> ${item.company}</p>
</div>
<div class="more">
    <a href="detail.html?id=${item.id}" target="_blank">Ətraflı</a>
</div>  
  `;
    homeVacMain.appendChild(homeVac);
    allVacanciesContainer.appendChild(homeVacMain);
  });
}
document
  .getElementById("recentVacanciesButton")
  .addEventListener("click", function () {
    sortForLastVacancy();
    updateButtonStyles("recentVacanciesButton");
  });

document.getElementById("premiumButton").addEventListener("click", function () {
  sortForPremium();
  updateButtonStyles("premiumButton");
});

document
  .getElementById("highSalaryButton")
  .addEventListener("click", function () {
    sortForHighSalary();
    updateButtonStyles("highSalaryButton");
  });

document
  .getElementById("volunteerButton")
  .addEventListener("click", function () {
    sortForVolunteer();
    updateButtonStyles("volunteerButton");
  });

function updateButtonStyles(clickedButtonId) {
  const allButtons = document.querySelectorAll(".sort-btn-cnt button");

  allButtons.forEach((button) => {
    button.style.backgroundColor = "white";
    button.style.color = "black";
  });

  // Set the background color for the clicked button
  const clickedButton = document.getElementById(clickedButtonId);
  clickedButton.style.backgroundColor = "#2A41E8";
  clickedButton.style.color = "#ffffff";
}
