const express = require("express");
const { NoteModel } = require("../model/note.model");
const { auth } = require("../middleware/authmiddleware");
const noteRouter = express.Router();
noteRouter.use(auth);

// Route to create a new note
noteRouter.post("/create", async (req, res) => {
  try {
    const newNote = new NoteModel(req.body);
    await newNote.save();
    res
      .status(201)
      .json({ message: "Note created successfully", note: newNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to get all notes
noteRouter.get("/", async (req, res) => {
  try {
    const notes = await NoteModel.find({ userID: req.body.userID });
    res.status(200).json(notes);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to update a note by ID
noteRouter.patch("/update/:noteID", async (req, res) => {
  try {
    const { noteID } = req.params;
    const { title, content } = req.body;
    const updatedNote = await NoteModel.findByIdAndUpdate(
      noteID,
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Route to delete a note by ID
noteRouter.delete("/delete/:noteID", async (req, res) => {
  try {
    const { noteID } = req.params;
    const deletedNote = await NoteModel.findByIdAndDelete(noteID);
    if (!deletedNote) {
      return res.status(404).json({ message: "Note not found" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = {
  noteRouter,
};
