const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/reviews', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const reviewSchema = new mongoose.Schema({
  name: String,
  review: String,
});

const Review = mongoose.model('Review', reviewSchema);

// Routes
app.post('/api/reviews', async (req, res) => {
  const { name, review } = req.body;
  const newReview = new Review({ name, review });

  try {
    await newReview.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(500).json({ message: 'Error saving review' });
  }
});

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await Review.find();
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching reviews' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
