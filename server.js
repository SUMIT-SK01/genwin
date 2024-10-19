const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'docs')));

let users = [];

app.post('/signup', (req, res) => {
    const { fullname, age, email, password } = req.body;
    if (users.find(user => user.email === email)) {
        return res.json({ success: false, message: 'Email already exists' });
    }
    users.push({ fullname, age, email, password });
    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        res.json({ success: true, fullname: user.fullname });
    } else {
        res.json({ success: false, message: 'Invalid email or password' });
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
