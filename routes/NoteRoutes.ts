import express from "express";
import {
	CreateNote,
	deleteNote,
	GetNote,
	GetNotes,
	GetUserNotes,
	UpdateNote,
} from "../controller/NoteController";

const NoteRoutes = express.Router();

NoteRoutes.get("/notes", GetNotes);
NoteRoutes.get("/notes/user/:userId", GetUserNotes);
NoteRoutes.get("/notes/:id", GetNote);
NoteRoutes.post("/notes", CreateNote);
NoteRoutes.put("/notes/:id", UpdateNote);
NoteRoutes.delete("/notes/:id", deleteNote);

export default NoteRoutes;
