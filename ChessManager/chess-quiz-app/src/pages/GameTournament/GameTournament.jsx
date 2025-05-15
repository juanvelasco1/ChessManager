import GameCard from "../../components/GameCard/GameCard";
import { Box, Typography } from "@mui/material";
import { IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const GameTournamentScreen = () => {
  const navigate = useNavigate();
  const scrollHeight = 800;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    isMobile ? (
      <Box
        sx={{
          width: 410,
          mx: "auto",
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          pt: 3,
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          color="#000039"
          textAlign="center"
          mb={2}
        >
          Todos vs todos
        </Typography>
        <IconButton
          onClick={() => navigate(-1)}
          sx={{
            position: "absolute",
            top: 35,
            left: 16,
            zIndex: 999,
            color: "#000039",
          }}
        >
          <ArrowBackIcon />
        </IconButton>

        <Box
          sx={{
            maxHeight: scrollHeight,
            overflowY: "auto",
            pr: 1,
          }}
        >
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
          <GameCard />
        </Box>
      </Box>
    ) : (
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          paddingTop: "40px",
        }}
      >
        <Box
          sx={{
            width: "90%",
            maxWidth: "1100px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Typography
            variant="h4"
            fontWeight="bold"
            color="#000039"
            textAlign="center"
            mb={2}
          >
            Todos vs todos
          </Typography>
          <IconButton
            onClick={() => navigate(-1)}
            sx={{
              position: "absolute",
              top: 35,
              left: 35,
              zIndex: 999,
              color: "#000039",
            }}
          >
            <ArrowBackIcon />
          </IconButton>

          <Box
            sx={{
              maxHeight: "calc(100vh - 100px)",
              overflowY: "auto",
              pr: 1,
            }}
          >
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
            <GameCard />
          </Box>
        </Box>
      </Box>
    )
  );
};

export default GameTournamentScreen;