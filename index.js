// Datos de ejemplo
let contacts = JSON.parse(localStorage.getItem('contacts')) || [
    { name: "Luz M. Sanchez T.", phone: "987654589", qrcode: "luz_sanchez_qr" },
    { name: "Felicita Vasquez T.", phone: "912345501", qrcode: "maria_garcia_qr" },
    { name: "Carlos López", phone: "934567890", qrcode: "carlos_lopez_qr" }
];

// Elementos del DOM
const tableBody = document.getElementById('tableBody');
const addBtn = document.getElementById('addBtn');
const modal = document.getElementById('addModal');
const closeBtn = document.querySelector('.close');
const addForm = document.getElementById('addForm');
const searchInput = document.getElementById('searchInput');
const entriesPerPage = document.getElementById('entriesPerPage');
const tableInfo = document.getElementById('tableInfo');
const pagination = document.getElementById('pagination');

// Variables para paginación
let currentPage = 1;
let entriesPerPageValue = 10;
let filteredContacts = [...contacts];

// Mostrar modal
addBtn.addEventListener('click', () => {
    modal.style.display = 'block';
});

// Cerrar modal
closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal al hacer clic fuera
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Añadir nuevo contacto
addForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const qrcode = document.getElementById('qrcode').value;
    const isSpecial = document.getElementById('isSpecial').checked || false; // ✅ Nuevo campo

    
    contacts.push({ name, phone, qrcode, isSpecial });
    localStorage.setItem('contacts', JSON.stringify(contacts));
    
    filteredContacts = [...contacts];
    renderTable();
    updatePagination();
    
    addForm.reset();
    modal.style.display = 'none';
});

// Formatear número de teléfono
function formatPhone(phone) {
    if (phone.length <= 3) return phone;
    const lastThree = phone.slice(-3);
    return `*** *** ${lastThree}`;
}

// Generar número de operación aleatorio
function generateOperationNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Renderizar tabla
function renderTable() {
    tableBody.innerHTML = '';
    
    const startIndex = (currentPage - 1) * entriesPerPageValue;
    const endIndex = Math.min(startIndex + entriesPerPageValue, filteredContacts.length);
    const currentContacts = filteredContacts.slice(startIndex, endIndex);
    
    currentContacts.forEach(contact => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${contact.name}</td>
            <td>${contact.phone}</td>
            <td>${contact.qrcode}</td>
            <td>${formatPhone(contact.phone)}</td>
            <td><button class="go-btn" data-name="${contact.name}" data-phone="${contact.phone}">Go</button></td>
        `;
        
        tableBody.appendChild(row);
    });
    
    // Actualizar información de la tabla
    tableInfo.textContent = `Showing ${startIndex + 1} to ${endIndex} of ${filteredContacts.length} entries`;
    
    // Añadir event listeners a los botones Go
    document.querySelectorAll('.go-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const name = btn.getAttribute('data-name');
            const phone = btn.getAttribute('data-phone');
            
            // Guardar datos para la página de pago
            localStorage.setItem('currentRecipient', JSON.stringify({ name, phone }));
            
            // ✅ Verificar si es cliente especial
            const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
            const currentContact = contacts.find(contact => 
                contact.name === name && contact.phone === phone
            );
            
            if (currentContact && currentContact.isSpecial) {
                window.location.href = 'voucherservice.html';
            } else {
                window.location.href = 'pay.html';
            }
        });
    });
}

// Actualizar paginación
function updatePagination() {
    const totalPages = Math.ceil(filteredContacts.length / entriesPerPageValue);
    
    pagination.innerHTML = '';
    
    // Botón anterior
    const prevBtn = document.createElement('button');
    prevBtn.textContent = 'Previous';
    prevBtn.disabled = currentPage === 1;
    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderTable();
            updatePagination();
        }
    });
    pagination.appendChild(prevBtn);
    
    // Números de página
    for (let i = 1; i <= totalPages; i++) {
        const pageBtn = document.createElement('button');
        pageBtn.textContent = i;
        pageBtn.classList.toggle('active', i === currentPage);
        pageBtn.addEventListener('click', () => {
            currentPage = i;
            renderTable();
            updatePagination();
        });
        pagination.appendChild(pageBtn);
    }
    
    // Botón siguiente
    const nextBtn = document.createElement('button');
    nextBtn.textContent = 'Next';
    nextBtn.disabled = currentPage === totalPages;
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            renderTable();
            updatePagination();
        }
    });
    pagination.appendChild(nextBtn);
}

// Filtrar contactos
searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.toLowerCase();
    
    if (searchTerm) {
        filteredContacts = contacts.filter(contact => 
            contact.name.toLowerCase().includes(searchTerm) ||
            contact.phone.includes(searchTerm) ||
            contact.qrcode.toLowerCase().includes(searchTerm)
        );
    } else {
        filteredContacts = [...contacts];
    }
    
    currentPage = 1;
    renderTable();
    updatePagination();
});

// Cambiar número de entradas por página
entriesPerPage.addEventListener('change', () => {
    entriesPerPageValue = parseInt(entriesPerPage.value);
    currentPage = 1;
    renderTable();
    updatePagination();
});

// Inicializar
renderTable();
updatePagination();