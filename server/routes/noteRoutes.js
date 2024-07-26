const express = require("express");
const {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
} = require("../controllers/noteController");
// const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// router.use(authMiddleware);

router.post("/create", createNote);
router.get("/", getNotes);
router.patch("/update/:noteID", updateNote);
router.delete("/delete/:noteID", deleteNote);

module.exports = router;
