import React from "react";
import { Link } from "react-router-dom";
import { Button, Stack, Typography } from "@mui/material";

const ExerciseCard = ({
  exercise,
  setFavoriteExercises,
  favoriteExercises,
}) => {
  const dbExercise = favoriteExercises.find(
    (exer) => exer.exerciseId === exercise.id
  );
  const token = localStorage.getItem("fitness-token");
  const isFav = Boolean(dbExercise);
  const createFavoriteExercises = () => {
    fetch(`${process.env.REACT_APP_API_URL}/api/favorite-exercises`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // Include the token in the Authorization header
      },
      body: JSON.stringify({
        exerciseId: exercise.id,
        name: exercise.name,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to mark as favorite");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Favorite exercises:", data);
        setFavoriteExercises(data);
        // Handle the fetched favorite exercises, such as updating the UI
      })
      .catch((error) => {
        console.error("Failed to fetch favorite exercises:", error);
        // Handle the error, such as displaying an error message to the user
      });
  };

  const deleteFavoriteExercises = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/api/favorite-exercises/${dbExercise.id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to mark as favorite");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Favorite exercises:", data);
        setFavoriteExercises(data);
        // Handle the fetched favorite exercises, such as updating the UI
      })
      .catch((error) => {
        console.error("Failed to fetch favorite exercises:", error);
        // Handle the error, such as displaying an error message to the user
      });
  };

  const handleFavChange = (e) => {
    e.preventDefault();
    if (!isFav) {
      createFavoriteExercises();
    } else {
      deleteFavoriteExercises();
    }
  };
  return (
    <Link className="exercise-card" to={`/exercise/${exercise.id}`}>
      <img src={exercise.gifUrl} alt={exercise.name} loading="lazy" />

      <Stack direction="row">
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FFA9A9",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.bodyPart}
        </Button>
        <Button
          sx={{
            ml: "21px",
            color: "#fff",
            background: "#FCC757",
            fontSize: "14px",
            borderRadius: "20px",
            textTransform: "capitalize",
          }}
        >
          {exercise.target}
        </Button>
        {token && (
          <Button
            sx={{
              ml: "21px",
              color: "#fff",
              background: "#FCC757",
              fontSize: "14px",
              borderRadius: "20px",
              textTransform: "capitalize",
            }}
            onClick={handleFavChange}
          >
            {isFav ? "Remove from Favorite" : "Mark as Favorite"}
          </Button>
        )}
      </Stack>
      <Typography
        ml="21px"
        color="#000"
        fontWeight="bold"
        sx={{ fontSize: { lg: "24px", xs: "20px" } }}
        mt="11px"
        pb="10px"
        textTransform="capitalize"
      >
        {exercise.name}
      </Typography>
    </Link>
  );
};

export default ExerciseCard;
