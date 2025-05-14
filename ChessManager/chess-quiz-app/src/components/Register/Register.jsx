import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [error, setError] = useState("");

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const role = email === "administrador@gmail.com" ? "administrador" : "jugador";

      await setDoc(doc(db, "users", user.uid), {
        nickname: nickname,
        email: email,
        role: role,
        trophies: 0,
        games: 0,
        rank: 0,
      });

      if (role === "jugador") {
        navigate("/quiz");
      } else if (role === "administrador") {
        navigate("/home-teacher");
      }
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        setError("El correo ya está registrado. Intenta iniciar sesión.");
      } else {
        console.error("Error al registrar usuario:", err.message);
        setError("No se pudo registrar el usuario. Inténtalo de nuevo.");
      }
    }
  };

  const inputStyles = {
    "& .MuiOutlinedInput-root": {
      borderRadius: "10px",
      "& fieldset": {
        borderColor: "rgba(0,0,57,1)",
      },
      "&:hover fieldset": {
        borderColor: "rgba(0,0,57,0.8)",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100vw",
        height: "100dvh",
        overflow: "hidden",
        bgcolor: "#fff",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleRegister();
        }}
        sx={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          maxWidth: 340,
          px: 2,
          fontFamily: "Roboto",
        }}
      >
        <Box textAlign="center" mb={2}>
          <Box
            component="img"
            src="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/994864e6d407751510742627ffb6c58aa3d305d5/LOGO%20AZUL.svg"
            alt="Logo"
            sx={{
              width: isMobile ? "60%" : "70%",
              maxWidth: 180,
              mx: "auto",
              mb: 1,
            }}
          />
        </Box>

        <Typography
          variant="body1"
          color="rgba(0, 0, 57, 1)"
          fontStyle="italic"
          textAlign="center"
          mb={3}
        >
          The strategy, in your hands.
        </Typography>

        {/* Formulario */}
        <Box display="flex" flexDirection="column" gap={2} width="100%">
          <TextField
            label="Apodo"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            fullWidth
            variant="outlined"
            sx={inputStyles}
          />
          <TextField
            label="Correo"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            variant="outlined"
            sx={inputStyles}
          />
          <TextField
            label="Contraseña"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            variant="outlined"
            sx={inputStyles}
          />
          <TextField
            label="Confirmar Contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            fullWidth
            variant="outlined"
            sx={inputStyles}
          />

          <Button
            type="submit"
            variant="contained"
            sx={{
              mt: 3,
              bgcolor: "rgba(0, 0, 57, 1)",
              color: "#fff",
              borderRadius: "10px",
              height: "50px",
              fontWeight: "bold",
              width: "100%",
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
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Ya tengo cuenta
          </Button>

          {error && (
            <Typography textAlign="center" color="error" mt={1}>
              {error}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default Register;