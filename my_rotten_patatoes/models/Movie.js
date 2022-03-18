const mongoose = require("mongoose");

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Please add a title"],
  },
  API_id: {
    type: Number,
    unique: true,
  },
  Genre: [String],
  release_date: String,
  overview: String,
  poster_path: String,
  vote_average: Number,
});

module.exports = mongoose.models.Movie || mongoose.model("Movie", MovieSchema);
