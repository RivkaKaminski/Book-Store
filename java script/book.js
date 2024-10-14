async function loadAndRenderBooks() {
    try {
        const response = await fetch('../java script/data.json');
        const books = await response.json();
        renderBooks(books);
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

function renderBooks(books) {
    const tableBody = document.getElementById('books-table');
    tableBody.innerHTML = '';

    books.forEach(book => {
        const row = document.createElement('tr');
        const idCell = document.createElement('td');
        idCell.textContent = book.id;
        row.appendChild(idCell);
        // Title
        const titleCell = document.createElement('td');
        titleCell.textContent = book.title;
        row.appendChild(titleCell);
        // Price
        const priceCell = document.createElement('td');
        priceCell.textContent = `$${book.price}`;
        row.appendChild(priceCell);

        // // Picture
        // const pictureCell = document.createElement('td');
        // const img = document.createElement('img');
        // img.src = book.picture;
        // img.alt = book.title;
        // img.width = 50; // גודל התמונה
        // pictureCell.appendChild(img);
        // row.appendChild(pictureCell);

        // CRUD Actions
        const actionsCell = document.createElement('td');
        actionsCell.className = 'actions';

        // כפתור Read
        const readBtn = document.createElement('button');
        readBtn.textContent = 'Read';
        readBtn.onclick = () => openModal(book);
        actionsCell.appendChild(readBtn);

        // כפתור Update
        const updateBtn = document.createElement('button');
        updateBtn.textContent = 'Update';
        updateBtn.onclick = () => updateBook(book);
        actionsCell.appendChild(updateBtn);

        // כפתור Delete
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.onclick = () => deleteBook(book);
        actionsCell.appendChild(deleteBtn);

        row.appendChild(actionsCell);
        tableBody.appendChild(row);
    });
}

function openModal(book) {
    alert(`Reading book: ${book.title}`);
}
function updateBook(book) {
    const modalContent = `
        <div style="background-color: white; padding: 20px; border-radius: 5px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
            <h2>Edit Book</h2>
            <label for="update-title-${book.id}">Title:</label>
            <input type="text" id="update-title-${book.id}" value="${book.title}">

            <label for="update-price-${book.id}">Price:</label>
            <input type="number" id="update-price-${book.id}" value="${book.price}">

            <label for="update-picture-${book.id}">Picture URL:</label>
            <input type="text" id="update-picture-${book.id}" value="${book.picture}">

            <button id="saveChanges-${book.id}">Save Changes</button>
        </div>
    `;

    const modal = document.createElement('div');
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    document.getElementById(`saveChanges-${book.id}`).onclick = () => {
        // עדכון המידע של הספר
        book.title = document.getElementById(`update-title-${book.id}`).value;
        book.price = parseFloat(document.getElementById(`update-price-${book.id}`).value);
        book.picture = document.getElementById(`update-picture-${book.id}`).value;

        document.body.removeChild(modal); // סגירת המודאל
        renderBooks(); // רענון הטבלה
    };
}


function deleteBook(book) {
    const confirmDelete = confirm(`Are you sure you want to delete ${book.title}?`);
    if (confirmDelete) {
        alert(`${book.title} deleted`);
    }
}


window.onload = loadAndRenderBooks();
