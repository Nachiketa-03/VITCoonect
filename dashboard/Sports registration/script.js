const facilities = [
    { id: 1, name: "FITTY A/C Gymnasium - Men", price: 6490 },
    { id: 2, name: "Trendset A/C Gymnasium - Men", price: 5310 },
    { id: 3, name: "Indoor A/C Gymnasium - Men", price: 5310 },
    { id: 4, name: "Indoor A/C Gymnasium Women (C & D Block)", price: 5310 },
    { id: 5, name: "A/C Gymnasium - Women (G Block)", price: 5310 },
    { id: 6, name: "A/C Gymnasium - Women (A & B Block)", price: 4425 },
    { id: 7, name: "Swimming Men/Women", price: 5310 },
    { id: 8, name: "Synthetic Tennis Men/Women", price: 4425 },
    { id: 9, name: "Badminton Indoor Men/Women", price: 4425 },
    { id: 10, name: "A/C Squash Men/Women", price: 4425 },
    { id: 11, name: "A/C Snooker Men/Women", price: 4425 },
    { id: 12, name: "Karate Men/Women", price: 3540 }
];

let currentFacility = null;
let qrcode = null;
let currentTransactionId = null;

// Display facilities
const container = document.getElementById('facilities-container');
facilities.forEach(facility => {
    const card = document.createElement('div');
    card.className = 'facility-card';
    card.innerHTML = `
        <h3>${facility.name}</h3>
        <p class="price">₹${facility.price}/- per semester</p>
        <button class="register-btn" onclick="initiatePayment(${facility.id})">Register</button>
    `;
    container.appendChild(card);
});

function generateTransactionId() {
    return 'TXN' + Date.now() + Math.random().toString(36).substr(2, 9);
}

function initiatePayment(facilityId) {
    currentFacility = facilities.find(f => f.id === facilityId);
    currentTransactionId = generateTransactionId();
    
    // Clear previous QR code
    document.getElementById('qrcode').innerHTML = '';
    
    // Create payment data with more details
    const paymentData = {
        facilityName: currentFacility.name,
        amount: currentFacility.price,
        transactionId: currentTransactionId,
        timestamp: new Date().toISOString(),
        expiryTime: new Date(Date.now() + 15 * 60000).toISOString() // 15 minutes from now
    };

    // Update modal content with centered QR
    const modalContent = `
        <h2>Scan QR Code to Pay</h2>
        <div class="qr-container">
            <div id="qrcode"></div>
            <p class="amount-text">Amount: ₹${currentFacility.price}/-</p>
            <p class="transaction-id">Transaction ID: ${currentTransactionId}</p>
            <p class="expiry-text">Valid for 15 minutes</p>
        </div>
        <div class="test-buttons">
            <button onclick="simulatePayment(true)" class="success-btn">Accept Payment</button>
            <button onclick="simulatePayment(false)" class="failure-btn">Reject Payment</button>
            <button onclick="closePaymentModal()" class="cancel-btn">Cancel</button>
        </div>
    `;

    document.querySelector('.modal-content').innerHTML = modalContent;

    // Generate QR code
    new QRCode(document.getElementById('qrcode'), {
        text: JSON.stringify(paymentData),
        width: 256,
        height: 256,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: QRCode.CorrectLevel.H
    });

    document.getElementById('paymentModal').style.display = 'block';
}

function handlePaymentResponse(event) {
    if (event.data.transactionId === currentTransactionId) {
        closePaymentModal();
        generatePaymentBill(event.data.success);
        // Remove the event listener
        window.removeEventListener('message', handlePaymentResponse);
    }
}

function simulatePayment(isSuccess) {
    closePaymentModal();
    generatePaymentBill(isSuccess);
}

