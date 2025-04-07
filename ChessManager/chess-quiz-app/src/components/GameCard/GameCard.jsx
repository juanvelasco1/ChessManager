import { Box, Typography, Avatar, Button } from "@mui/material";

const GameCard = () => {
  return (
    <Box
      sx={{
        width: 410,
        mx: "auto",
        height: 195,
        borderRadius: "12px",
        boxShadow: 2,
        overflow: "hidden",
        mb: 3,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      {/* Jugadores */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#000039",
          color: "#fff",
          py: 1.5,
          px: 2,
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src="https://www.smashbros.com/images/og/lucas.jpg"
            sx={{ width: 40, height: 40, mb: 0.5 }}
          />
          <Typography fontSize={14} fontWeight="bold">
            Lucas
          </Typography>
        </Box>

        <Typography fontWeight="bold" fontSize={18}>
          Vs
        </Typography>

        <Box display="flex" flexDirection="column" alignItems="center">
          <Avatar
            src="https://resizer.glanacion.com/resizer/v2/san-lucas-se-celebra-todos-los-18-de-WIMO3P5PTVDDRMIVCMSDCCOKLI.png"
            sx={{ width: 40, height: 40, mb: 0.5 }}
          />
          <Typography fontSize={14} fontWeight="bold">
            JairoPro
          </Typography>
        </Box>
      </Box>

      {/* Botones */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          backgroundColor: "#434379",
          color: "#fff",
          flexGrow: 1,
        }}
      >
        <Button
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            color: "#fff",
            height: "100%",
            borderRight: "1px solid white",
            backgroundColor: "#434379",
            "&:hover": {
              backgroundColor: "#000039",
            },
          }}
        >
          Ganador
        </Button>
        <Button
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            height: "100%",
            color: "#000039",
            backgroundColor: "#fff",
            "&:hover": {
              backgroundColor: "#ddd",
            },
          }}
        >
          Empate
        </Button>
        <Button
          sx={{
            borderRadius: 0,
            fontWeight: "bold",
            color: "#fff",
            height: "100%",
            borderLeft: "1px solid white",
            backgroundColor: "#434379",
            "&:hover": {
              backgroundColor: "#000039",
            },
          }}
        >
          Ganador
        </Button>
      </Box>
    </Box>
  );
};

export default GameCard;