// Reloading the page with a navbar-logo click
const home = document.querySelector('.navbar-brand');

home.addEventListener('click', () => {
    setTimeout(function () {
        location.reload();
    }, 50);
})

// Function to handle the file selected by the file input
function handleFileUpload(event) {
    // Accessing the first file selected by the user
    const file = event.target.files[0];

    // Checking if there's a file selected
    if (file) {
        // FileReader object to read the file
        const reader = new FileReader();
        // Seting up the onload event handler to be triggered when the FileReader completes reading the file
        reader.onload = function (e) {
            // Accessing the img and seting the src attribute to the result of the FileReader
            const img = document.querySelector('.profile-picture');
            img.src = e.target.result;
        };

        // Reading the file as a Data URL to preview the img
        reader.readAsDataURL(file);
    }
}

// Each contact added as to be added to a table in contacts list
// Function to add contact
function addContact() {
    // Accesing information from the form
    const picture = document.getElementById('profile-picture').src;
    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const dob = document.getElementById('dob').value;
    const gender = document.getElementById('gender').value;

    // Check if any of the required fields are blank
    if (firstName === '' || lastName === '' || email === '' || phone === '') {

        return; // Exit the function early if any field is blank
    }

    // Create a contact object
    const contact = {
        picture: picture,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phone: phone,
        dob: dob,
        gender: gender
    };

    // Adding the contact to the table
    addContactToTable(contact)

    // Clearing the form fields after adding the contact
    document.getElementById('profile-picture').src = './img/picture.jpg';
    document.getElementById('first-name').value = '';
    document.getElementById('last-name').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('dob').value = '';
    document.getElementById('gender').value = 'Choose the gender';
}



// Function to add a new contact to the table
function addContactToTable(contact) {

    const contacts = document.getElementById('contacts');

    // New table row
    const row = document.createElement('tr');

    //Adding contact information to the row
    row.innerHTML = `
        <td><input type="checkbox" class="contact-checkbox"></td>
        <td><img src="${contact.picture}" width="50px" alt="profile-picture" class="profile-picture img-fluid rounded-circle">
        </td>
        <td>${contact.firstName}</td>
        <td>${contact.lastName}</td>
        <td>${contact.email}</td>
        <td>${contact.phone}</td>
        <td>${contact.dob}</td>
        <td>${contact.gender}</td>
    `;

    // Appending the row to contacts
    contacts.appendChild(row);
}


// Using the localStorage to Save, empty, load the contacts
// Function to handle saving contacts
function saveContacts() {
    // Get the contacts from the table
    const contacts = [];

    // Get each row of the table
    const rows = document.querySelectorAll('#contacts tr');

    // Loop through each row and extract contact information
    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const contact = {
            picture: cells[1].querySelector('img').src,
            firstName: cells[2].textContent,
            lastName: cells[3].textContent,
            email: cells[4].textContent,
            phone: cells[5].textContent,
            dob: cells[6].textContent,
            gender: cells[7].textContent
        };
        contacts.push(contact);
    });

    // Save the contacts to localStorage (only strings)
    localStorage.setItem('contacts', JSON.stringify(contacts));
}

// Function to handle erasing selected contacts
function eraseSelectedContacts() {
    // Get all checkboxes
    const checkboxes = document.querySelectorAll('.contact-checkbox');

    // Loop through checkboxes and remove selected contacts
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            checkbox.closest('tr').remove();
        }
    });

    // Save the remaining contacts to localStorage
    saveContacts();
}

// Function to handle emptying all contacts
function emptyAllContacts() {
    // Remove all rows from the table
    const tbody = document.getElementById('contacts');
    tbody.innerHTML = '';

    // Clear localStorage
    localStorage.removeItem('contacts');
}

// Add event listeners to buttons
document.getElementById('saveButton').addEventListener('click', saveContacts);
document.getElementById('eraseSelectedButton').addEventListener('click', eraseSelectedContacts);
document.getElementById('emptyAllButton').addEventListener('click', emptyAllContacts);