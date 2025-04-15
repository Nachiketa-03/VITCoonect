const logoutRedirectTime = 5 * 60 * 1000; // 5 minutes in milliseconds

// Update inactivity constants
const INACTIVITY_TIMEOUT = 5 * 60 * 1000; // 5 minutes in milliseconds
const WARNING_TIMEOUT = 4 * 60 * 1000;    // 4 minutes in milliseconds
let inactivityTimer;
let warningTimer;

function updateLastActivity() {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    // Update last activity on server
    fetch('/api/update-activity', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email })
    }).catch(error => console.error('Error updating activity:', error));

    // Reset timers
    startInactivityTimer();
}

function startInactivityTimer() {
    clearTimeout(inactivityTimer);
    clearTimeout(warningTimer);

    // Set warning timer
    warningTimer = setTimeout(() => {
        Swal.fire({
            title: 'Inactivity Warning',
            text: 'You will be logged out in 1 minute due to inactivity.',
            icon: 'warning',
            confirmButtonText: 'Keep me logged in',
            timer: 60000, // 1 minute
            timerProgressBar: true,
            showCancelButton: false,
            allowOutsideClick: false
        }).then((result) => {
            if (result.isConfirmed) {
                updateLastActivity();
            }
        });
    }, WARNING_TIMEOUT);

    // Set logout timer
    inactivityTimer = setTimeout(() => {
        handleInactivityLogout();
    }, INACTIVITY_TIMEOUT);
}

async function handleInactivityLogout() {
    const email = localStorage.getItem('userEmail');
    if (!email) return;

    try {
        // Update user status on server
        await fetch('/api/update-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 
                email,
                isActive: false 
            })
        });

        // Clear local storage and redirect
        localStorage.clear();
        Swal.fire({
            title: 'Session Expired',
            text: 'You have been logged out due to inactivity.',
            icon: 'info',
            confirmButtonText: 'OK'
        }).then(() => {
            window.location.href = '../index.html';
        });
    } catch (error) {
        console.error('Error handling inactivity logout:', error);
        window.location.href = '../index.html';
    }
}

function confirmLogout(event) {
    event.preventDefault();
    
    Swal.fire({
        title: 'Confirm Logout',
        text: 'Are you sure you want to log out?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, log out',
        cancelButtonText: 'Cancel'
    }).then((result) => {
        if (result.isConfirmed) {
            const email = localStorage.getItem('userEmail');
            if (email) {
                // Update user status on server
                fetch('/api/update-activity', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ 
                        email,
                        isActive: false 
                    })
                }).catch(error => console.error('Error updating activity status:', error));
            }

            clearTimeout(inactivityTimer);
            clearTimeout(warningTimer);
            localStorage.clear();
            
            Swal.fire({
                title: 'Logged Out',
                text: 'Thank you for using the website!',
                icon: 'success',
                timer: 2000,
                showConfirmButton: false
            }).then(() => {
                window.location.href = '../index.html';
            });
        }
    });
}

function openCgpaCalculator() {
    window.location.href = 'CGPA/index.html';
}

function openChatbot() {
    window.location.href = 'ai-chat/public/index.html';
}

function openHostel() {
    window.location.href = 'Hostel/index.html';
}

function openmap() {
    window.location.href = 'Google map/index.html';
}
function playo() {
    window.location.href = 'Sports registration/index.html';
}

