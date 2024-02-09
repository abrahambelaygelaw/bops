"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SongSchema = void 0;
const mongoose_1 = require("mongoose");
exports.SongSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    artist: { type: mongoose_1.Schema.Types.ObjectId, ref: "Artist", required: true },
    album: { type: mongoose_1.Schema.Types.ObjectId, ref: "Album" },
    genre: { type: mongoose_1.Schema.Types.ObjectId, ref: "Genre" },
    releaseDate: { type: Date },
    duration: { type: Number, required: true },
    trackNumber: { type: Number },
    writer: { type: String },
    producer: { type: String },
    recordLabel: { type: String },
    coverArt: { type: String },
});
const SongModel = (0, mongoose_1.model)("Song", exports.SongSchema);
const createSong = (song) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newSong = new SongModel(song);
        return yield newSong.save();
    }
    catch (error) {
        console.error("Failed to create song", error);
        return null;
    }
});
