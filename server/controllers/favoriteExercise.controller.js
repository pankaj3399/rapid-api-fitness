const FavoriteExercise = require("../models/favoriteExercise.model.js");

// Create a new favorite exercise
exports.create = async (req, res) => {
  const { exerciseId, name } = req.body;
  try {
    if (!exerciseId || !name) {
      res.status(400).send({ message: "Exercise ID and name can't be empty" });
      return;
    }
    const favoriteExercise = await FavoriteExercise.create({
      userId: req.user.id,
      exerciseId,
      name,
    });
    const favoriteExercises = await FavoriteExercise.findAll({
      where: { userId: req.user.id },
    });
    res.json(favoriteExercises);
  } catch (error) {
    console.error("Error creating favorite exercise:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Retrieve all favorite exercises
exports.getAll = async (req, res) => {
  try {
    const favoriteExercises = await FavoriteExercise.findAll({
      where: { userId: req.user.id },
    });
    res.json(favoriteExercises);
  } catch (error) {
    console.error("Error fetching favorite exercises:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a favorite exercise by id
exports.deleteById = async (req, res) => {
  const id = req.params.id;
  try {
    const favoriteExercise = await FavoriteExercise.findByPk(id);
    console.log(favoriteExercise);
    if (!favoriteExercise) {
      return res.status(404).json({ message: "Favorite exercise not found." });
    }
    await favoriteExercise.destroy();
    const favoriteExercises = await FavoriteExercise.findAll({
      where: { userId: req.user.id },
    });
    res.json(favoriteExercises);
  } catch (error) {
    console.error("Error deleting favorite exercise:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