function openSettings() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    Swal.fire({
        title: 'Settings',
        html: `
            <div class="settings-form">
                <div class="form-group">
                    <h3>Profile Settings</h3>
                    <label>Current Email: ${userEmail}</label>
                    <label>Current Username: ${username || userEmail}</label>
                    <input type="text" id="newUsername" class="swal2-input" placeholder="New Username">
                </div>
                
                <div class="form-group">
                    <h3>Password Settings</h3>
                    <input type="password" id="currentPassword" class="swal2-input" placeholder="Current Password">
                    <input type="password" id="newPassword" class="swal2-input" placeholder="New Password">
                    <input type="password" id="confirmPassword" class="swal2-input" placeholder="Confirm New Password">
                </div>

                <div class="form-group">
                    <h3>Theme Settings</h3>
                    <label class="theme-toggle">
                        <input type="checkbox" id="darkMode" ${isDarkMode ? 'checked' : ''}>
                        Dark Mode
                    </label>
                </div>
            </div>
        `,
        showCancelButton: true,
        confirmButtonText: 'Save Changes',
        confirmButtonColor: '#6200ea',
        cancelButtonText: 'Cancel',
        preConfirm: async () => {
            try {
                const newUsername = document.getElementById('newUsername').value;
                const currentPassword = document.getElementById('currentPassword').value;
                const newPassword = document.getElementById('newPassword').value;
                const confirmPassword = document.getElementById('confirmPassword').value;
                const darkMode = document.getElementById('darkMode').checked;

                // Handle password change if fields are filled
                if (currentPassword || newPassword || confirmPassword) {
                    if (!currentPassword || !newPassword || !confirmPassword) {
                        Swal.showValidationMessage('All password fields are required');
                        return false;
                    }
                    if (newPassword !== confirmPassword) {
                        Swal.showValidationMessage('New passwords do not match');
                        return false;
                    }

                    const passwordResponse = await fetch('/api/change-password', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userEmail,
                            currentPassword,
                            newPassword
                        })
                    });

                    const passwordData = await passwordResponse.json();
                    if (!passwordData.success) {
                        throw new Error(passwordData.message);
                    }
                }

                // Handle username change if provided
                if (newUsername) {
                    const usernameResponse = await fetch('/api/update-username', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            email: userEmail,
                            newUsername
                        })
                    });

                    const usernameData = await usernameResponse.json();
                    if (!usernameData.success) {
                        throw new Error(usernameData.message);
                    }

                    localStorage.setItem('username', newUsername);
                }

                // Save theme preference
                localStorage.setItem('darkMode', darkMode);
                updateTheme();

                return {
                    passwordChanged: Boolean(currentPassword && newPassword),
                    usernameChanged: Boolean(newUsername),
                    darkMode
                };
            } catch (error) {
                Swal.showValidationMessage(`Failed to save changes: ${error.message}`);
                return false;
            }
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const darkMode = document.getElementById('darkMode').checked;
            setTheme(darkMode);
            if (result.value.passwordChanged) {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Updated',
                    text: 'Please log in again with your new password.',
                    confirmButtonColor: '#6200ea'
                }).then(() => {
                    localStorage.clear();
                    window.location.href = '/';
                });
            } else {
                Swal.fire({
                    icon: 'success',
                    title: 'Settings Updated',
                    text: 'Your changes have been saved.',
                    confirmButtonColor: '#6200ea'
                }).then(() => {
                    if (result.value.usernameChanged) {
                        location.reload();
                    }
                });
            }
        }
    });
}

function toggleMenu() {
    document.querySelector('.side-panel').classList.toggle('active');
}

function showSection(section) {
    if(section === 'chatbot') {
        window.location.href = 'ai-chat/public/index.html';
    } else if(section === 'community') {
        window.location.href = 'community/index.html';
    }
}

