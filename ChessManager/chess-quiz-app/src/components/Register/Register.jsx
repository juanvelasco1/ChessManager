import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [formData, setFormData] = useState({
    apodo: "",
    correo: "",
    contraseña: "",
    confirmar: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/quiz");
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
        onSubmit={handleSubmit}
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

        <TextField
          label="Apodo"
          name="apodo"
          value={formData.apodo}
          onChange={handleChange}
          fullWidth
          required
          sx={inputStyles}
        />
        <TextField
          label="Correo"
          name="correo"
          type="email"
          value={formData.correo}
          onChange={handleChange}
          fullWidth
          required
          sx={inputStyles}
        />
        <TextField
          label="Contraseña"
          name="contraseña"
          type="password"
          value={formData.contraseña}
          onChange={handleChange}
          fullWidth
          required
          sx={inputStyles}
        />
        <TextField
          label="Confirmar Contraseña"
          name="confirmar"
          type="password"
          value={formData.confirmar}
          onChange={handleChange}
          fullWidth
          required
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
    width: "100%", // ← centrado total
  }}
>
  Ya tengo cuenta
</Button>
      </Box>
    </Box>
  );
};

const inputStyles = {
  mt: 2,
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

export default Register;