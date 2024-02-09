import { Types } from "mongoose";

export default interface Song {
  title: string;
  artist: Types.ObjectId;
  album?: Types.ObjectId;
  genre?: Types.ObjectId;
  releaseDate?: Date;
  duration: number;
  trackNumber?: number;
  writer?: string;
  producer?: string;
  recordLabel?: string;
  coverArt?: string;
}
