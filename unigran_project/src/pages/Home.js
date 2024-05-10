import React, { useState } from "react";
import { Box } from "@mui/material";

import Exercises from "../components/Exercises";
import SearchExercises from "../components/SearchExercises";
import HeroBanner from "../components/HeroBanner";

const Home = ({ favoriteExercises, setFavoriteExercises }) => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState("all");

  return (
    <Box>
      <HeroBanner />
      <SearchExercises
        setExercises={setExercises}
        bodyPart={bodyPart}
        setBodyPart={setBodyPart}
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
      />

      <Exercises
        setExercises={setExercises}
        exercises={exercises}
        bodyPart={bodyPart}
        favoriteExercises={favoriteExercises}
        setFavoriteExercises={setFavoriteExercises}
      />
    </Box>
  );
};

export default Home;
