import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    id: 1,
    text: "¿Cuál es la única pieza que puede saltar sobre otras?",
    options: ["Alfil", "Torre", "Caballo", "Peón"],
    correct: "Caballo",
  },
  {
    id: 2,
    text: "Juega blancas y da mate en 1.",
    image:
      "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Tablero%20pregunta%201.svg",
    options: [
      { icon: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Caballo.svg", label: "E-7" },
      { icon: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Reina.svg", label: "H-7" },
      { icon: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Alfil.svg", label: "H-6" },
      { icon: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/b5e9ef3f4890b8f7eaa62c49eee7372e43bea001/Caballo.svg", label: "F-6" },
    ],
    correct: "H-7",
  },
];

const QuizQuestion = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);

  const question = questions[current];

  const handleClick = (option) => {
    setSelected(option);
    setTimeout(() => {
      setSelected(null);
      setCurrent((prev) => prev + 1);
    }, 1000);
  };

  const getColor = (option) => {
    if (!selected) return "#2f2f77";
    if (option === question.correct) return "#8BC34A";
    if (option === selected) return "#D32F2F";
    return "#2f2f77";
  };

  if (current >= questions.length) {
    return (
      <Box
        sx={{
          width: "100%",
          height: "100vh",
          maxWidth: 420,
          mx: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          px: 2,
          textAlign: "center",
        }}
      >
        <Typography fontWeight="bold" fontSize={28} color="#000039" mb={1}>
          ¡Quiz terminado!
        </Typography>
        <Typography fontSize={20} color="#000000" mb={4}>
          Tu rango: <strong>Bronce</strong> 🥉
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/home")}
          sx={{
            backgroundColor: "#000039",
            borderRadius: "10px",
            fontWeight: "bold",
            fontSize: "16px",
            width: "100%",
            maxWidth: 280,
            height: "55px",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#000039",
            },
          }}
        >
          CONTINUAR
        </Button>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: { xs: 420, sm: 600, md: 800 },
        height: "100vh",
        mx: "auto",
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
      }}
    >
      {/* Contador */}
      <Box
        sx={{
          position: "absolute",
          top: { xs: 30, sm: 40 },
          right: { xs: 20, sm: 40 },
        }}
      >
        <Typography color="#000039" fontWeight="bold" fontSize="22px">
          {current + 1}/{questions.length}
        </Typography>
      </Box>

      {/* Contenido */}
      <Box sx={{ width: "100%", maxWidth: 600 }}>
        <Typography
          fontWeight="bold"
          fontSize={{ xs: 24, sm: 28 }}
          color="#000039"
          mb={2}
          sx={{ textAlign: "center", px: 2 }}
        >
          {question.text}
        </Typography>

        {question.image && (
          <Box
            component="img"
            src={question.image}
            alt="Tablero"
            sx={{
              width: "100%",
              maxWidth: { xs: 300, sm: 360 },
              maxHeight: { xs: 200, sm: 240 },
              objectFit: "contain",
              mx: "auto",
              borderRadius: 2,
              display: "block",
            }}
          />
        )}

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: question.image ? "repeat(2, 1fr)" : "1fr",
              md: "repeat(2, 1fr)",
            },
            gap: { xs: 2, sm: 3 },
            mt: 2,
          }}
        >
          {question.options.map((opt, idx) => {
            const label = typeof opt === "string" ? opt : opt.label;
            const icon = typeof opt === "object" ? opt.icon : null;

            return (
              <Button
                key={idx}
                onClick={() => handleClick(label)}
                disabled={!!selected}
                sx={{
                  width: "100%",
                  height: { xs: 72, sm: 80 },
                  backgroundColor: getColor(label),
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  boxShadow: 2,
                  fontSize: { xs: 16, sm: 18 },
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  textTransform: "uppercase",
                  "&:hover": {
                    backgroundColor: getColor(label),
                    color: "#fff",
                  },
                  "&:disabled": {
                    color: "#fff",
                  },
                  "&.Mui-disabled": {
                    color: "#fff",
                  },
                }}
              >
                {icon && (
                  <Box
                    component="img"
                    src={icon}
                    alt=""
                    sx={{ width: 28, height: 28, mb: 0.5 }}
                  />
                )}
                {label}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default QuizQuestion;