const Note = require("../models/noteModel");

exports.createNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const note = new Note({
      title,
      content,
      userID: req.userData.userID,
    });
    await note.save();
    res.status(201).json({ message: "Note created successfully", note });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating note", error: error.message });
  }
};

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userID: req.userData.userID });
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching notes", error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.noteID, userID: req.userData.userID },
      { title, content },
      { new: true }
    );
    if (!updatedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    res
      .status(200)
      .json({ message: "Note updated successfully", note: updatedNote });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating note", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({
      _id: req.params.noteID,
      userID: req.userData.userID,
    });
    if (!deletedNote) {
      return res
        .status(404)
        .json({ message: "Note not found or unauthorized" });
    }
    res.status(200).json({ message: "Note deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting note", error: error.message });
  }
};
