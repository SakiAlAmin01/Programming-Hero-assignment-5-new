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

async function searchIssues(text){

if(text === ""){
loadIssues();
return;
}

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issues/search?q=${text}`
);

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


countEl.innerText = filtered.length;

filtered.forEach(issue => {

const date = new Date(issue.createdAt).toLocaleDateString();

const isOpen = issue.status === "open";

const topBorder =
isOpen ? "border-t-4 border-green-500" : "border-t-4 border-purple-500";


const openIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" fill="#CBFADB"/>
<path d="M9.77371 6.37811C9.74898 6.28269 9.74331 6.18334 9.75701 6.08573C9.77071 5.98812 9.80351 5.89417 9.85355 5.80925C9.90358 5.72432 9.96987 5.6501 10.0486 5.59081C10.1274 5.53153 10.217 5.48834 10.3125 5.46373C11.4193 5.17794 12.5806 5.17794 13.6875 5.46373C13.785 5.48631 13.877 5.52817 13.958 5.58685C14.0391 5.64553 14.1076 5.71985 14.1595 5.80542C14.2114 5.89099 14.2457 5.98609 14.2603 6.08511C14.2749 6.18412 14.2695 6.28506 14.2445 6.38196C14.2194 6.47887 14.1753 6.56978 14.1145 6.64935C14.0538 6.72892 13.9778 6.79553 13.891 6.84526C13.8041 6.89499 13.7082 6.92684 13.6088 6.93892C13.5095 6.951 13.4087 6.94307 13.3125 6.91561C12.4515 6.69363 11.5484 6.69363 10.6875 6.91561C10.495 6.96539 10.2907 6.93675 10.1193 6.83596C9.94801 6.73518 9.82369 6.5705 9.77371 6.37811ZM7.18371 7.27123C6.38305 8.08697 5.80244 9.0925 5.49621 10.1937C5.4699 10.2887 5.46257 10.3879 5.47463 10.4857C5.48669 10.5835 5.5179 10.678 5.56648 10.7637C5.61507 10.8494 5.68006 10.9247 5.75777 10.9853C5.83547 11.0459 5.92435 11.0906 6.01933 11.1169C6.08451 11.1346 6.15177 11.1437 6.21933 11.1437C6.38333 11.1437 6.54278 11.0898 6.67327 10.9905C6.80376 10.8912 6.8981 10.7518 6.94183 10.5937C7.18 9.73756 7.6316 8.95586 8.25433 8.32186C8.32332 8.25156 8.37778 8.16836 8.41461 8.07701C8.45144 7.98567 8.46992 7.88796 8.46899 7.78947C8.46806 7.69098 8.44775 7.59364 8.4092 7.50301C8.37065 7.41237 8.31463 7.33022 8.24433 7.26123C8.17403 7.19225 8.09083 7.13778 7.99949 7.10095C7.90814 7.06412 7.81044 7.04564 7.71195 7.04657C7.61346 7.0475 7.51612 7.06781 7.42548 7.10636C7.33485 7.14491 7.25269 7.20093 7.18371 7.27123ZM6.94121 13.405C6.88479 13.2171 6.75697 13.0587 6.58517 12.9639C6.41337 12.8692 6.21127 12.8455 6.02221 12.898C5.83315 12.9505 5.6722 13.075 5.57386 13.2448C5.47553 13.4146 5.44765 13.6161 5.49621 13.8062C5.80199 14.908 6.38265 15.9141 7.18371 16.73C7.32567 16.859 7.51169 16.9287 7.70349 16.9248C7.89529 16.9209 8.0783 16.8436 8.21487 16.7089C8.35144 16.5742 8.43119 16.3922 8.43772 16.2005C8.44424 16.0088 8.37705 15.8218 8.24996 15.6781C7.6284 15.0433 7.1781 14.2612 6.94121 13.405ZM13.3125 17.0844C12.4516 17.3066 11.5483 17.3066 10.6875 17.0844C10.5912 17.0569 10.4904 17.049 10.3911 17.061C10.2917 17.0731 10.1958 17.105 10.109 17.1547C10.0221 17.2044 9.94608 17.271 9.88537 17.3506C9.82465 17.4302 9.78048 17.5211 9.75545 17.618C9.73042 17.7149 9.72504 17.8158 9.73963 17.9149C9.75421 18.0139 9.78847 18.109 9.84038 18.1945C9.89229 18.2801 9.9608 18.3544 10.0419 18.4131C10.1229 18.4718 10.2149 18.5137 10.3125 18.5362C11.4193 18.822 12.5806 18.822 13.6875 18.5362C13.785 18.5137 13.877 18.4718 13.958 18.4131C14.0391 18.3544 14.1076 18.2801 14.1595 18.1945C14.2114 18.109 14.2457 18.0139 14.2603 17.9149C14.2749 17.8158 14.2695 17.7149 14.2445 17.618C14.2194 17.5211 14.1753 17.4302 14.1145 17.3506C14.0538 17.271 13.9778 17.2044 13.891 17.1547C13.8041 17.105 13.7082 17.0731 13.6088 17.061C13.5095 17.049 13.4087 17.0569 13.3125 17.0844ZM17.9825 12.8831C17.7911 12.8309 17.5869 12.8567 17.4144 12.9547C17.242 13.0528 17.1155 13.2151 17.0625 13.4062C16.8243 14.2624 16.3727 15.0441 15.75 15.6781C15.6106 15.82 15.5332 16.0115 15.535 16.2104C15.5367 16.4093 15.6174 16.5993 15.7593 16.7387C15.9012 16.8781 16.0927 16.9555 16.2916 16.9537C16.4905 16.9519 16.6806 16.8712 16.82 16.7294C17.6205 15.9133 18.2011 14.9076 18.5075 13.8062C18.5337 13.7111 18.5409 13.6117 18.5287 13.5138C18.5165 13.4159 18.4851 13.3213 18.4362 13.2356C18.3874 13.1498 18.3221 13.0745 18.2442 13.0141C18.1662 12.9536 18.077 12.9091 17.9818 12.8831H17.9825ZM17.0593 10.595C17.1157 10.7829 17.2436 10.9412 17.4154 11.036C17.5872 11.1308 17.7893 11.1545 17.9783 11.102C18.1674 11.0495 18.3283 10.925 18.4267 10.7552C18.525 10.5854 18.5529 10.3838 18.5043 10.1937C18.1985 9.09195 17.6179 8.0859 16.8168 7.26998C16.7491 7.19427 16.6668 7.1331 16.5747 7.09017C16.4827 7.04725 16.3828 7.02347 16.2813 7.02028C16.1798 7.01709 16.0787 7.03455 15.9841 7.0716C15.8896 7.10865 15.8035 7.16453 15.7312 7.23584C15.6589 7.30714 15.6018 7.3924 15.5634 7.48643C15.525 7.58047 15.5061 7.68132 15.5079 7.78287C15.5096 7.88442 15.532 7.98456 15.5736 8.07721C15.6152 8.16986 15.6752 8.25309 15.75 8.32186C16.3715 8.95663 16.8218 9.73874 17.0587 10.595H17.0593Z" fill="#00A96E"/>
</svg>

`;

const closedIcon = `
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" fill="#F0E2FF"/>
<path d="M15.0306 9.96938C15.1005 10.0391 15.156 10.1218 15.1939 10.213C15.2317 10.3042 15.2512 10.4019 15.2512 10.5006C15.2512 10.5993 15.2317 10.6971 15.1939 10.7882C15.156 10.8794 15.1005 10.9622 15.0306 11.0319L11.5306 14.5319C11.4609 14.6018 11.3782 14.6573 11.287 14.6951C11.1958 14.733 11.0981 14.7525 10.9994 14.7525C10.9007 14.7525 10.8029 14.733 10.7118 14.6951C10.6206 14.6573 10.5378 14.6018 10.4681 14.5319L8.96813 13.0319C8.89836 12.9621 8.84302 12.8793 8.80527 12.7881C8.76751 12.697 8.74808 12.5993 8.74808 12.5006C8.74808 12.402 8.76751 12.3043 8.80527 12.2131C8.84302 12.122 8.89836 12.0391 8.96813 11.9694C9.03789 11.8996 9.12072 11.8443 9.21187 11.8065C9.30302 11.7688 9.40072 11.7493 9.49938 11.7493C9.59804 11.7493 9.69574 11.7688 9.78689 11.8065C9.87804 11.8443 9.96086 11.8996 10.0306 11.9694L11 12.9375L13.9694 9.9675C14.0392 9.89789 14.122 9.84272 14.2131 9.80513C14.3042 9.76755 14.4018 9.7483 14.5004 9.74847C14.599 9.74865 14.6965 9.76825 14.7875 9.80615C14.8785 9.84405 14.9611 9.89952 15.0306 9.96938ZM18.75 12C18.75 13.335 18.3541 14.6401 17.6124 15.7501C16.8707 16.8601 15.8165 17.7253 14.5831 18.2362C13.3497 18.7471 11.9925 18.8808 10.6831 18.6203C9.37377 18.3598 8.17104 17.717 7.22703 16.773C6.28303 15.829 5.64015 14.6262 5.3797 13.3169C5.11925 12.0075 5.25292 10.6503 5.76382 9.41689C6.27471 8.18349 7.13987 7.12928 8.2499 6.38758C9.35994 5.64588 10.665 5.25 12 5.25C13.7896 5.25199 15.5053 5.96378 16.7708 7.22922C18.0362 8.49466 18.748 10.2104 18.75 12ZM17.25 12C17.25 10.9616 16.9421 9.94661 16.3652 9.08326C15.7883 8.2199 14.9684 7.54699 14.0091 7.14963C13.0498 6.75227 11.9942 6.6483 10.9758 6.85088C9.95738 7.05345 9.02192 7.55346 8.28769 8.28769C7.55347 9.02191 7.05345 9.95738 6.85088 10.9758C6.64831 11.9942 6.75228 13.0498 7.14964 14.0091C7.547 14.9684 8.2199 15.7883 9.08326 16.3652C9.94662 16.9421 10.9617 17.25 12 17.25C13.3919 17.2485 14.7264 16.6949 15.7107 15.7107C16.6949 14.7264 17.2485 13.3919 17.25 12Z" fill="#A855F7"/>
</svg>

`;

const statusIcon = isOpen ? openIcon : closedIcon;


let priorityClass = "";

if(issue.priority.toLowerCase() === "high"){
priorityClass = "bg-red-100 text-red-600";
}
else if(issue.priority.toLowerCase() === "medium"){
priorityClass = "bg-yellow-100 text-yellow-700";
}
else if(issue.priority.toLowerCase() === "low"){
priorityClass = "bg-green-100 text-green-600";
}


const labels = issue.labels.map(label => {

if(label.toLowerCase() === "bug"){
return `<span class="flex items-center gap-1 text-xs bg-red-100 text-red-600 px-2 py-1 rounded">🐞 ${label}</span>`;
}

if(label.toLowerCase() === "help wanted"){
return `<span class="flex items-center gap-1 text-xs bg-yellow-100 text-yellow-600 px-2 py-1 rounded">⚠ ${label}</span>`;
}

if(label.toLowerCase() === "enhancement"){
return `<span class="flex items-center gap-1 text-xs bg-green-100 text-green-600 px-2 py-1 rounded">✨ ${label}</span>`;
}

return `<span class="text-xs bg-gray-200 px-2 py-1 rounded">${label}</span>`;

}).join("");


const card = document.createElement("div");

card.className =
`bg-white p-4 rounded shadow border ${topBorder} cursor-pointer hover:shadow-lg`;


card.innerHTML = `

<div class="flex justify-between items-center mb-2">

<div class="text-sm">
${statusIcon}
</div>

<span class="text-xs px-2 py-1 rounded font-semibold ${priorityClass}">
${issue.priority.toUpperCase()}
</span>

</div>

<h3 class="font-semibold text-sm mb-2">
${issue.title}
</h3>

<p class="text-xs text-gray-500 mb-3">
${issue.description.slice(0,80)}...
</p>

<div class="flex gap-2 mb-3 flex-wrap">
${labels}
</div>

<hr class="mb-2">

<p class="text-xs text-gray-400 mb-1">
#${issue.id} by ${issue.author}
</p>

<p class="text-xs text-gray-400">
${date}
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


searchInput.addEventListener("input", (e)=>{
searchIssues(e.target.value);
});


async function openIssue(id){

const res = await fetch(
`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`
);

const data = await res.json();

const issue = data.data;

document.getElementById("modalTitle").innerText = issue.title;
document.getElementById("modalDesc").innerText = issue.description;
document.getElementById("modalStatus").innerText = issue.status;
document.getElementById("modalAuthor").innerText = "opened by " + issue.author;

document.getElementById("modalDate").innerText =
new Date(issue.createdAt).toLocaleDateString();

document.getElementById("modalAssignee").innerText = issue.assignee;

document.getElementById("modalPriority").innerText =
issue.priority.toUpperCase();

document.getElementById("modalLabel1").innerText =
issue.labels?.[0] || "";

document.getElementById("modalLabel2").innerText =
issue.labels?.[1] || "";

const modal = document.getElementById("issueModal");

modal.classList.remove("hidden");
modal.classList.add("flex");

}


function closeModal(){

const modal = document.getElementById("issueModal");

modal.classList.add("hidden");
modal.classList.remove("flex");

}

loadIssues();