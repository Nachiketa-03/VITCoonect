document.getElementById('cgpaForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve and parse input values
    const currentCgpa = parseFloat(document.getElementById('currentCgpa').value);
    const creditsDone = parseFloat(document.getElementById('creditsDone').value);
    const currentGpa = parseFloat(document.getElementById('currentGpa').value);
    const semesterCredits = parseFloat(document.getElementById('semesterCredits').value);

    // Check if any value is NaN (Not-a-Number)
    if (isNaN(currentCgpa) || isNaN(creditsDone) || isNaN(currentGpa) || isNaN(semesterCredits)) {
        alert("Please enter valid numbers in all fields.");
        return;
    }

    // Calculate total credits and weighted CGPA
    const totalCredits = creditsDone + semesterCredits;
    const weightedCgpa = (currentCgpa * creditsDone + currentGpa * semesterCredits) / totalCredits;

    // Update the total CGPA in the HTML
    document.getElementById('totalCgpa').textContent = weightedCgpa.toFixed(2);
});
const logoutRedirectTime = 15 * 60 * 1000; // 15 minutes in milliseconds

function updateLastActivity() {
    localStorage.setItem('lastActivity', Date.now());
}

function checkInactivity() {
    const lastActivity = localStorage.getItem('lastActivity');
    if (lastActivity && (Date.now() - lastActivity) > logoutRedirectTime) {
        alert("You have been inactive for more than 15 minutes. Redirecting to the login page.");
        window.location.href = "../index.html";
    }
}

function confirmLogout(event) {
    event.preventDefault(); // Prevent the default anchor behavior
    const userConfirmed = confirm("Are you sure you want to log out?");
    
    if (userConfirmed) {
        alert("Thank you for using the website!");
        localStorage.removeItem('lastActivity'); // Clear activity on logout
        window.location.href = "/index.html";
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    checkInactivity(); // Check inactivity on page load
    updateLastActivity(); // Update activity on page load
});

// Reset inactivity timer on any user interaction
document.addEventListener('mousemove', updateLastActivity);
document.addEventListener('keypress', updateLastActivity);
document.addEventListener('click', updateLastActivity);
document.addEventListener('scroll', updateLastActivity);
// to navigate through cgpa button
function openCgpaCalculator() {
            window.location.href = 'CGPA/index.html'; // Adjust the path as needed
        }

function goBack() {
    window.location.href = '/dashboard';
}
    