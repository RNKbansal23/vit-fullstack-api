const express = require('express');
const app = express();

// This middleware is essential for your API to be able to read JSON from the request body
app.use(express.json());

// Define the POST route for /bfhl
app.post('/bfhl', (req, res) => {
    try {
        // Extract the 'data' array from the request body
        const { data } = req.body;

        // --- IMPORTANT: Fill in your personal details here ---
        const user_id = "john_doe_17091999"; // Replace with your full_name_ddmmyyyy
        const email = "john@xyz.com";          // Replace with your email
        const roll_number = "ABCD123";      // Replace with your roll number

        // Initialize arrays to hold the classified data
        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const alphabet_chars_only = [];

        // Loop through the input data array to classify each element
        data.forEach(item => {
            // Check if the item is a number (as a string)
            if (!isNaN(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            }
            // Check if the item is an alphabet string
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                // Add each character to the list for the concatenated string
                for (const char of item) {
                    alphabet_chars_only.push(char);
                }
            }
            // Otherwise, it's a special character
            else {
                special_characters.push(item);
            }
        });

        // Logic for the alternating caps concatenated string
        let concat_string = "";
        const reversed_alphabets = alphabet_chars_only.reverse();
        reversed_alphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concat_string += char.toUpperCase();
            } else {
                concat_string += char.toLowerCase();
            }
        });

        // Construct the final JSON response
        const response = {
            "is_success": true,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": sum.toString(), // Sum must be a string
            "concat_string": concat_string
        };

        // Send the successful response
        res.status(200).json(response);

    } catch (error) {
        // Handle any errors gracefully
        res.status(500).json({
            "is_success": false,
            "error": error.message
        });
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});