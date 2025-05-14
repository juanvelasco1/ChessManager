import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import { db } from "../../services/firebaseConfig";
import { doc, updateDoc, increment } from "firebase/firestore";

const questions = [
  {
    id: 1,
    text: "¿Cuál es la única pieza que puede saltar sobre otras?",
    options: ["Alfil", "Torre", "Caballo", "Peón"],
    correct: "Caballo",
    points: 6,
  },
  {
    id: 3,
    text: "¿Qué significa el resultado “0.5 -0.5”?",
    options: ["Jaque mate parcial", "Partida suspendida", "Empate (tablas)", "Enroque fallido"],
    correct: "Empate (tablas)",
    points: 6,
  },
  {
    id: 4,
    text: "¿Qué pieza comienza en las esquinas del tablero?",
    options: ["Reina", "Caballo", "Alfil", "Torre"],
    correct: "Torre",
    points: 6,
  },
  {
    id: 5,
    text: "¿Qué principio estratégico se aplica en la apertura?",
    options: ["Mover el rey temprano al centro", "Sacar las piezas menores y controlar el centro", "Cambiar damas lo antes posible", "Avanzar peones del flanco"],
    correct: "Sacar las piezas menores y controlar el centro",
    points: 8,
  },
  {
    id: 6,
    text: "¿Qué es una “clavada” en ajedrez?",
    options: ["Cuando se pierde el turno", "Una pieza que no se puede mover sin consecuencias mayores", "Cuando una pieza se coloca sobre otra", "Ataque con dos torres en la misma fila"],
    correct: "Una pieza que no se puede mover sin consecuencias mayores",
    points: 8,
  },
  {
    id: 7,
    text: "¿Qué es el desarrollo en ajedrez?",
    options: ["Sacar las piezas menores (caballos y alfiles) al comienzo de la partida", "Cambiar torres por peones", "Promover los peones rápidamente", "Capturar una pieza sin perder ninguna"],
    correct: "Sacar las piezas menores (caballos y alfiles) al comienzo de la partida",
    points: 8,
  },
  {
    id: 8,
    text: "¿Qué ocurre cuando un peón alcanza la octava fila?",
    options: ["Se vuelve otra pieza (menos el rey)", "Se vuelve rey", "Se elimina del juego", "No puede avanzar más"],
    correct: "Se vuelve otra pieza (menos el rey)",
    points: 10,
  },
  {
    id: 9,
    text: "¿Qué significa tener una “ventaja dinámica”?",
    options: ["Tener más piezas en el tablero", "Tener piezas activas aunque se esté en desventaja material", "Estar en zugzwang", "Tener todas las piezas en las casillas originales"],
    correct: "Tener piezas activas aunque se esté en desventaja material",
    points: 10,
  },
  {
    id: 10,
    text: "¿En qué caso ocurre un jaque mate conocido como “mate de la coz”?",
    options: ["Dos torres contra rey", "Dos alfiles en casillas opuestas", "Torre y caballo contra rey", "Dos caballos sin ayuda no pueden dar mate"],
    correct: "Torre y caballo contra rey",
    points: 10,
  },
  {
    id: 11,
    text: "¿Qué concepto estratégico representa mejor el “peón retrasado”?",
    options: ["Peón que no ha sido movido en toda la partida", "Peón que se encuentra detrás de sus compañeros y no puede avanzar con seguridad", "Peón que fue promovido y luego coronado otra vez", "Peón en la columna “a” o “h”"],
    correct: "Peón que se encuentra detrás de sus compañeros y no puede avanzar con seguridad",
    points: 10,
  },
  {
    id: 13,
    text: "Juega blancas y da mate en 3.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%203.svg",
    options: [
      { label: "1. ♘H5+ 2. ♖xG6+ 3. ♖E6++" },
      { label: "1. ♞H5+ 2. ♖E6++" },
      { label: "1. ♔H7 2. ♖E6++" },
      { label: "1. ♖E6++ 2. ♘H5+ 3. ♖G6++" }
    ],
    correct: "1. ♘H5+ 2. ♖xG6+ 3. ♖E6++",
    points: 12,
  },
  {
    id: 14,
    text: "Juega blancas y da mate en 3.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%203-2.svg",
    options: [
      { label: "1. ♘c6+ 2. ♕g5+ 3. ♗d2" },
      { label: "1. ♕xf7+ 2. ♘d5+ 3. ♗f4++" },
      { label: "1. ♖g1 2. ♗d5+ 3. ♗g5++" },
      { label: "1. ♘g6+ 2. ♘d5+ 3. ♕e5++" }
    ],
    correct: "1. ♘g6+ 2. ♘d5+ 3. ♕e5++",
    points: 12,
  },
  {
    id: 12,
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
    points: 12,
  },
  {
    id: 15,
    text: "Juega blancas y da mate en 3.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%203-3.svg",
    options: [
      { label: "1. ♖d7+ 2. ♖xe7 3. ♖xe5" },
      { label: "1. ♕xb8+ 2. ♖d8+ 3. ♖b8++" },
      { label: "1. ♗xf6 2. ♗xb5 3. ♕xf6" },
      { label: "1. ♕xf6 2. ♕xe5 3. ♖d7" }
    ],
    correct: "1. ♕xb8+ 2. ♖d8+ 3. ♖b8++",
    points: 14,
  },
  {
    id: 16,
    text: "Juega blancas y da mate en 2.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%202.svg",
    options: [
      { label: "1. ♕a6+ 2. ♖xa6++" },
      { label: "1. ♖e8+ 2. ♕xb7+" },
      { label: "1. ♕d4+ 2. ♖e8++" },
      { label: "1. ♕c5+ 2. ♖e8++" }
    ],
    correct: "1. ♕a6+ 2. ♖xa6++",
    points: 14,
  },
  {
    id: 18,
    text: "Juega blancas y da mate en 1.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%201-2.svg",
    options: [
      { icon: "", label: "D-5" },
      { icon: "", label: "H-7" },
      { icon: "", label: "H-7" },
      { icon: "", label: "F-6" }
    ],
    correct: "D-5",
    points: 14,
  },
  {
    id: 19,
    text: "Juega blancas y da mate en 3.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/mate%20en%201.svg",
    options: [
      { label: "1. ♘h5+ 2. ♖xg6+ 3. ♖e6++" },
      { label: "1. ♖e6+ 2. ♖g5 3. ♘xf5+" },
      { label: "1. ♖g5+ 2. ♘xf5 3. ♖e5+" },
      { label: "1. ♘xf5+ 2. ♖g5+ 3. ♖e6+" }
    ],
    correct: "1. ♘h5+ 2. ♖xg6+ 3. ♖e6++",
    points: 16,
  },
  {
    id: 20,
    text: "Juega blancas y da mate en 1.",
    image: "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/Tablero%20pregunta%201.svg",
    options: [
      { icon: "", label: "D-4" },
      { icon: "", label: "F-6" },
      { icon: "", label: "A-4++" },
      { icon: "", label: "B-6" }
    ],
    correct: "A-4++",
    points: 16,
  }
];

