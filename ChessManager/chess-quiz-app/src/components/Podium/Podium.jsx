import { Box, Typography, Avatar } from "@mui/material";

const Podium = () => {
  return (
    <Box
      sx={{
        top: "38px",
        width: 415,
        mx: "auto",
        mt: "100px",
        position: "relative",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
      }}
    >
      {/* Número #2 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-48px", // altura ajustada para 10px sobre columna
          left: 30,
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #2
      </Typography>

      {/* Número #1 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-68px", // más alto por ser la columna central
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #1
      </Typography>

      {/* Número #3 */}
      <Typography
        sx={{
          color: "#000039",
          position: "absolute",
          top: "-28px",
          right: 30,
          fontSize: "48px",
          fontWeight: "bold",
        }}
      >
        #3
      </Typography>

      {/* Segundo lugar */}
      <Box
        sx={{
          width: 138,
          height: 130,
          backgroundColor: "#2f2f77",
          borderTopLeftRadius: "10px",
          borderBottomLeftRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src="https://cdn3d.iconscout.com/3d/premium/thumb/black-chess-pawn-3d-icon-download-in-png-blend-fbx-gltf-file-formats--piece-strategy-ui-vol-54-pack-user-interface-icons-5639635.png?f=webp"
          sx={{ width: 50, height: 50, mb: 1 }}
        />
        <Typography fontSize={14}>kks47</Typography>
        <Typography fontSize={14}>899</Typography>
      </Box>

      {/* Primer lugar */}
      <Box
        sx={{
          width: 139,
          height: 160,
          backgroundColor: "#000039",
          borderTopLeftRadius: "10px",
          borderTopRightRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src="https://images.icon-icons.com/651/PNG/512/Icon_Business_Set_00016_A_icon-icons.com_59848.png"
          sx={{ width: 60, height: 60, mb: 1 }}
        />
        <Typography fontSize={14}>JairoPRo</Typography>
        <Typography fontSize={14}>1000</Typography>
      </Box>

      {/* Tercer lugar */}
      <Box
        sx={{
          width: 138,
          height: 110,
          backgroundColor: "#434379",
          borderTopRightRadius: "10px",
          borderBottomRightRadius: "10px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-end",
          color: "#ffffff",
          pb: 1,
        }}
      >
        <Avatar
          src="https://i.pinimg.com/736x/5b/f7/40/5bf7403b4aae04f260c56ec19f7c4bda.jpg"
          sx={{ width: 50, height: 50, mb: 1 }}
        />
        <Typography fontSize={14}>Rodrigo49</Typography>
        <Typography fontSize={14}>895</Typography>
      </Box>
    </Box>
  );
};

export default Podium;