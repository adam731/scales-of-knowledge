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

// routes for quiz app

// Get quiz questions
app.get('/api/questions', (req, res) => {
    // Fetch questions from database
    const questions = getQuestions();
    res.json(questions);
});

// Get quiz results
app.get('/api/results', (req, res) => {
    // Fetch quiz results for user from database
    const results = getQuizResults(req.query.user_id);
    res.json(results);
});

// Submit quiz answers
app.post('/api/submit', (req, res) => {
    // Calculate user's score based on their answers
    const score = calculateScore(req.body.answers);
    // Store quiz results in database
    storeQuizResults(req.body.user_id, score);
    res.json({ score });
});


// Helper functions
function getQuizAttempts(user_id) {
  // Get number of quiz attempts for user from database
}

function getQuestions() {
  // Fetch questions from database
}

function getQuizResults(user_id) {
  // Fetch quiz results for user from database
}

function calculateScore(answers) {
  // Calculate user's score based on their answers
}

function storeQuizResults(user_id, score) {
  // Store quiz results in database
} 