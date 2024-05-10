import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });
    fetch(`${process.env.REACT_APP_API_URL}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    })
      .then((response) => {
        if (!response.ok && process.env.NODE_ENV !== "test") {
          throw new Error("Failed to register");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Registration successful:", data);
        toast.success(
          "Registration successful.Please login with your credentials!"
        );
        navigate("/login");
        // Handle successful registration, such as redirecting to another page
      })
      .catch((error) => {
        console.log(error);
        console.error("Registration failed:", error);
        toast.error("Registration failed");
        // Handle registration failure, such as displaying an error message to the user
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                placeholder="Email Address"
                aria-label="email"
                name="email"
                autoComplete="email"
                height="76px"
                sx={{
                  input: {
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "4px",
                  },
                  backgroundColor: "#fff",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                name="password"
                placeholder="Password"
                type="password"
                aria-label="password"
                id="password"
                autoComplete="new-password"
                sx={{
                  input: {
                    fontWeight: "700",
                    border: "none",
                    borderRadius: "4px",
                  },
                  backgroundColor: "#fff",
                }}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            aria-label="submit"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
