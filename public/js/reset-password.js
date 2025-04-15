async function handleResetPassword(event) {
    event.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Get the token from URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    
    console.log('Reset attempt with token:', token);

    if (!token) {
        Swal.fire({
            icon: 'error',
            title: 'Invalid Reset Link',
            text: 'The password reset link is invalid or has expired.',
            confirmButtonColor: '#6200ea'
        });
        return;
    }

    if (newPassword !== confirmPassword) {
        Swal.fire({
            icon: 'error',
            title: 'Password Mismatch',
            text: 'The passwords you entered do not match.',
            confirmButtonColor: '#6200ea'
        });
        return;
    }

    try {
        const response = await fetch('/api/reset-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                token: token,
                newPassword: newPassword
            })
        });

        const data = await response.json();
        console.log('Reset password response:', data);

        if (data.success) {
            await Swal.fire({
                icon: 'success',
                title: 'Password Reset Successful!',
                text: 'You can now login with your new password.',
                confirmButtonColor: '#6200ea'
            });
            window.location.href = '/';
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Reset Failed',
                text: data.message || 'Failed to reset password',
                confirmButtonColor: '#6200ea'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while resetting your password.',
            confirmButtonColor: '#6200ea'
        });
    }
} 