const QuizQuestion = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(() => {
    const saved = localStorage.getItem("quizCurrent");
    return saved ? parseInt(saved) : 0;
  });
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(() => {
    const saved = localStorage.getItem("quizScore");
    return saved ? parseInt(saved) : 0;
  });
  const [correctCount, setCorrectCount] = useState(() => {
    const saved = localStorage.getItem("quizCorrect");
    return saved ? parseInt(saved) : 0;
  });

  useEffect(() => {
    // On mount, recalculate score and correctCount based on current progress to ensure consistency
    let recalculatedScore = 0;
    let recalculatedCorrect = 0;
    for (let i = 0; i < current; i++) {
      const q = questions[i];
      const savedAnswer = localStorage.getItem(`quizAnswer_${i}`);
      if (savedAnswer === q.correct) {
        recalculatedScore += q.points;
        recalculatedCorrect += 1;
      }
    }
    if (recalculatedScore !== score) setScore(recalculatedScore);
    if (recalculatedCorrect !== correctCount) setCorrectCount(recalculatedCorrect);
  }, [current]);

  const question = questions[current];

  const handleClick = (option) => {
    setSelected(option);
    localStorage.setItem(`quizAnswer_${current}`, option);
    if (option === question.correct) {
      const newScore = score + question.points;
      setScore(newScore);
      localStorage.setItem("quizScore", newScore.toString());

      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      localStorage.setItem("quizCorrect", newCorrectCount.toString());
    }
    setTimeout(() => {
      const next = current + 1;
      setSelected(null);
      setCurrent(next);
      localStorage.setItem("quizCurrent", next.toString());
    }, 1000);
  };

  const getColor = (option) => {
    if (!selected) return "#2f2f77";
    if (option === question.correct) return "#8BC34A";
    if (option === selected) return "#D32F2F";
    return "#2f2f77";
  };

  if (current >= questions.length) {
    const handleContinue = async () => {
      const user = auth.currentUser;
      if (user) {
        await updateDoc(doc(db, "users", user.uid), {
          rank: score,
          trophies: correctCount,
          games: increment(1),
        });
      }
      localStorage.removeItem("quizScore");
      localStorage.removeItem("quizCurrent");
      localStorage.removeItem("quizCorrect");
      // Remove saved answers
      for(let i = 0; i < questions.length; i++) {
        localStorage.removeItem(`quizAnswer_${i}`);
      }
      navigate("/home");
    };

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
        <Typography fontSize={20} color="#000000" mb={1}>
          Preguntas correctas: <strong>{correctCount} de {questions.length}</strong>
        </Typography>
        <Typography fontSize={20} color="#000000" mb={4}>
          Tu rango: <strong>
            {score <= 70 ? "Madera 🪵" : 
             score <= 110 ? "Bronce 🥉" : 
             score <= 150 ? "Plata 🥈" : 
             "Oro 🥇"}
          </strong>
        </Typography>
        <Button
          variant="contained"
          onClick={handleContinue}
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
                  textTransform: "none",
                  whiteSpace: "normal",
                  wordBreak: "break-word",
                  textAlign: "center",
                  overflowWrap: "break-word",
                  padding: "8px",
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