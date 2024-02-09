import { Request, Response } from "express";
import { addSong, fetchSongs, removeSong, updateSong } from "../models/song";

const createSong = async (req: Request, res: Response) => {
  const song = await addSong(req.body, req.file?.path as string);
  if (song) {
    res.status(201).json(song);
  } else {
    res.status(500).json({ message: "Failed to create song" });
  }
};
// const getSong = async (req: Request, res: Response) => {
//   const song = await fetchSong(req.params.id);
//   if (song) {
//     res.status(200).json(song);
//   } else {
//     res.status(404).json({ message: "Song not found" });
//   }
// };

const getSongs = async (req: Request, res: Response) => {
  const songs = await fetchSongs(
    { query: new RegExp(req.query.query as string, "i") },
    req.query.sort as string,
    req.query.order as string
  );
  if (songs) {
    res.json(songs);
  } else {
    res.status(404).json({ message: "Songs not found" });
  }
};

const editSong = async (req: Request, res: Response) => {
  const song = await updateSong(req.params.id, req.body);
  if (song) {
    res.json(song);
  } else {
    res.status(500).json({ message: "Failed to update song" });
  }
};

const deleteSong = async (req: Request, res: Response) => {
  const success = await removeSong(req.params.id);
  if (success) {
    res.status(204).end();
  } else {
    res.status(500).json({ message: "Failed to delete song" });
  }
};
export { createSong, getSongs, editSong, deleteSong };
