document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const fullname = document.getElementById('fullname').value;
    const age = document.getElementById('age').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ fullname, age, email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Sign up successful!');
        } else {
            alert('Sign up failed: ' + data.message);
        }
    });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('profileName').textContent = data.fullname;
            document.getElementById('profile').style.display = 'block';
        } else {
            alert('Log in failed: ' + data.message);
        }
    });
});
