const mongoose = require("mongoose");
const noteSchema = mongoose.Schema(
  {
    title: String,
    content: String,
    userID: String,
    username: String,
  },
  {
    versionKey: false,
  }
);
const NoteModel = mongoose.model("note", noteSchema);
module.exports = {
  NoteModel,
};
