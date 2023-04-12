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

// user schema
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true },
    date: { type: Date, default: Date.now }
});

// User Model
const User = mongoose.model('User', userSchema);

// Question Schema
const questionSchema = new mongoose.Schema({
    question: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctAnswer: { type: String, required: true },
  });

// Question Model
const Question = mongoose.model('Question', questionSchema, 'questions');


// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
    username: { type: String, required: true },
    score: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

// Leaderboard Model
const Leaderboard = mongoose.model('Leaderboard', leaderboardSchema);

// Routes
// Register route
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

// Login route
app.post('/api/login', async (req, res) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username, password });
      if (!user) throw new Error('Invalid username or password');
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Questions route
app.get('/api/questions', async (req, res) => {
    try {
      const questions = await Question.find();
      res.status(200).json(questions);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Leaderboard route post
app.post('/api/leaderboard/', async (req, res) => {
    try {
      const { username, score } = req.body;
      const leaderboard = new Leaderboard({ username, score });
      const newLeaderboard = await leaderboard.save();
      res.status(201).json(newLeaderboard);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
});

// Leaderboard route get
app.get('/api/leaderboard', async (req, res) => {
    try {
      const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
      res.status(200).json(leaderboard);
    } catch (error) {
      res.status(400).json({ message: error.message });
  }
});