const express = require('express');
const app = express();


app.use(express.json());


app.post('/bfhl', (req, res) => {
    try {
        
        const { data } = req.body;

        const user_id = "rajat_bansal_05012005"; 
        const email = "rajatbansal2022@vitbhopal.ac.in";          
        const roll_number = "22BSA10276";      

        const odd_numbers = [];
        const even_numbers = [];
        const alphabets = [];
        const special_characters = [];
        let sum = 0;
        const alphabet_chars_only = [];

        data.forEach(item => {
            if (!isNaN(item)) {
                const num = parseInt(item, 10);
                sum += num;
                if (num % 2 === 0) {
                    even_numbers.push(item);
                } else {
                    odd_numbers.push(item);
                }
            }
            else if (/^[a-zA-Z]+$/.test(item)) {
                alphabets.push(item.toUpperCase());
                for (const char of item) {
                    alphabet_chars_only.push(char);
                }
            }
            else {
                special_characters.push(item);
            }
        });

        let concat_string = "";
        const reversed_alphabets = alphabet_chars_only.reverse();
        reversed_alphabets.forEach((char, index) => {
            if (index % 2 === 0) {
                concat_string += char.toUpperCase();
            } else {
                concat_string += char.toLowerCase();
            }
        });

        
        const response = {
            "is_success": true,
            "user_id": user_id,
            "email": email,
            "roll_number": roll_number,
            "odd_numbers": odd_numbers,
            "even_numbers": even_numbers,
            "alphabets": alphabets,
            "special_characters": special_characters,
            "sum": sum.toString(), 
            "concat_string": concat_string
        };

        res.status(200).json(response);

    } catch (error) {
        res.status(500).json({
            "is_success": false,
            "error": error.message
        });
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});