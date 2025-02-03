const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const app = express();
const client = new OAuth2Client('516967938738-pj7u4d9p168d34ghm875i1e5gm3gi7mo.apps.googleusercontent.com'); // Use your client ID

// Middleware
app.use(express.json());

// POST route for Google login
app.post('/auth/google', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: 'No token provided' });
    }

    try {
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: '516967938738-pj7u4d9p168d34ghm875i1e5gm3gi7mo.apps.googleusercontent.com' // Use your client ID
        });
        const payload = ticket.getPayload();

        // You can now extract user information and store it in your database
        const user = {
            name: payload.name,
            email: payload.email,
            picture: payload.picture
        };

        // Send the user info back to the frontend
        res.json({ user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to verify token' });
    }
});

// Start server
app.listen(8000, () => {
    console.log('Server running on http://localhost:8000');
});
