// Elementos del DOM
const payToElement = document.getElementById('payTo');
const amountInput = document.getElementById('amount');
const messageInput = document.getElementById('message');
const otherBanksBtn = document.getElementById('otherBanks');
const payNowBtn = document.getElementById('payNow');
const amountError = document.getElementById('amountError');

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    // Obtener datos del destinatario
    const recipientData = JSON.parse(localStorage.getItem('currentRecipient')) || {};
    
    if (recipientData.name) {
        payToElement.textContent = `Pagar a ${recipientData.name}`;
    } else {
        // Si no hay datos, redirigir a index.html
        window.location.href = 'index.html';
    }
});

// Validar monto
amountInput.addEventListener('input', () => {
    const amount = parseFloat(amountInput.value);
    
    if (isNaN(amount) || amount <= 0) {
        amountError.style.display = 'block';
        payNowBtn.disabled = true;
    } else {
        amountError.style.display = 'none';
        payNowBtn.disabled = false;
    }
});

// Botón otros bancos
otherBanksBtn.addEventListener('click', () => {
    alert('Funcionalidad de otros bancos no implementada en esta versión educativa.');
});

// Realizar pago
payNowBtn.addEventListener('click', () => {
    const amount = parseFloat(amountInput.value);
    const message = messageInput.value || 'Sin mensaje';
    
    if (isNaN(amount) || amount <= 0) {
        amountError.style.display = 'block';
        return;
    }
    
    // Obtener datos del destinatario
    const recipientData = JSON.parse(localStorage.getItem('currentRecipient')) || {};
    
    // Guardar datos para el comprobante
    const transactionData = {
        amount,
        message,
        recipientName: recipientData.name,
        recipientPhone: recipientData.phone,
        date: new Date().toLocaleDateString(),
        time: new Date().toLocaleTimeString()
    };
    
    localStorage.setItem('currentTransaction', JSON.stringify(transactionData));
    
    // ✅ NUEVO: Verificar si es cliente especial
    const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
    const currentContact = contacts.find(contact => 
        contact.name === recipientData.name && contact.phone === recipientData.phone
    );
    
    // Redirigir según tipo de cliente
    if (currentContact && currentContact.isSpecial) {
        // Cliente especial → voucherservice.html
        window.location.href = 'voucherservice.html';
    } else {
        // Cliente normal → voucher.html
        window.location.href = 'voucher.html';
    }
});