//   LOGIN   Form 
const inputName = document.getElementById("inputName");
const inputPassword = document.getElementById("inputPassword");
const loginForm = document.getElementById("loginForm");
const mainContainer = document.getElementById("mainContainer");

const handleSignIn = () => {
  const inputNameValue = inputName.value;
  const inputPasswordValue = inputPassword.value;

  if (inputNameValue === "admin" && inputPasswordValue === "admin123") {
    mainContainer.classList.remove("hidden");
    loginForm.classList.add("hidden");
  }
};

// ================= ISSUE LIST =================
const openlist = [];
const closelist = [];
const allItems = [];
const issueCount = document.getElementById("issue");

const upDateOpenIssue = () => {
  issueCount.innerText = openlist.length;
};

const upDateCloseIssue = () => {
  issueCount.innerText = closelist.length;
};

//    LOADING SPINNER 
const spinnerLoading = document.getElementById("spinnerLoading");

const showLoading = () => {
  spinnerLoading.classList.remove("hidden");
};

const hideLoading = () => {
  spinnerLoading.classList.add("hidden");
};

//    DISPLAY ISSUE 
const CardContainer = document.getElementById("CardContainer");

const ShowIssueData = (items) => {
  CardContainer.innerHTML = "";
  issueCount.innerText = items.length;

  items.forEach(item => {
    const labels = item.labels.map((label, index) => {
      return `
        <span class="badge badge-outline px-4 py-3 gap-2 ${index === 0 ? "bg-red-300 text-white" : "bg-yellow-300"}">
          ${label.toUpperCase()}
        </span>
      `;
    }).join("");

    const date = new Date(item.createdAt).toLocaleDateString();
    const date2 = new Date(item.updatedAt).toLocaleDateString();

    const card = document.createElement("div");
    card.className = "max-w-md mx-auto mt-10";

    card.innerHTML = `
      <div onclick="myModal(${item.id})" class="card bg-base-100 h-[450px] shadow-md border-t-4 border-gray-200 ${item.status === "open" ? "border-green-500" : "border-purple-500"}">
        <div class="card-body">
          <div class="flex justify-between items-start">
            <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
              <i class="fa-solid fa-circle-dot text-lg"></i>
            </div>
            <span class="badge badge-lg text-red-500 border-none px-6 py-4 ${item.priority.toUpperCase() === "HIGH"
              ? "bg-red-400 text-white"
              : item.priority.toUpperCase() === "MEDIUM"
                ? "bg-yellow-400 text-white"
                : "bg-gray-200"
            }">
              ${item.priority.toUpperCase()}
            </span>
          </div>

          <h2 class="card-title text-xl font-bold text-gray-800 mt-2">
            ${item.title}
          </h2>

          <p class="text-gray-500">
            ${item.description}
          </p>

          <div class="flex gap-3 mt-3 flex-wrap justify-between">
            ${labels}
          </div>
        </div>

        <div class="border-t"></div>

        <div class="p-5 text-gray-500 flex justify-between">
          <p>#${item.id} by ${item.author}</p>
          <p>${date}</p>
        </div>
        <div class="p-5 text-gray-500 flex justify-between">
          <p> Assignee by : <span class="text-xl font-bold">${item.assignee}</span> </p>
          <p>${date2}</p>
        </div>

      </div>
    `;

    CardContainer.appendChild(card);
  });

  hideLoading();
};

//  BUTTON ACTIVE   
const btnContainer = document.querySelectorAll(".btnContainer button");

const setActiveBtn = (id) => {
  btnContainer.forEach(btn => {
    btn.classList.remove("btn-outline", "btn-primary");
  });

  const activeBtn = document.getElementById(id);
  activeBtn.classList.add("btn-primary");

  showLoading();

  if (id === "openBtn") {
    upDateOpenIssue();
    ShowIssueData(openlist);
  } else if (id === "closeBtn") {
    upDateCloseIssue();
    ShowIssueData(closelist);
  } else {
    ShowIssueData(allItems);
  }
};

setActiveBtn("allBtn");

const loadIssueData = async () => {
  showLoading();

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  const items = data.data;

  allItems.push(...items);
  openlist.push(...items.filter(item => item.status === "open"));
  closelist.push(...items.filter(item => item.status === "closed"));

  ShowIssueData(items);
};

// SHOW  MODAL 
const myModal = async (id) => {
  const myModal = document.getElementById("myModal");
  myModal.innerHTML = "";

  const modal = document.createElement("div");
  modal.className = "modal-box max-w-2xl";

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`);
  const data = await res.json();
  const issue = data.data;
  const leVels = issue.labels.map((level, index) => {
    return `
      <span class="badge badge-outline px-4 py-3 gap-2 ${index === 0 ? "bg-red-300" : "bg-yellow-300"}">
        ${level.toUpperCase()}
      </span>
    `;
  }).join("");
 const date = new Date(issue.createdAt).toLocaleDateString();
  modal.innerHTML = `
    <h3 class="font-bold text-2xl text-gray-800">${issue.title}</h3>

    <div class="flex items-center gap-3 mt-2 text-sm text-gray-500">
      <span class="badge bg-green-100 border-none px-3 py-2 ${issue.status === "open" ? "text-green-600" : "bg-purple-500 text-white"}">
        ${issue.status}
      </span>
      <p>Opened by <span class="font-semibold">${issue.author}</span></p>
      <p>${date}</p>
    </div>

    <div class="flex gap-3 mt-4">${leVels}</div>

    <p class="mt-5 text-gray-600">${issue.description}</p>

    <div class="bg-gray-100 p-4 rounded-lg mt-5 flex justify-between">
      <div>
        <p class="text-gray-500 text-sm">Assignee:</p>
        <p class="font-semibold">${issue.author}</p>
      </div>
      <div>
        <p class="text-gray-500 text-sm">Priority:</p>
        <span class="badge text-red-600 border-none ${issue.priority.toUpperCase() === "HIGH" ? "bg-red-500 text-white" : issue.priority.toUpperCase() === "MEDIUM" ? "bg-yellow-400 text-white" : "bg-gray-200"}">
          ${issue.priority}
        </span>
      </div>
    </div>

    <div class="modal-action">
      <form method="dialog">
        <button class="btn bg-purple-600 text-white hover:bg-purple-700">Close</button>
      </form>
    </div>
  `;

  myModal.appendChild(modal);
  myModal.showModal();
};

//  SEARCH  INPUT VALUE WISE
const getSearchValue = async () => {
  const search = document.getElementById("Search");
  const searchValue = search.value;

  showLoading();

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);
  const items = await res.json();

  ShowIssueData(items.data);
};


loadIssueData();