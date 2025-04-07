import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();

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
          onClick={(e) => {
            e.preventDefault();
            navigate("/home");
          }}
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