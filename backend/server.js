import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

const app = express();
const port = 3001;

//connect to database
try {
    await mongoose.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to database');
} catch (error) {
    console.log('Error connecting to database');
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Start server
app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);

app.post('/api/register', async (req, res) => {
    try {
        // Store user in database
        // makes a user form the user schema
        const user = new User({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email
        });
        // saves the user to the database
        const newUser = await user.save();
        // outputs a json file with the new user
        res.status(201).json(newUser);
    } catch(error) {
        // If there is an error, return the error message
        res.status(400).json({ message: error.message });
    }
});

app.post('/api/login', async (req, res) => {
    // use the username and password to find the user in the database

});

app.get('/api/questions', async (req, res) => {
    // fetch questions from database schema
});

app.post('/api/leaderboard', async (req, res) => {
    // post leaderboard to database schema
});

app.get('/api/leaderboard', async (req, res) => {
    // fetch leaderboard from database schema
});
