import express from "express";
import {
  getMovie,
  updateMovie,
  uploadMovie,
  getAllMovies,
} from "../controllers/movieController.js";
import protectRoute from "../middlewares/protectRoute.js";
import multer from "multer";
import { uploadVideo } from "../middlewares/multer.js";

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();

router.get("/allMovie",getAllMovies)
router.get("/:name", getMovie);
router.post("/uploadMovie", upload.single("video"), uploadMovie);
router.post("/updateMovie/:name", updateMovie);

export default router;
