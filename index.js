//   const inputName = document.getElementById("inputName");
// const inputPassword = document.getElementById("inputPassword");
// const mainContainer = document.getElementById("mainContainer");
// const loginForm = document.getElementById("loginForm");
// console.log(loginForm);

//  const handleSignIn=()=>{
// const inputNameValue = inputName.value ;
// const inputPasswordValue = inputPassword.value ;


// if(inputNameValue ==="admin" && inputPasswordValue === "admin123" ){
//     mainContainer.classList.remove("hidden");
//     loginForm.classList.add("hidden");
// }
// }

const spinnerLoading = document.getElementById("spinnerLoading");

const showLoading=()=>{
    spinnerLoading.classList.remove("hidden");
}
const hideLoading=()=>{
    spinnerLoading.classList.add("hidden");
}

const CardContainer = document.getElementById("CardContainer");

const loadIssueData = async () => {

     showLoading();
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");
    const issues = await res.json();
    ShowIssueData(issues.data);
}

const ShowIssueData = (items) => {
   CardContainer.innerHTML ="";
   

   items.forEach(item => {
    const card = document.createElement("div");
   card.className="max-w-md mx-auto mt-10";
    card.innerHTML =`
    <div class="card bg-base-100 shadow-md border border-gray-200">

    <!-- Card Body -->
    <div class="card-body">

      <!-- Top Section -->
      <div class="flex justify-between items-start">

        <!-- Left Icon -->
        <div class="w-10 h-10 flex items-center justify-center rounded-full bg-green-100 text-green-600">
          <i class="fa-solid fa-circle-dot text-lg"></i>
        </div>

        <!-- Priority Badge -->
        <span class="badge badge-lg bg-red-100 text-red-500 border-none px-6 py-4">
          HIGH
        </span>

      </div>

      <!-- Title -->
      <h2 class="card-title text-xl font-bold text-gray-800 mt-2">
        Fix Navigation Menu On Mobile Devices
      </h2>

      <!-- Description -->
      <p class="text-gray-500">
        The navigation menu doesn't collapse properly on mobile devices...
      </p>

      <!-- Tags -->
      <div class="flex gap-3 mt-3">

        <!-- Bug Tag -->
        <span class="badge badge-outline text-red-500 border-red-300 px-4 py-3 gap-2">
          <i class="fa-solid fa-bug"></i>
          BUG
        </span>

        <!-- Help Wanted Tag -->
        <span class="badge badge-outline text-orange-500 border-orange-300 px-4 py-3 gap-2">
          <i class="fa-regular fa-life-ring"></i>
          HELP WANTED
        </span>

      </div>

    </div>

    <!-- Divider -->
    <div class="border-t"></div>

    <!-- Footer -->
    <div class="p-5 text-gray-500">

      <p>#1 by john_doe</p>
      <p>1/15/2024</p>

    </div>

  </div>
    `

    CardContainer.appendChild(card);
   });

   hideLoading();

}

loadIssueData();


