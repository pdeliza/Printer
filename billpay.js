// Elementos del DOM
const scanQRBtn = document.getElementById('scanQR');
const payBtn = document.getElementById('payBtn');
const toggleBalanceBtn = document.getElementById('toggleBalance');
const balanceElement = document.getElementById('balance');
const userNameElement = document.getElementById('userName');

// Datos del usuario (simulados)
const userData = {
    name: "Ana Torres",
    balance: 245.50
};

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    userNameElement.textContent = userData.name;
    balanceElement.textContent = userData.balance.toFixed(2);
    
    // Ocultar saldo inicialmente
    balanceElement.style.filter = 'blur(5px)';
    toggleBalanceBtn.textContent = 'Mostrar saldo';
});

// Alternar visibilidad del saldo
toggleBalanceBtn.addEventListener('click', () => {
    if (balanceElement.style.filter === 'blur(5px)') {
        balanceElement.style.filter = 'none';
        toggleBalanceBtn.textContent = 'Ocultar saldo';
    } else {
        balanceElement.style.filter = 'blur(5px)';
        toggleBalanceBtn.textContent = 'Mostrar saldo';
    }
});

// Escanear QR
scanQRBtn.addEventListener('click', () => {
    // Simular escaneo de QR
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    
    if (contacts.length > 0) {
        // Tomar el primer contacto como ejemplo (en una app real, se escanearía un código QR)
        const contact = contacts[0];
        
        // Guardar datos para la página de pago
        localStorage.setItem('currentRecipient', JSON.stringify({
            name: contact.name,
            phone: contact.phone
        }));
        
        // Redirigir a pay.html
        window.location.href = 'pay.html';
    } else {
        alert('No hay contactos disponibles. Por favor, agregue contactos primero.');
        window.location.href = 'index.html';
    }
});

// Ir a página de pago
payBtn.addEventListener('click', () => {
    window.location.href = 'index.html';
});