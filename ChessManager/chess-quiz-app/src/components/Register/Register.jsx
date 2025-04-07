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
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("jugador");

  const handleRoleChange = (event, newRole) => {
    if (newRole !== null) setRole(newRole);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Rol seleccionado:", role);
    console.log("Formulario enviado");
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
  onChange={handleRoleChange}
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
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={2}
        width="100%"
      >
        <TextField
          type="text"
          label="Apodo"
          required
          fullWidth
          variant="outlined"
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
          required
          fullWidth
          variant="outlined"
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
          required
          fullWidth
          variant="outlined"
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
          required
          fullWidth
          variant="outlined"
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