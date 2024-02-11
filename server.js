const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const SECRET_KEY = process.env.SECRET_KEY || 'your-default-secret-key';

// Middleware to handle CORS
app.use(cors());
// Middleware to parse JSON
app.use(bodyParser.json());

const users = [
  { id: 1, username: 'Himavarsha', password: 'Varsha225@' },
  // Add more users as needed
];

// Middleware to log incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.path}`);
  next();
});

const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    console.log('Authorization token missing');
    return res.sendStatus(401);
  }

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      console.error('Error verifying JWT:', err);
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

// Route to handle login
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  console.log(`Login attempt by username: ${username}`);

  const user = users.find(u => u.username === username && u.password === password);

  if (!user) {
    console.log('Invalid credentials');
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  const token = jwt.sign({ username: user.username, id: user.id }, SECRET_KEY);
  res.json({ token });
});

// Example protected route
app.get('/protected', authenticateToken, (req, res) => {
  console.log('Protected route accessed');
  res.json({ message: 'This is a protected route.' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
