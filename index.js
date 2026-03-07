
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
const allItems =[];
console.log(allItems.length);
const issueCount = document.getElementById("issue");

const upDateOpenIssue = () => {
  issueCount.innerText = openlist.length;
};

const upDateCloseIssue = () => {
  issueCount.innerText = closelist.length;
};


// ================= BUTTON ACTIVE =================

const btnContainer = document.querySelectorAll(".btnContainer button");

const setActiveBtn = async (id) => {

  btnContainer.forEach(btn => {
    btn.classList.remove("btn-outline", "btn-primary");
  });

  const activeBtn = document.getElementById(id);
  activeBtn.classList.add("btn-primary");

  if (id === "openBtn") {

    showLoading();
    upDateOpenIssue();
    ShowIssueData(openlist);

  } else if (id === "closeBtn") {

    showLoading();
    upDateCloseIssue();
    ShowIssueData(closelist);

  } else {
    ShowIssueData(allItems);
  }
};



setActiveBtn("allBtn");


//  LOADING SPPINNER

const spinnerLoading = document.getElementById("spinnerLoading");

const showLoading = () => {
  spinnerLoading.classList.remove("hidden");
};

const hideLoading = () => {
  spinnerLoading.classList.add("hidden");
};


//  Load Data 

const CardContainer = document.getElementById("CardContainer");

const loadIssueData = async () => {

  showLoading();

  const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
  const data = await res.json();
  const items = data.data;
   allItems.push(...items)
  const openValue = items.filter(item => item.status === "open");
  openlist.push(...openValue);

  const closeValue = items.filter(item => item.status === "closed");
  closelist.push(...closeValue);

  ShowIssueData(items);
};


  //  Display Issue 

const ShowIssueData = (items) => {

  CardContainer.innerHTML = "";
  issueCount.innerText = items.length;

  items.forEach(item => {

    const labels = item.labels.map(label => {
      return `
      <span class="badge badge-outline px-4 py-3 gap-2">
        ${label.toUpperCase()}
      </span>
      `;
    }).join("");

    const date = new Date(item.createdAt).toLocaleDateString();

    const card = document.createElement("div");
    card.className = "max-w-md mx-auto mt-10";

    card.innerHTML = `
    <div class="card bg-base-100 h-[400px] shadow-md border border-gray-200">

      <div class="card-body">

        <div class="flex justify-between items-start">

          <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
            <i class="fa-solid fa-circle-dot text-lg"></i>
          </div>

          <span class="badge badge-lg bg-red-100 text-red-500 border-none px-6 py-4">
            ${item.priority.toUpperCase()}
          </span>

        </div>

        <h2 class="card-title text-xl font-bold text-gray-800 mt-2">
          ${item.title}
        </h2>

        <p class="text-gray-500">
          ${item.description}
        </p>

        <div class="flex gap-3 mt-3 flex-wrap">
          ${labels}
        </div>

      </div>

      <div class="border-t"></div>

      <div class="p-5 text-gray-500">

        <p>#${item.id} by ${item.author}</p>
        <p>${date}</p>

      </div>

    </div>
    `;

    CardContainer.appendChild(card);
  });

  hideLoading();
};


// SEARCH The inputValueWise

const getSearchValue = async () => {

  const search = document.getElementById("Search");
  const searchValue = search.value;

  showLoading();

  const res = await fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${searchValue}`);
  const items = await res.json();

  ShowIssueData(items.data);
};



loadIssueData();