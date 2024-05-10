const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const { db, initDb } = require("./config/db.config");
const app = express();

// Morgan setup for logging HTTP requests
app.use(morgan("dev"));

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to your Express application." });
});

// routes
const userRoutes = require("./routes/user.routes.js");
const favoriteExerciseRoutes = require("./routes/favoriteExercise.routes");

app.use("/api/favorite-exercises", favoriteExerciseRoutes);
app.use("/api/users", userRoutes);

if (process.env.NODE_ENV !== "test") {
  initDb(db);
}

// set port, listen for requests
const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

module.exports = { app, server };
