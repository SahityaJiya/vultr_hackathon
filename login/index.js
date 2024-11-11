const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.static('Public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/UserRegistrationId', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;  
db.on('error', () => console.log("Error in connecting to Database"));
db.once('open', () => console.log("Connected to Database"));

// Define User Schema
const userSchema = new mongoose.Schema({
    username: String,
    age: Number,
    email: String,
    phone: Number,
    gender: String,
    password: String // Corrected from 'number' to 'Number'
});

// Create User Model
const User = mongoose.model('User', userSchema);

// Signup Route
app.post("/sign_up", (req, res) => {
    const username = req.body.username;
    const age = req.body.age;
    const email = req.body.email;
    const phone = req.body.phone;
    const gender = req.body.gender;  
    const password = req.body.password;

    const newUser = new User({ username, age, email, phone, gender, password }); // Define new user

    db.collection('users').insertOne(newUser, (err, collection) => {
        if (err) {
            console.error("Error during registration:", err);
            return res.status(500).send("Registration failed");
        }
        console.log("User Registered Successfully");
        res.redirect('signup_successfull.html'); // Correct redirect method
    });
});


// Root Route
app.get('/', (req, res) => {
    res.set({
        "Access-Control-Allow-Origin": "*" // Corrected CORS header
    });
    return res.redirect('index.html'); // Redirect to index.html
}).listen(3000);

console.log("Server is running on port 3000");

