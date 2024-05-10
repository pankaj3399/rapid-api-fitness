const express = require("express");
const router = express.Router();
const favoriteExercises = require("../controllers/favoriteExercise.controller");
const verifyToken = require("../middleware/verifyToken");

// Create a new favorite exercise
router.post("/", verifyToken, favoriteExercises.create);

// Retrieve all favorite exercises
router.get("/", verifyToken, favoriteExercises.getAll);

// Delete a favorite exercise by id
router.delete("/:id", verifyToken, favoriteExercises.deleteById);

module.exports = router;
