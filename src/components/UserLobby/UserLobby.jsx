import { Avatar, Box, Typography } from "@mui/material";

const UserLobby = ({ name, avatar }) => {
  return (
    <Box
      sx={{
        width: 95,
        height: 95,
        backgroundColor: "#2f2f77",
        borderRadius: "15px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "4px",
      }}
    >
      <Avatar src={avatar} alt={name} sx={{ width: 36, height: 36 }} />
      <Typography
        variant="caption"
        sx={{
          color: "#fff",
          fontWeight: "bold",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        {name}
      </Typography>
    </Box>
  );
};

export default UserLobby;