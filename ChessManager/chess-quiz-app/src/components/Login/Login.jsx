import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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

        <TextField label="Correo" fullWidth required sx={inputStyles} />
        <TextField
          label="Contraseña"
          type="password"
          fullWidth
          required
          sx={{ ...inputStyles, mt: 2 }}
        />

        <Button
          onClick={() => navigate("/home")}
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
    width: "100%", // ← centrado total
  }}
>
  Registrarte
</Button>
      </Box>
    </Box>
  );
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

export default Login;