function generateInitialsAvatar(username) {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = 200;
    canvas.height = 200;

    // Random background color
    const colors = [
        '#1abc9c', '#2ecc71', '#3498db', '#9b59b6', '#34495e',
        '#16a085', '#27ae60', '#2980b9', '#8e44ad', '#2c3e50'
    ];
    const backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Draw background
    context.fillStyle = backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw text
    const initials = username
        .split(' ')
        .map(word => word[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    context.font = 'bold 80px Arial';
    context.fillStyle = '#FFFFFF';
    context.textAlign = 'center';
    context.textBaseline = 'middle';
    context.fillText(initials, canvas.width/2, canvas.height/2);

    return canvas.toDataURL('image/png');
}

// Add this function to get user data from localStorage
function getUserData() {
    return {
        username: localStorage.getItem('username'),
        email: localStorage.getItem('userEmail'),
        profilePic: localStorage.getItem('profilePicture')
    };
}

// Single DOMContentLoaded event listener
document.addEventListener('DOMContentLoaded', function() {
    // Initialize inactivity check
    checkInactivity();
    updateLastActivity();

    const profilePic = document.getElementById('profilePic');
    const userNameElement = document.getElementById('userEmail'); // Rename this element in HTML later
    
    // Get user data from localStorage
    const userData = getUserData();
    
    // Set username in the UI
    if (userData.username) {
        userNameElement.textContent = userData.username; // Will show "21BCE3804"
    } else {
        userNameElement.textContent = userData.email || 'User';
    }
    
    // Load saved profile picture or generate one from email
    const savedProfilePic = localStorage.getItem('profilePicture');
    if (savedProfilePic) {
        profilePic.src = savedProfilePic;
    } else {
        // Try to get Gmail profile picture
        fetch(`/api/user-profile?email=${encodeURIComponent(userData.email)}`)
            .then(response => response.json())
            .then(data => {
                if (data.success && data.profilePic) {
                    profilePic.src = data.profilePic;
                    localStorage.setItem('profilePicture', data.profilePic);
                } else {
                    // Fallback to initials avatar using username instead of email
                    const defaultAvatar = generateInitialsAvatar(userData.email);
                    profilePic.src = defaultAvatar;
                    localStorage.setItem('profilePicture', defaultAvatar);
                }
            })
            .catch(error => {
                console.error('Error fetching profile:', error);
                const defaultAvatar = generateInitialsAvatar(userData.email);
                profilePic.src = defaultAvatar;
                localStorage.setItem('profilePicture', defaultAvatar);
            });
    }

    // Profile picture upload handling
    const profileUpload = document.getElementById('profileUpload');
    profileUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5000000) {
                alert('File is too large. Please choose a smaller image.');
                return;
            }
            const reader = new FileReader();
            reader.onload = function(e) {
                try {
                    profilePic.src = e.target.result;
                    localStorage.setItem('profilePicture', e.target.result);
                } catch (error) {
                    alert('Error uploading image. Please try again.');
                    const defaultAvatar = generateInitialsAvatar(userData.email);
                    profilePic.src = defaultAvatar;
                    localStorage.setItem('profilePicture', defaultAvatar);
                }
            };
            reader.readAsDataURL(file);
        }
    });

    // Navigation active state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            navItems.forEach(nav => nav.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Restore panel state
    const panelCollapsed = localStorage.getItem('panelCollapsed') === 'true';
    if (panelCollapsed) {
        document.getElementById('sidePanel').classList.add('collapsed');
        document.querySelector('.main-content').classList.add('shifted');
    }

    // Initialize activity tracking only after successful login
    const userEmail = localStorage.getItem('userEmail');
    if (userEmail) {
        setupActivityTracking();
        startInactivityTimer();
        updateLastActivity(); // Initial activity update
    }
});

// Activity monitoring
document.addEventListener('mousemove', updateLastActivity);
document.addEventListener('keypress', updateLastActivity);
document.addEventListener('click', updateLastActivity);
document.addEventListener('scroll', updateLastActivity);

// Update profile picture handling
document.getElementById('profileUpload').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
        if (file.size > 5000000) { // 5MB limit
            Swal.fire({
                icon: 'error',
                title: 'File Too Large',
                text: 'Please choose an image under 5MB',
                confirmButtonColor: '#6200ea'
            });
            return;
        }

        const reader = new FileReader();
        reader.onload = async function(e) {
            try {
                const profilePic = document.getElementById('profilePic');
                const imageData = e.target.result;
                
                // Update server
                const response = await fetch('/api/update-profile-pic', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: localStorage.getItem('userEmail'),
                        profilePic: imageData
                    })
                });

                const data = await response.json();
                
                if (data.success) {
                    profilePic.src = imageData;
                    localStorage.setItem('profilePic', imageData);
                    
                    Swal.fire({
                        icon: 'success',
                        title: 'Profile Updated!',
                        text: 'Your profile picture has been updated successfully.',
                        confirmButtonColor: '#6200ea'
                    });
                } else {
                    throw new Error(data.message);
                }
            } catch (error) {
                console.error('Error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Update Failed',
                    text: 'Failed to update profile picture. Please try again.',
                    confirmButtonColor: '#6200ea'
                });
            }
        };
        reader.readAsDataURL(file);
    }
});

