// JavaScript (script.js)

// Sample data for initial crew members
let crewMembers = [
    { id: 1, name: "Monkey D. Luffy", role: "Captain" },
    { id: 2, name: "Roronoa Zoro", role: "First Mate" },
    // Add more crew members as needed
];

const crewTableBody = document.getElementById("crewTableBody");
const modal = document.getElementById("modal");
const crewForm = document.getElementById("crewForm");
const modalTitle = document.getElementById("modalTitle");
const nameInput = document.getElementById("name");
const roleInput = document.getElementById("role");
const crewIdInput = document.getElementById("crewId");
const addButton = document.getElementById("addButton");

let isEdit = false;
let editId = null;

// Function to render the crew table
function renderCrewTable() {
    crewTableBody.innerHTML = "";
    for (const member of crewMembers) {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${member.name}</td>
            <td>${member.role}</td>
            <td>
                <button class="btn btn-primary" onclick="editCrewMember(${member.id})">Edit</button>
                <button class="btn btn-danger" onclick="deleteCrewMember(${member.id})">Delete</button>
            </td>
        `;
        crewTableBody.appendChild(row);
    }
}

// Function to open the modal for adding a new crew member
function openAddModal() {
    isEdit = false;
    crewForm.reset();
    modalTitle.innerText = "Add Crew Member";
    $('#modal').modal('show'); // Open Bootstrap modal using jQuery
}

// Function to open the modal for editing a crew member
function editCrewMember(id) {
    isEdit = true;
    editId = id;
    const member = crewMembers.find(member => member.id === id);
    nameInput.value = member.name;
    roleInput.value = member.role;
    crewIdInput.value = id;
    modalTitle.innerText = "Edit Crew Member";
    $('#modal').modal('show'); // Open Bootstrap modal using jQuery
}

// Function to delete a crew member
function deleteCrewMember(id) {
    crewMembers = crewMembers.filter(member => member.id !== id);
    renderCrewTable();
}

// Event listeners
addButton.addEventListener("click", openAddModal);
crewForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const name = nameInput.value;
    const role = roleInput.value;

    if (isEdit) {
        // Update existing crew member
        const memberIndex = crewMembers.findIndex(member => member.id === editId);
        crewMembers[memberIndex] = { id: editId, name, role };
    } else {
        // Add new crew member
        const id = crewMembers.length + 1;
        crewMembers.push({ id, name, role });
    }

    renderCrewTable();
    $('#modal').modal('hide'); // Close Bootstrap modal using jQuery
});

// Initial rendering of the crew table
renderCrewTable();