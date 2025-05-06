import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../services/firebaseConfig";
import { db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Estado para confirmar contraseña
  const [nickname, setNickname] = useState("");
  const [role, setRole] = useState("jugador");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    // Verifica si las contraseñas coinciden
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      // Registra al usuario con Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guarda el nickname y el rol en Firestore
      await setDoc(doc(db, "users", user.uid), {
        nickname: nickname,
        email: email,
        role: role,
      });

      console.log("Usuario registrado y datos guardados en Firestore:", user);

      // Redirige según el rol seleccionado
      if (role === "jugador") {
        navigate("/quiz");
      } else if (role === "administrador") {
        navigate("/home-teacher");
      }
    } catch (err) {
      console.error("Error al registrar usuario:", err.message);
      setError("No se pudo registrar el usuario. Inténtalo de nuevo.");
    }
  };

  return (
    <Container
      maxWidth="xs"
      sx={{
        width: 400,
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Roboto",
      }}
    >
      {/* Logo */}
      <Box textAlign="center" mb={2}>
        <Box
          component="img"
          src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg"
          alt="Logo"
          sx={{ width: "80%", maxWidth: 200, mx: "auto", mb: 1 }}
        />
      </Box>

      {/* Frase */}
      <Typography
        variant="body1"
        color="rgba(0, 0, 57, 1)"
        fontStyle="italic"
        textAlign="center"
        mb={3}
      >
        The strategy, in your hands.
      </Typography>

      {/* Selector de rol */}
      <ToggleButtonGroup
        value={role}
        exclusive
        onChange={(e) => setRole(e.target.value)}
        sx={{
          backgroundColor: "#e0e0e0",
          borderRadius: "10px",
          mb: 3,
          width: "100%",
          "& .MuiToggleButtonGroup-grouped": {
            flex: 1,
            border: "none",
            borderRadius: "10px !important",
            padding: "10px 0",
            fontWeight: "bold",
            fontSize: "14px",
            color: "rgba(0, 0, 57, 1)",
            transition: "all 0.3s ease-in-out",
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "rgba(0, 0, 57, 1)",
              color: "#fff",
            },
          },
        }}
      >
        <ToggleButton value="jugador">Jugador</ToggleButton>
        <ToggleButton value="administrador">Administrador</ToggleButton>
      </ToggleButtonGroup>

      {/* Formulario */}
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
      >
        <TextField
          type="text"
          label="Apodo"
          fullWidth
          variant="outlined"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: "rgba(0,0,57,1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0,0,57,0.8)",
              },
            },
          }}
        />

        <TextField
          type="email"
          label="Correo"
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: "rgba(0,0,57,1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0,0,57,0.8)",
              },
            },
          }}
        />

        <TextField
          type="password"
          label="Contraseña"
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: "rgba(0,0,57,1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0,0,57,0.8)",
              },
            },
          }}
        />

        <TextField
          type="password"
          label="Confirmar Contraseña"
          fullWidth
          variant="outlined"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          sx={{
            "& .MuiOutlinedInput-root": {
              borderRadius: "10px",
              "& fieldset": {
                borderColor: "rgba(0,0,57,1)",
              },
              "&:hover fieldset": {
                borderColor: "rgba(0,0,57,0.8)",
              },
            },
          }}
        />

        <Button
          type="submit"
          variant="contained"
          onClick={handleRegister}
          sx={{
            mt: 3,
            bgcolor: "rgba(0, 0, 57, 1)",
            color: "#fff",
            borderRadius: "10px",
            height: "55px",
            "&:hover": {
              bgcolor: "rgba(0, 0, 57, 0.8)",
            },
          }}
        >
          Crear
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/login")}
          sx={{
            mt: 1,
            color: "rgba(0, 0, 57, 1)",
            borderRadius: "10px",
          }}
        >
          Ya tengo cuenta
        </Button>
      </Box>
    </Container>
  );
};

export default Register;