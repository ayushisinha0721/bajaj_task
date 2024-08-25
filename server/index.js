const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// POST route
app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];

    // Separate numbers and alphabets
    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const lowerAlphabets = alphabets.filter(char => char >= 'a' && char <= 'z');
    const highestLowercaseAlphabet = lowerAlphabets.length ? [lowerAlphabets.sort().reverse()[0]] : [];

    const response = {
        is_success: true,
        user_id: "john_doe_17091999", // Replace with actual user ID
        email: "john@xyz.com", // Replace with actual email ID
        roll_number: "ABCD123", // Replace with actual roll number
        numbers: numbers,
        alphabets: alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    };

    res.status(200).json(response);
});

// GET route
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
