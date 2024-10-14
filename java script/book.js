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
    const modal = document.getElementById('update-modal');
    modal.style.display = 'block';

    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    document.getElementById(`saveChanges-${book.id}`).onclick = () => {
        // עדכון המידע של הספר
        book.title = document.getElementById(`update-title-${book.id}`).value;
        book.price = parseFloat(document.getElementById(`update-price-${book.id}`).value);
        book.picture = document.getElementById(`update-picture-${book.id}`).value;

        const pictureInput = document.getElementById(`update-picture-${book.id}`);
        if (pictureInput.files.length > 0) {
            const reader = new FileReader();
            reader.onload = function (e) {
                book.picture = e.target.result; // עדכון ה-URL של התמונה
                renderBooks(); // רענון הטבלה לאחר השינויים
            };
            reader.readAsDataURL(pictureInput.files[0]); // קריאת התמונה הנבחרת
        } else {
            renderBooks(); // אם לא נבחרה תמונה חדשה, רק לעדכן את השאר
        }

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

window.onclick = function (event) {
    const modal = document.getElementById('update-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
};
window.onload = loadAndRenderBooks();
