import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import { useState } from "react";

const NavBar = () => {
  const [selected, setSelected] = useState("home");

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
        <ToggleButton value="home">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
          </svg>
        </ToggleButton>

        <ToggleButton value="chess">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 22h6v-1H9v1Zm10-5v-1h-1v-1l-1-1v-2h-1V9h1V7h-1V6h-1V4h-2v2h-2V4H9v2H8v1H7v2h1v3H7v2l-1 1v1H5v1H3v2h18v-2h-2Z" />
          </svg>
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default NavBar;