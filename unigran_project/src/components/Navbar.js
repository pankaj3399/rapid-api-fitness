import React from "react";
import { Link } from "react-router-dom";
import { Stack } from "@mui/material";

const Navbar = ({ token, setToken, setFavoriteExercises }) => {
  return (
    <Stack
      direction="row"
      sx={{ gap: { sm: "123px", xs: "40px" }, mt: { sm: "32px", xs: "20px" } }}
      px="20px"
    >
      <Link
        to="/"
        style={{
          height: "48px",
          margin: "0px 20px",
          color: "white",
          textDecoration: "none",
          width: "190px",
          fontSize: "36px",
        }}
      >
        Fitness club
      </Link>
      <Stack
        direction="row"
        gap="40px"
        fontFamily="Alegreya"
        fontSize="24px"
        alignItems="flex-end"
        width="70%"
        justifyContent="center"
      >
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "white",
            borderBottom: "3px solid #bc13fe",
          }}
        >
          Página inicial
        </Link>
        <a href="#exercises" style={{ textDecoration: "none", color: "white" }}>
          Exercícios
        </a>
        <div style={{ textDecoration: "none", color: "white" }}>Entrar</div>
        <div style={{ textDecoration: "none", color: "white" }}>Cadastrar</div>
        <Link
          to="/favoriteExercises"
          style={{ textDecoration: "none", color: "white" }}
        >
          Favorite Exercises
        </Link>
        <Link to="/signup" style={{ textDecoration: "none", color: "white" }}>
          Sign Up
        </Link>
        {!token && (
          <Link to="/login" style={{ textDecoration: "none", color: "white" }}>
            Login
          </Link>
        )}
        {token && (
          <div
            style={{
              textDecoration: "none",
              color: "white",
              cursor: "pointer",
            }}
            onClick={() => {
              localStorage.removeItem("fitness-token");
              setFavoriteExercises([]);
              setToken("");
            }}
          >
            Logout
          </div>
        )}
      </Stack>
    </Stack>
  );
};

export default Navbar;
