const container = document.getElementById("issuesContainer");
const countEl = document.getElementById("issueCount");
const tabs = document.querySelectorAll(".tabBtn");
const searchInput = document.getElementById("searchInput");

let issues = [];
let currentTab = "all";


async function loadIssues(){

const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues");

const data = await res.json();

issues = data.data;

renderIssues();

}


function renderIssues(){

container.innerHTML = "";

let filtered = issues;

if(currentTab === "open"){
filtered = issues.filter(i => i.status === "open");
}

if(currentTab === "closed"){
filtered = issues.filter(i => i.status === "closed");
}

const search = searchInput.value.toLowerCase();

filtered = filtered.filter(i =>
i.title.toLowerCase().includes(search)
);

countEl.innerText = filtered.length;

filtered.forEach(issue => {

const card = document.createElement("div");

card.className =
"bg-white p-4 rounded shadow border cursor-pointer hover:shadow-lg";

card.innerHTML = `

<div class="flex justify-between mb-2">
<span class="text-xs px-2 py-1 rounded bg-gray-200">
${issue.priority}
</span>
</div>

<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mb-3">
${issue.description.slice(0,80)}...
</p>

<div class="flex gap-2 mb-2">

<span class="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
BUG
</span>

<span class="text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">
HELP WANTED
</span>

</div>

<p class="text-xs text-gray-400">
# ${issue.id}
</p>

`;

card.onclick = () => openIssue(issue.id);

container.appendChild(card);

});

}


tabs.forEach(btn => {

btn.addEventListener("click", () => {

currentTab = btn.dataset.tab;

tabs.forEach(b=>{
b.classList.remove("bg-purple-600","text-white");
b.classList.add("bg-gray-200");
});

btn.classList.remove("bg-gray-200");
btn.classList.add("bg-purple-600","text-white");

renderIssues();

});

});


searchInput.addEventListener("input",renderIssues);


async function openIssue(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();

const issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;

document.getElementById("modalDesc").innerText = issue.description;

document.getElementById("modalStatus").innerText = issue.status;

document.getElementById("modalAuthor").innerText =
"Opened by " + issue.author;

document.getElementById("modalDate").innerText =
issue.createdAt;

document.getElementById("modalAssignee").innerText =
issue.assignee;

document.getElementById("modalPriority").innerText =
issue.priority;

document.getElementById("modalLabel1").innerText =
issue.labels?.[0] || "";

document.getElementById("modalLabel2").innerText =
issue.labels?.[1] || "";

document.getElementById("issueModal").classList.remove("hidden");
document.getElementById("issueModal").classList.add("flex");

}


function closeModal(){

document.getElementById("issueModal").classList.add("hidden");

}


loadIssues();