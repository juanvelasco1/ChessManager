import { Box, Button, TextField, Typography, useMediaQuery, useTheme } from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { doc, getDoc } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Obtener la ruta de redirección desde los parámetros de la URL
  const redirectPath = new URLSearchParams(location.search).get("redirect") || "/home";

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

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingresa un correo y una contraseña.");
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        console.log(userData);
        dispatch(login({
          uid: user.uid,
          email: user.email,
          nickname: userData.nickname,
          rol: userData.role,
        }));

        // Redirige según el rol del usuario
        if (userData.role === "profesor") {
          navigate("/home-teacher"); // Redirige directamente al home del profesor
        } else if (userData.role === "jugador") {
          navigate(redirectPath); // Redirige al lobby o al path especificado
        } else {
          setError("Rol no válido. Contacta al administrador.");
        }
      } else {
        setError("El usuario no existe en la base de datos.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      if (err.code === "auth/user-not-found") {
        setError("El usuario no está registrado.");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
    }
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

        <Box component="form" display="flex" flexDirection="column" gap={2} width="100%">
          <TextField
            type="email"
            label="Correo"
            required
            fullWidth
            variant="outlined"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={inputStyles}
          />

          <TextField
            label="Contraseña"
            type="password"
            fullWidth
            variant="outlined"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={inputStyles}
          />

          <Button
            onClick={handleLogin}
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
            Ingresar
          </Button>

          <Button
            variant="text"
            onClick={() => navigate("/register")}
            sx={{
              mt: 1,
              color: "rgba(0, 0, 57, 1)",
              fontWeight: "bold",
              display: "flex",
              justifyContent: "center",
              width: "100%",
            }}
          >
            Registrarte
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

export default Login;