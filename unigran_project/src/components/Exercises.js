import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { exerciseOptions, fetchData } from "../utils/fetchData";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";
import Pagination from "@mui/material/Pagination";

const Exercises = ({
  exercises,
  setExercises,
  bodyPart,
  favoriteExercises,
  setFavoriteExercises,
}) => {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(20);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        let exercisesData = [];

        if (bodyPart === "all") {
          // Fetch all exercises with offset and limit
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises?limit=${1500}`,
            exerciseOptions
          );
        } else {
          // Fetch exercises by body part with offset and limit
          exercisesData = await fetchData(
            `https://exercisedb.p.rapidapi.com/exercises/bodyPart/${bodyPart}?limit=${1500}`,
            exerciseOptions
          );
        }

        setExercises(exercisesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, [bodyPart, setExercises, exercisesPerPage]);

  useEffect(() => {
    setCurrentPage(1);
  }, [exercises]);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = exercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );

  const paginate = (e, value) => {
    setCurrentPage(value);

    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!currentExercises.length) return <Loader />;

  if (loading) return <Loader />;
  if (!exercises.length)
    return <Typography variant="h5">No exercises found.</Typography>;

  return (
    <Box id="exercises" sx={{ mt: { lg: "109px" } }} mt="50px" p="20px">
      <Typography
        variant="h4"
        fontWeight="bold"
        sx={{ fontSize: { lg: "44px", xs: "30px" } }}
        mb="46px"
      >
        Showing Results
      </Typography>
      <Stack
        direction="row"
        sx={{ gap: { lg: "107px", xs: "50px" } }}
        flexWrap="wrap"
        justifyContent="center"
      >
        {currentExercises.map((exercise, idx) => (
          <ExerciseCard
            key={idx}
            exercise={exercise}
            favoriteExercises={favoriteExercises}
            setFavoriteExercises={setFavoriteExercises}
          />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {exercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(exercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default Exercises;
