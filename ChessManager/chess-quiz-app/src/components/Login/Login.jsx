import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import { login } from "../../store/authSlice.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Por favor, ingresa un correo y una contraseña.");
      return;
    }
  
    try {
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("email", "==", email));
      const querySnapshot = await getDocs(q);
  
      if (querySnapshot.empty) {
        setError("El correo no está registrado");
        return;
      }
  
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
  
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      dispatch(login({ uid: user.uid }));
  
      const role = userData.role || "jugador";
      if (role === "jugador") {
        navigate("/home");
      } else if (role === "administrador") {
        navigate("/home-teacher");
      } else {
        console.error("Rol desconocido o no definido:", role);
        setError("Rol desconocido o no definido. Contacta al administrador.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err.code, err.message);
      if (err.code === "auth/user-not-found") {
        setError("El usuario no existe.");
      } else if (err.code === "auth/wrong-password") {
        setError("Contraseña incorrecta.");
      } else if (err.code === "auth/invalid-email") {
        setError("El correo electrónico no es válido.");
      } else {
        setError("Error al iniciar sesión. Intenta de nuevo.");
      }
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
        mb={4}
      >
        The strategy, in your hands.
      </Typography>

      {/* Formulario */}
      <Box component="form" display="flex" flexDirection="column" gap={2} width="100%">
        <TextField
          type="email"
          label="Correo"
          required
          fullWidth
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{
            borderRadius: "10px",
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
          required
          fullWidth
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{
            borderRadius: "10px",
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
          variant="contained"
          onClick={handleLogin}
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
          Ingresar
        </Button>

        <Button
          variant="text"
          onClick={() => navigate("/register")}
          sx={{
            mt: 1,
            color: "rgba(0, 0, 57, 1)",
            borderRadius: "10px",
          }}
        >
          Registrarte
        </Button>
      </Box>
    </Container>
  );
};

export default Login;