import { ToggleButtonGroup, ToggleButton, Box } from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const NavBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [selected, setSelected] = useState("home");

  useEffect(() => {
    if (location.pathname.includes("/home-teacher")) {
      setSelected("home");
    } else if (location.pathname.includes("/settings-tournament")) {
      setSelected("chess");
    }
  }, [location.pathname]);

  const handleChange = (event, newSelection) => {
    if (newSelection) {
      setSelected(newSelection);
      if (newSelection === "home") navigate("/home-teacher");
      if (newSelection === "chess") navigate("/settings-tournament");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: {
          xs: 690,     // mobile
          md: 850           // desktop
        },
        bottom: {
          xs: 50,          // mobile
          md: "unset"
        },
        left: {
          xs: "47.3%",
          md: "50%"
        },
        transform: "translateX(-50%)",
        width: {
          xs: "90%",
          md: "120%",
        },
        maxWidth: 700,
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
          <img
            src={
              selected === "home"
                ? "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/%F0%9F%A6%86%20icon%20_home_.svg"
                : "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/21a8fc4001d1b768f0dde1c460e6cf29ca42c960/%F0%9F%A6%86%20icon%20_home_%20dark.svg"
            }
            alt="Home"
            width={28}
            height={28}
          />
        </ToggleButton>

        <ToggleButton value="chess">
          <img
            src={
              selected === "chess"
                ? "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/21a8fc4001d1b768f0dde1c460e6cf29ca42c960/%F0%9F%A6%86%20icon%20_Chess_white.svg"
                : "https://raw.githubusercontent.com/SergioRP18/LOGO-ChessManager/main/%F0%9F%A6%86%20icon%20_Chess_.svg"
            }
            alt="Chess"
            width={28}
            height={28}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default NavBar;