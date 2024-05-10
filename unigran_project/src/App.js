import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Box } from "@mui/material";

import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ExerciseDetail from "./pages/ExerciseDetail";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FavoriteExercises from "./pages/FavoriteExercises";

const App = () => {
  const [token, setToken] = useState(localStorage.getItem("fitness-token"));
  const [favoriteExercises, setFavoriteExercises] = useState([]);
  const getAllFavoriteExercises = () => {
    // Retrieve the token from wherever it's stored (e.g., localStorage)
    const token = localStorage.getItem("fitness-token");

    fetch(`${process.env.REACT_APP_API_URL}/api/favorite-exercises`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch favorite exercises");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Favorite exercises:", data);
        // Handle the fetched favorite exercises, such as updating the UI
        setFavoriteExercises(data);
      })
      .catch((error) => {
        console.error("Failed to fetch favorite exercises:", error);
        // Handle the error, such as displaying an error message to the user
      });
  };

  useEffect(() => {
    if (token) {
      getAllFavoriteExercises();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Box width="400" xs={{ with: { xl: "1488" } }} m="auto">
      <ToastContainer toastStyle={{ backgroundColor: "crimson" }} />
      <Navbar
        token={token}
        setToken={setToken}
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
      />
      <Routes>
        <Route
          path="/login"
          element={
            <Login
              token={token}
              setToken={setToken}
              getAllFavoriteExercises={getAllFavoriteExercises}
            />
          }
        />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/favoriteExercises"
          element={
            <FavoriteExercises
              favoriteExercises={favoriteExercises}
              setFavoriteExercises={setFavoriteExercises}
            />
          }
        />
        <Route
          path="/"
          element={
            <Home
              favoriteExercises={favoriteExercises}
              setFavoriteExercises={setFavoriteExercises}
            />
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <ExerciseDetail
              favoriteExercises={favoriteExercises}
              setFavoriteExercises={setFavoriteExercises}
            />
          }
        />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
