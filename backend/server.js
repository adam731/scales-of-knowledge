import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import path from "path";
import { fileURLToPath } from "url";
import cron from "node-cron";
import multer from "multer";

const app = express();
const port = 3001;
const __fileName = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__fileName);

//connect to database
try {
  await mongoose.connect("mongodb://localhost:27017", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("Connected to database");
} catch (error) {
  console.log("Error connecting to database");
}

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "./build")));
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, "./build/index.html"));
});

// user schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

// User Model
const User = mongoose.model("User", userSchema);

// Question Schema
const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true },
});

// Question Model
const Question = mongoose.model("Question", questionSchema, "questions");

// Insert Question Schema
const insertQuestionSchema = new mongoose.Schema({
  questions: { type: Array, required: true },
});

const AddQuestion = mongoose.model(
  "AddQuestion",
  insertQuestionSchema,
  "questions"
);

// Leaderboard Schema
const leaderboardSchema = new mongoose.Schema({
  username: { type: String, required: true },
  score: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Leaderboard Model
const Leaderboard = mongoose.model("Leaderboard", leaderboardSchema);

// Routes

cron.schedule("0 0 * * *", async function () {
  try {
    const questions = await Question.find();
    if (questions.length > 0) {
      // Delete the first set of questions
      const firstQuestionSet = questions[0];
      await Question.findByIdAndDelete(firstQuestionSet._id);
      console.log(`Deleted questions with ID ${firstQuestionSet._id}`);
    }
  } catch (error) {
    console.error(error);
  }
});

app.post(
  "/api/upload-questions",
  upload.single("questionsData"),
  async (req, res) => {
    try {
      // Get the uploaded JSON file
      const questionsData = JSON.parse(req.file.buffer.toString());
      await AddQuestion.insertMany(questionsData);
      // Send a success response
      return res.redirect("/admin");
    } catch (error) {
      // Send an error response
      res.status(400).json({ message: error.message });
    }
  }
);

// Register route
app.post("/api/register", async (req, res) => {
  try {
    const saltRounds = 10;
    // Store user in database
    // makes a user form the user schema
    const existingUser = await User.findOne({
      $or: [{ email: req.body.email }, { username: req.body.username }],
    });
    if (existingUser) {
      return res.json({
        success: false,
      });
    }
    const user = new User({
      username: req.body.username,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, saltRounds),
    });

    const leaderboardUser = new Leaderboard({
      username: req.body.username,
      score: 0,
    });
    // saves the user to the database
    const newUser = await user.save();
    const newLeaderboardUser = await leaderboardUser.save();
    // outputs a json file with the new user
    return res.json({ success: true });
  } catch (error) {
    // If there is an error, return the error message
    res.status(400).json({ message: error.message });
  }
});

// Login route
app.post("/api/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ success: false });
    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) return res.json({ success: false });
    return res.json({ user, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Questions route
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Leaderboard route get
app.get("/api/leaderboard/:username", async (req, res) => {
  const username = req.params.username;
  try {
    const user = await Leaderboard.findOne({ username });
    const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(5);
    res.status(200).json({ globalStats: leaderboard, userStats: user.score });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Leaderboard route patch
app.patch("/api/leaderboard/:username", async (req, res) => {
  const username = req.params.username;
  const update = req.body;
  try {
    const userData = await Leaderboard.findOne({ username });
    const currentScore = userData.score;
    const newScore = currentScore + update.score;
    const updatedStats = await Leaderboard.findByIdAndUpdate(
      userData._id,
      { score: newScore },
      {
        new: true,
      }
    );
    res.status(200).json(updatedStats);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Start Server
app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});
