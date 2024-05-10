import React from "react";
import { Box } from "@mui/material";
import FavoriteExercisesCard from "../components/FavoriteExercisesCard";

const FavoriteExercises = ({ favoriteExercises, setFavoriteExercises }) => {
  return (
    <Box>
      <FavoriteExercisesCard
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
      />
    </Box>
  );
};

export default FavoriteExercises;
