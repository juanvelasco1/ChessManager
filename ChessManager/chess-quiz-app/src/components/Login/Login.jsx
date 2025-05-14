import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../services/firebaseConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice.js";
import { collection, query, where, getDocs } from "firebase/firestore";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

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

      const role = userData.role;
      if (role === "jugador") {
        navigate("/home");
      } else if (role === "administrador") {
        navigate("/home-teacher");
      } else {
        console.error("Rol desconocido:", role);
        setError("Rol desconocido. Contacta al administrador.");
      }
    } catch (err) {
      console.error("Error al iniciar sesión:", err.message);
      setError("Correo o contraseña incorrectos");
    }
  };

  const inputStyles = {
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