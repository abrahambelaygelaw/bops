import { Schema, model } from "mongoose";
import Song from "../interfaces/Song";

export const SongSchema = new Schema({
  title: { type: String, required: true },
  artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
  album: { type: Schema.Types.ObjectId, ref: "Album" },
  genre: { type: Schema.Types.ObjectId, ref: "Genre" },
  releaseDate: { type: Date },
  duration: { type: Number, required: true },
  trackNumber: { type: Number },
  writer: { type: String },
  producer: { type: String },
  recordLabel: { type: String },
  coverArt: { type: String },
});

const SongModel = model<Song>("Song", SongSchema);

const addSong = async (song: Song, file: string): Promise<Song | null> => {
  try {
    const newSong = new SongModel(song);
    newSong.coverArt = file;
    return await newSong.save();
  } catch (error) {
    console.error("Failed to create song", error);
    return null;
  }
};

interface SongFIlter {
  query: RegExp;
}

const fetchSongs = async (
  filter: SongFIlter,
  sort: string,
  order: string
): Promise<Song[] | null> => {
  try {
    const songs = await SongModel.find({ title: filter.query }).sort({
      [sort]: order === "asc" ? 1 : -1,
    });
    return songs;
  } catch (error) {
    console.error("Failed to fetch songs", error);
    return null;
  }
};

// const fetchSong = async (id: string): Promise<Song | null> => {
//   try {
//     const song = await SongModel.findById(id);
//     return song;
//   } catch (error) {
//     console.error("Failed to fetch song", error);
//     return null;
//   }
// };

const updateSong = async (
  id: string,
  song: Partial<Song>
): Promise<Song | null> => {
  try {
    const updatedSOng = await SongModel.findByIdAndUpdate(id, song, {
      new: true,
    });
    return updatedSOng;
  } catch (error) {
    console.error("Failed to update song", error);
    return null;
  }
};

const removeSong = async (id: string): Promise<boolean> => {
  try {
    await SongModel.findByIdAndDelete(id);
    return true;
  } catch (error) {
    console.error("Failed to remove song", error);
    return false;
  }
};

export { addSong, fetchSongs, updateSong, removeSong };
