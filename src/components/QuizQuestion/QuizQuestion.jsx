import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { auth } from "../../services/firebaseConfig";
import { db } from "../../services/firebaseConfig";
import { doc, updateDoc, increment, getDoc } from "firebase/firestore";

const QuizQuestion = () => {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
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
    const fetchQuestions = async () => {
      const docRef = doc(db, "quizQuestions", "set1");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        try {
          const parsedQuestions = JSON.parse(docSnap.data().questions);
          setQuestions(parsedQuestions);
        } catch (error) {
          console.error("Error al parsear las preguntas:", error);
        }
      } else {
        console.error("No se encontró el documento de preguntas");
      }
    };
    fetchQuestions();
  }, []);

  useEffect(() => {
    if (!questions.length) return;
    let recalculatedScore = 0;
    let recalculatedCorrect = 0;
    for (let i = 0; i < current; i++) {
      const q = questions[i];
      if (!q) continue;
      const savedAnswer = localStorage.getItem(`quizAnswer_${i}`);
      if (savedAnswer === q.correct) {
        recalculatedScore += q.points;
        recalculatedCorrect += 1;
      }
    }
    if (recalculatedScore !== score) setScore(recalculatedScore);
    if (recalculatedCorrect !== correctCount) setCorrectCount(recalculatedCorrect);
  }, [current, questions]);

  if (!questions.length) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100dvh">
        <Typography>Cargando preguntas...</Typography>
      </Box>
    );
  }

  const question = questions[current];

  const handleClick = async (option) => {
    setSelected(option);
    localStorage.setItem(`quizAnswer_${current}`, option);

    if (option === question.correct) {
      const newScore = score + question.points;
      setScore(newScore);
      localStorage.setItem("quizScore", newScore.toString());

      const newCorrectCount = correctCount + 1;
      setCorrectCount(newCorrectCount);
      localStorage.setItem("quizCorrect", newCorrectCount.toString());

      // Actualizar puntos en Firebase usando increment
      const user = auth.currentUser;
      if (user) {
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          points: increment(question.points), // Incrementar puntos en Firebase
        });
      }
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
        // Calcular el rango basado en el puntaje
        let rank;
        if (score <= 70) rank = "Madera 🪵";
        else if (score <= 110) rank = "Bronce 🥉";
        else if (score <= 150) rank = "Plata 🥈";
        else rank = "Oro 🥇";

        // Guardar el rango en Firebase
        const userRef = doc(db, "users", user.uid);
        await updateDoc(userRef, {
          rank: rank, // Guardar el rango calculado
          games: increment(1), // Incrementar el número de juegos en Firebase
        });
      }

      localStorage.clear();
      navigate("/home");
    };

    return (
      <Box
        sx={{
          width: "100%",
          height: "100dvh",
          overflow: "hidden",
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
        height: "100dvh",
        overflowY: "hidden",
        overflowX: "hidden",
        mx: "auto",
        px: { xs: 2, sm: 4, md: 6 },
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
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
        <Box mb={2} sx={{ textAlign: "center", px: 2 }}>
          {question.text.split("\n").map((line, idx) => (
            <Typography
              key={idx}
              fontWeight="bold"
              fontSize={{ xs: 24, sm: 28 }}
              color="#000039"
              mb={0.5}
            >
              {`${idx + 1}. ${line}`}
            </Typography>
          ))}
        </Box>

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
                  maxWidth: 250,
                  mx: "auto",
                  minWidth: 0,
                  height: { xs: 100, sm: 100, md: 120 },
                  aspectRatio: "3 / 4",
                  backgroundColor: getColor(label),
                  color: "#fff",
                  fontWeight: "bold",
                  borderRadius: "14px",
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
                {question.image ? (
                  label.split(/(?=\d+\.\s)/).map((line, index) => (
                    <Typography key={index} component="div">
                      {line.trim()}
                    </Typography>
                  ))
                ) : (
                  label.split("\\n").map((line, index) => (
                    <span key={index}>{line}</span>
                  ))
                )}
              </Button>
            );
          })}
        </Box>
      </Box>
    </Box>
  );
};

export default QuizQuestion;