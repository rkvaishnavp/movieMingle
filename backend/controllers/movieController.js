import Movie from "./../models/movieModel.js";
import cloudinary from "../cloud/cloudinaryConfig.js";
import multer from "multer";

const getAllMovies = async (req, res) => {
  try {
    const movie = await Movie.find();
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Error in getMovie:", error);
  }
};

const getMovie = async (req, res) => {
  const { name } = req.params;
  try {
    const movie = await Movie.findOne({ name });
    if (!movie) return res.status(404).json({ error: "Movie Not Found!" });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Error in getMovie:", error);
  }
};

const uploadMovie = async (req, res) => {
  try {
    const { name, plot, year, actors, picture } = req.body;
    const video = req.file;
    const { secure_url: url, public_id } = await cloudinary.uploader
      .upload_stream({ resource_type: "video" }, (error, result) => {
        if (error) {
          console.error("Error uploading to Cloudinary:", error);
          res.status(500).json({ error: "Internal Server Error" });
        } else {
          // You can do something with the Cloudinary response, e.g., save the URL and public_id to a database
          console.log("Cloudinary response:", result);
          res
            .status(200)
            .json({ url: result.secure_url, public_id: result.public_id });
        }
      })
      .end(video);
    console.log({ name, plot, year, actors, picture });
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Error in uploadMovie: ", error);
  }
};

const updateMovie = async (req, res) => {
  try {
    const { name } = req.params;
    let movie = await Movie.findOne({ name });
    if (!movie) {
      return res.status(400).json({ error: "Movie Doesn't Exist" });
    }
    const { plot, actors, movie_pic, movie_url } = req.body;
    movie.name = name || movie.name;
    movie.plot = plot || movie.plot;
    movie.actors = actors || movie.actors;
    movie.movie_pic = movie_pic || movie.movie_pic;
    movie.movie_url = movie_url || movie.movie_url;

    movie = await movie.save();

    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: error });
    console.log("Error in uploadMovie: ", error);
  }
};

export { getAllMovies, getMovie, uploadMovie, updateMovie };
