import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [selected, setSelected] = useState("home");

  const navigate = useNavigate();

  const handleChange = (event, newSelection) => {
    if (newSelection !== null) {
      setSelected(newSelection);
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        bottom: 50,
        left: "49%",
        transform: "translateX(-50%)",
        width: 400,
        zIndex: 1000,
      }}
    >
      <ToggleButtonGroup
        exclusive
        value={selected}
        onChange={handleChange}
        sx={{
          width: "100%",
          backgroundColor: "#e0e0e0",
          borderRadius: "15px",
          padding: "6px",
          "& .MuiToggleButtonGroup-grouped": {
            minWidth: "50%",
            border: "none",
            borderRadius: "15px !important",
            padding: "12px 0",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "#000039",
            "&.Mui-selected, &.Mui-selected:hover": {
              backgroundColor: "#000039",
              color: "#fff",
            },
          },
        }}
      >
        <ToggleButton value="home" onClick={() => navigate("/home-teacher")}>
          <svg xmlns="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_home_.svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          </svg>
        </ToggleButton>

        <ToggleButton value="chess" onClick={() => navigate("/settings-tournament")}>
          <svg xmlns="https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/60acd42c40fbe6f3ca84d22e06cfa1e915e00a4c/%F0%9F%A6%86%20icon%20_Chess_.svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
          </svg>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default NavBar;