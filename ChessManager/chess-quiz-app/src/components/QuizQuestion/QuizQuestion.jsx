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
        <Typography
          fontWeight="bold"
          fontSize={28}
          color="#000039"
          mb={1}
          textAlign="center"
          width="100%"
        >
          ¡Quiz terminado!
        </Typography>
  
        <Typography
          fontSize={20}
          color="#000000"
          mb={4}
          textAlign="center"
          width="100%"
        >
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
        maxWidth: 420,
        mx: "auto",
        px: 2,
        py: 4,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Contador */}
      <Box sx={{ position: "absolute", top: 80, right: 20 }}>
        <Typography color="#000039" fontWeight="bold" fontSize="22px">
          {current + 1}/{questions.length}
        </Typography>
      </Box>

      

      {/* pregunta */}
      <Typography
        fontWeight="bold"
        fontSize="24px"
        color="#000039"
        mb={2}
        sx={{ px: 2 }}
      >
        {question.text}
      </Typography>

      {/* Imagen si existe */}
      {question.image && (
        <Box
          component="img"
          src={question.image}
          alt="Tablero"
          sx={{
            width: "100%",
            maxWidth: 330,
            mx: "auto",
            mb: 2,
            borderRadius: 2,
          }}
        />
      )}

      {/* Opciones */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: question.image ? "repeat(2, 1fr)" : "1fr",
          gap: 2,
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
                height: 70,
                backgroundColor: getColor(label),
                color: "#fff",
                fontWeight: "bold",
                borderRadius: "10px",
                boxShadow: 2,
                fontSize: 16,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                "&:hover": {
                  backgroundColor: getColor(label),
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
  );
};

export default QuizQuestion;