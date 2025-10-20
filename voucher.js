// Elementos del DOM
const paidAmountElement = document.getElementById('paidAmount');
const recipientNameElement = document.getElementById('recipientName');
const transactionDateElement = document.getElementById('transactionDate');
const transactionTimeElement = document.getElementById('transactionTime');
const transactionMessageElement = document.getElementById('transactionMessage');
const codeAElement = document.getElementById('codeA');
const codeBElement = document.getElementById('codeB');
const codeCElement = document.getElementById('codeC');
const phoneNumberElement = document.getElementById('phoneNumber');
const operationNumberElement = document.getElementById('operationNumber');
const closeButton = document.querySelector('.close-button');
const newPaymentBtn = document.getElementById('newPayment');
const shareButton = document.querySelector('.share-button');

// Meses en español abreviados
const months = [
    'ene.', 'feb.', 'mar.', 'abr.', 'may.', 'jun.',
    'jul.', 'ago.', 'set.', 'oct.', 'nov.', 'dic.'
];

// Formatear fecha en formato "01 ene. 2023"
function formatDate(date) {
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    
    return `${day} ${month} ${year}`;
}

// Formatear hora en formato "12:00 p.m."
function formatTime(date) {
    let hours = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    
    hours = hours % 12;
    hours = hours ? hours : 12; // La hora '0' debe ser '12'
    hours = hours < 10 ? '0' + hours : hours; // Añade cero a la izquierda si es necesario
    minutes = minutes < 10 ? '0' + minutes : minutes;
    
    return `${hours}:${minutes} ${ampm}`;
}

// Generar código de seguridad aleatorio
function generateSecurityCode() {
    return {
        a: Math.floor(Math.random() * 10),
        b: Math.floor(Math.random() * 10),
        c: Math.floor(Math.random() * 10)
    };
}

// Generar número de operación aleatorio
function generateOperationNumber() {
    return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// Formatear número de teléfono
function formatPhone(phone) {
    if (!phone) return '*** *** ***';
    if (phone.length <= 3) return `*** *** ${phone}`;
    const lastThree = phone.slice(-3);
    return `*** *** ${lastThree}`;
}

// Formatear monto (sin decimales si es entero)
function formatAmount(amount) {
    const num = parseFloat(amount);
    if (num % 1 === 0) {
        return num.toString(); // Sin decimales
    } else {
        return num.toFixed(2); // Con decimales
    }
}

// Inicializar página
document.addEventListener('DOMContentLoaded', () => {
    // Obtener datos de la transacción
    const transactionData = JSON.parse(localStorage.getItem('currentTransaction')) || {};
    
    if (!transactionData.amount) {
        // Si no hay datos, redirigir a index.html
        window.location.href = 'index.html';
        return;
    }
    
    // Usar la fecha y hora actuales (tiempo real)
    const now = new Date();
    
    // Mostrar datos de la transacción
    paidAmountElement.textContent = formatAmount(transactionData.amount);
    recipientNameElement.textContent = transactionData.recipientName || 'Destinatario no especificado';
    transactionDateElement.textContent = formatDate(now);
    transactionTimeElement.textContent = formatTime(now);
    transactionMessageElement.textContent = transactionData.message || 'Sin mensaje';
    
    // Generar y mostrar código de seguridad
    const securityCode = generateSecurityCode();
    codeAElement.textContent = securityCode.a;
    codeBElement.textContent = securityCode.b;
    codeCElement.textContent = securityCode.c;
    
    // Mostrar número de teléfono formateado
    phoneNumberElement.textContent = formatPhone(transactionData.recipientPhone);
    
    // Generar y mostrar número de operación
    operationNumberElement.textContent = generateOperationNumber();
});

// Cerrar comprobante
closeButton.addEventListener('click', () => {
    window.location.href = 'index.html';
});

// Nuevo pago
newPaymentBtn.addEventListener('click', () => {
    window.location.href = 'billpay.html';
});

// Compartir comprobante
shareButton.addEventListener('click', () => {
    alert('Funcionalidad de compartir no implementada en esta versión educativa.');
});