function generatePaymentBill(isSuccess) {
    const date = new Date().toLocaleDateString();
    const time = new Date().toLocaleTimeString();
    const billNumber = 'BILL-' + Date.now() + Math.random().toString(36).substr(2, 4).toUpperCase();

    const billHTML = `
        <div class="bill-container ${isSuccess ? 'success-bill' : 'failure-bill'}">
            <div class="bill-header">
                <h3>Sports Facility Registration</h3>
                <p class="status ${isSuccess ? 'success-status' : 'failure-status'}">
                    ${isSuccess ? '✓ Payment Successful' : '✕ Payment Failed'}
                </p>
            </div>
            
            <div class="bill-details">
                <div class="bill-row">
                    <span>Bill Number:</span>
                    <span>${billNumber}</span>
                </div>
                <div class="bill-row">
                    <span>Transaction ID:</span>
                    <span>${currentTransactionId}</span>
                </div>
                <div class="bill-row">
                    <span>Date:</span>
                    <span>${date}</span>
                </div>
                <div class="bill-row">
                    <span>Time:</span>
                    <span>${time}</span>
                </div>
                <div class="bill-row">
                    <span>Facility:</span>
                    <span>${currentFacility.name}</span>
                </div>
                <div class="bill-row">
                    <span>Amount:</span>
                    <span>₹${currentFacility.price}/-</span>
                </div>
            </div>

            <div class="bill-footer">
                ${isSuccess ? 
                    `<p class="validity">Valid for one semester</p>
                     <p class="thank-you">Thank you for your registration!</p>` : 
                    `<p class="failure-message">Transaction failed. Please try again.</p>
                     <p class="contact-support">If the issue persists, please contact support.</p>`
                }
            </div>

            <div class="bill-actions">
                ${isSuccess ? '<button onclick="printBill()" class="print-btn">Print Bill</button>' : ''}
                <button onclick="closeModal()" class="close-btn">Close</button>
            </div>
        </div>
    `;

    document.getElementById('receiptContent').innerHTML = billHTML;
    document.getElementById('receiptModal').style.display = 'block';
}

function printBill() {
    const printWindow = window.open('', '', 'height=600,width=800');
    const billContent = document.querySelector('.bill-container').cloneNode(true);
    
    // Remove action buttons for printing
    const actionButtons = billContent.querySelector('.bill-actions');
    if (actionButtons) {
        actionButtons.remove();
    }

    printWindow.document.write(`
        <html>
            <head>
                <title>Payment Bill</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        margin: 0;
                    }
                    .bill-container {
                        max-width: 600px;
                        margin: 0 auto;
                        padding: 20px;
                        border: 1px solid #ddd;
                    }
                    .bill-header {
                        text-align: center;
                        margin-bottom: 20px;
                        padding-bottom: 10px;
                        border-bottom: 2px solid #ddd;
                    }
                    .bill-row {
                        display: flex;
                        justify-content: space-between;
                        margin: 10px 0;
                        padding: 5px 0;
                        border-bottom: 1px solid #eee;
                    }
                    .success-status {
                        color: #28a745;
                        font-weight: bold;
                    }
                    .bill-footer {
                        text-align: center;
                        margin-top: 20px;
                        padding-top: 10px;
                        border-top: 2px solid #ddd;
                    }
                    .validity {
                        color: #28a745;
                        font-weight: bold;
                    }
                    @media print {
                        .bill-actions { display: none; }
                    }
                </style>
            </head>
            <body>
                ${billContent.outerHTML}
            </body>
        </html>
    `);
    
    printWindow.document.close();
    printWindow.print();
}

function closePaymentModal() {
    document.getElementById('paymentModal').style.display = 'none';
}

function closeModal() {
    document.getElementById('receiptModal').style.display = 'none';
}

// Close modals when clicking outside
window.onclick = function(event) {
    const paymentModal = document.getElementById('paymentModal');
    const receiptModal = document.getElementById('receiptModal');
    if (event.target === paymentModal) {
        paymentModal.style.display = 'none';
    } else if (event.target === receiptModal) {
        receiptModal.style.display = 'none';
    }
} 