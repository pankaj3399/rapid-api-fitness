const { DataTypes } = require("sequelize");
const { db: sequelize } = require("../config/db.config");

const FavoriteExercise = sequelize.define("FavoriteExercise", {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  exerciseId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = FavoriteExercise;
