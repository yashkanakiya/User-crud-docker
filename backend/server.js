require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// connect to mongo
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Mongo connected"))
  .catch((err) => {
    console.error("Mongo connection error:", err.message);
    process.exit(1);
  });

// User model
const userSchema = new mongoose.Schema(
  {
    user_id: { type: String, required: true, unique: true },
    interest: { type: String },
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

// Routes
app.get("/", (req, res) => res.send("User Account API"));

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: "Invalid id" });
  }
});

app.post("/users", async (req, res) => {
  try {
    const { user_id, interest, name, email } = req.body;
    const newUser = new User({ user_id, interest, name, email });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const updates = req.body;
    const user = await User.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json({ message: "Deleted", user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

app.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
);
