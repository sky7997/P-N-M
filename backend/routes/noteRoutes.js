import express from "express";
import {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getSingleNote,
} from "../controllers/noteController.js";

const router = express.Router();

router.get("/", getNotes);
router.post("/", createNote);
router.get("/:id", getSingleNote);
router.put("/:id", updateNote);
router.delete("/:id", deleteNote);

export default router;