// Update the DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async function() {
    const profilePic = document.getElementById('profilePic');
    const userNameElement = document.getElementById('userEmail');
    
    // Get user data from localStorage
    const userEmail = localStorage.getItem('userEmail');
    const username = localStorage.getItem('username');

    // Set username
    userNameElement.textContent = username || userEmail;

    try {
        // Fetch user profile from server
        const response = await fetch(`/api/user-profile?email=${encodeURIComponent(userEmail)}`);
        const data = await response.json();

        if (data.success && data.profilePic) {
            profilePic.src = data.profilePic;
            localStorage.setItem('profilePic', data.profilePic);
        } else {
            // Generate avatar if no profile picture exists
            const avatarUrl = generateInitialsAvatar(username || userEmail);
            profilePic.src = avatarUrl;
        }
    } catch (error) {
        console.error('Error loading profile:', error);
        // Fallback to avatar
        const avatarUrl = generateInitialsAvatar(username || userEmail);
        profilePic.src = avatarUrl;
    }
});

function openSportsRegistration() {
    window.location.href = 'Sports registration/index.html';
}

// Add this function to update theme
function updateTheme() {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('dark-mode', isDarkMode);
}

// Make sure this is called when the page loads
document.addEventListener('DOMContentLoaded', () => {
    updateTheme();
    // ... rest of your DOMContentLoaded code ...
});

// Add these functions for theme management
function toggleTheme(event) {
    event.preventDefault();
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setTheme(!isDarkMode);
    
    // Toggle icons
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
    if (isDarkMode) {
        darkIcon.style.display = 'inline-block';
        lightIcon.style.display = 'none';
    } else {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline-block';
    }
}

function setTheme(isDarkMode) {
    localStorage.setItem('darkMode', isDarkMode);
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Update icons
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
    if (darkIcon && lightIcon) {
        if (isDarkMode) {
            darkIcon.style.display = 'none';
            lightIcon.style.display = 'inline-block';
        } else {
            darkIcon.style.display = 'inline-block';
            lightIcon.style.display = 'none';
        }
    }
}

// Initialize theme on page load with light mode as default
document.addEventListener('DOMContentLoaded', () => {
    // Check if theme preference exists, if not set to light mode
    if (localStorage.getItem('darkMode') === null) {
        localStorage.setItem('darkMode', 'false');
    }
    
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    setTheme(isDarkMode);
    
    // Set initial icon state
    const darkIcon = document.querySelector('.dark-icon');
    const lightIcon = document.querySelector('.light-icon');
    
    if (isDarkMode) {
        darkIcon.style.display = 'none';
        lightIcon.style.display = 'inline-block';
    } else {
        darkIcon.style.display = 'inline-block';
        lightIcon.style.display = 'none';
    }
});

// Add these functions for panel toggle
document.addEventListener('DOMContentLoaded', function() {
    const sidePanel = document.querySelector('.side-panel');
    const mainContent = document.querySelector('.main-content');
    const hamburgerBtn = document.querySelector('.hamburger-btn');

    function togglePanel() {
        sidePanel.classList.toggle('expanded');
        mainContent.classList.toggle('shifted');
    }

    hamburgerBtn.addEventListener('click', togglePanel);

    // Add tooltips for collapsed state
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const text = item.querySelector('span').textContent;
        item.setAttribute('title', text);
    });
});

// Add panel toggle function
function togglePanel() {
    const sidePanel = document.getElementById('sidePanel');
    const mainContent = document.querySelector('.main-content');
    
    sidePanel.classList.toggle('collapsed');
    mainContent.classList.toggle('shifted');
    
    // Save state to localStorage
    localStorage.setItem('panelCollapsed', sidePanel.classList.contains('collapsed'));
}

// Update event listeners for activity tracking
function setupActivityTracking() {
    const events = ['mousemove', 'keypress', 'click', 'scroll', 'touchstart'];
    events.forEach(event => {
        document.addEventListener(event, updateLastActivity);
    });
}