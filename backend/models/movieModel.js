import mongoose from "mongoose";

const movieSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  year: {
    type: Number,
    required: true,
  },
  plot: {
    type: String,
    required: true,
  },
  actors: {
    type: [
      {
        name: {
          type: String,
          required: true,
        },
        role_name: {
          type: String,
          required: true,
        },
        role_type: {
          type: String,
          required: true,
        },
      },
    ],
    required: true,
  },
  movie_pic: {
    type: String,
    required: true,
  },
  movie_url: {
    type: String,
    required: true,
  },
});

const Movie = mongoose.model("Movie", movieSchema);

export default Movie;
