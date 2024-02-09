import express from "express";
import {
  editSong,
  deleteSong,
  getSongs,
  createSong,
} from "../controllers/song";
import upload from "../config/multer";
const router = express.Router();
router.route("/").get(upload.single("file"), getSongs).post(createSong);
router.route("/:id").put(upload.single("file"), editSong).delete(deleteSong);
