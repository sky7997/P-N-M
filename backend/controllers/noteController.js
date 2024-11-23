import Note from "../models/noteModel.js";

// Get all notes with filtering (search and category)
const getNotes = async (req, res) => {
  try {
    const { category, search } = req.query;
    const query = {};

    if (category) query.category = category;
    if (search) query.title = { $regex: search, $options: "i" };

    const notes = await Note.find(query).sort({ createdAt: -1 });

    if (!notes.length) {
      return res
        .status(404)
        .json({ message: "No notes found matching the criteria" });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch notes, please try again later." });
  }
};

// Get a single note by id
const getSingleNote = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Note ID is required" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: `Note with ID ${id} not found` });
    }

    res.status(200).json(note);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to fetch note, please try again later." });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { title, description, category } = req.body;

  if (!title || !description) {
    return res.status(400).json({
      message: "Both title and description are required to create a note.",
    });
  }

  try {
    const newNote = await Note.create({
      title,
      description,
      category: category || "Others", // Default to "Others" if category is not provided
    });

    res.status(201).json(newNote);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to create the note, please try again later." });
  }
};

// Update an existing note (toggle isCompleted or update other fields)
const updateNote = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "Note ID is required for update" });
  }

  try {
    const note = await Note.findById(id);

    if (!note) {
      return res.status(404).json({ message: `Note with ID ${id} not found` });
    }

    // Handle isCompleted toggle or other field updates
    if (req.body.isCompleted !== undefined) {
      note.isCompleted = req.body.isCompleted;
    } else {
      // Handle other fields (e.g., title, description, category)
      if (req.body.title && !req.body.description) {
        return res
          .status(400)
          .json({ message: "Description is required when updating title" });
      }
      note.set(req.body);
    }

    await note.save();

    res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to update the note, please try again later." });
  }
};

// Delete a note by id
const deleteNote = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ message: "Note ID is required for deletion" });
  }

  try {
    const note = await Note.findByIdAndDelete(id);

    if (!note) {
      return res.status(404).json({ message: `Note with ID ${id} not found` });
    }

    res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Failed to delete the note, please try again later." });
  }
};

export { getNotes, getSingleNote, createNote, updateNote, deleteNote };
