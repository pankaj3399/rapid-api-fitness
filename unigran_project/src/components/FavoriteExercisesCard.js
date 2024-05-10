import React, { useEffect, useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import ExerciseCard from "./ExerciseCard";
import Loader from "./Loader";
import Pagination from "@mui/material/Pagination";
import { exerciseOptions, fetchData } from "../utils/fetchData";

const FavoriteExercisesCard = ({ favoriteExercises, setFavoriteExercises }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [exercisesPerPage] = useState(20);

  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    const fetchExercisesData = async () => {
      try {
        let exercisesData = [];

        // Fetch all exercises with offset and limit
        exercisesData = await fetchData(
          `https://exercisedb.p.rapidapi.com/exercises?limit=${1500}`,
          exerciseOptions
        );

        setExercises(exercisesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercises:", error);
        setLoading(false);
      }
    };

    fetchExercisesData();
  }, []);

  // Pagination
  const indexOfLastExercise = currentPage * exercisesPerPage;
  const indexOfFirstExercise = indexOfLastExercise - exercisesPerPage;
  const currentExercises = favoriteExercises.slice(
    indexOfFirstExercise,
    indexOfLastExercise
  );
  const favExercisesIds = currentExercises.map((x) => x.exerciseId);
  const showExercises = exercises.filter((e) => favExercisesIds.includes(e.id));

  const paginate = (e, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 1800, behavior: "smooth" });
  };

  if (!favoriteExercises.length)
    return <Typography variant="h5">No exercises found.</Typography>;

  if (!currentExercises.length || !exercises.length || loading)
    return <Loader />;

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
        {showExercises.map((exercise, idx) => (
          <ExerciseCard
            key={idx}
            exercise={exercise}
            favoriteExercises={favoriteExercises}
            setFavoriteExercises={setFavoriteExercises}
          />
        ))}
      </Stack>
      <Stack sx={{ mt: { lg: "114px", xs: "70px" } }} alignItems="center">
        {favoriteExercises.length > 9 && (
          <Pagination
            color="standard"
            shape="rounded"
            defaultPage={1}
            count={Math.ceil(favoriteExercises.length / exercisesPerPage)}
            page={currentPage}
            onChange={paginate}
            size="large"
          />
        )}
      </Stack>
    </Box>
  );
};

export default FavoriteExercisesCard;
