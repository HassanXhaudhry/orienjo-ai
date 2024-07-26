import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PublicIcon from "@mui/icons-material/Public";
import logo from "../assets/logo.jpg";
import { Link } from "react-router-dom";

const Sidebarr = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <Box
      sx={{
        "& .ps-sidebar-root": {
          height: "100vh !important",
        },
        "& .ps-sidebar-container": {
          height: "100% !important",
          overflowY: "auto",
          backgroundColor: "#ffffff !important",
        },
        "& .pro-sidebar-inner": {
          backgroundColor: "#ffffff",
          height: "100%",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-MenuItem": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-menu-MenuItem.active": {
          color: "#ffffff !important",
        },
        "& .ps-menu-button:hover": {
          backgroundColor: "transparent !important",
        },
      }}
    >
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{ margin: "10px 0 20px 0" }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  src={logo}
                  alt="Logo"
                  style={{ marginBottom: "0px", width: "60%", height: "40%" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed ? (
            <Box mb="25px" px="20px">
              <hr
                style={{
                  borderTop: "1px solid #D3D3D3",
                  margin: "-10px 0 20px -5px",
                }}
              />
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Link to="/country" style={{ textDecoration: "none" }}>
                  <Typography
                    color="gray"
                    style={{
                      cursor: "pointer",
                      fontSize: "17px",
                    }}
                    sx={{
                      "&:hover": {
                        color: "#FF8C00",
                      },
                    }}
                  >
                    Country
                  </Typography>
                </Link>
                <IconButton size="small" color="inherit">
                  <PublicIcon fontSize="small" style={{ color: "gray" }} />
                </IconButton>
              </Box>
            </Box>
          ) : (
            <MenuItem
              icon={<PublicIcon fontSize="small" style={{ color: "gray" }} />}
            />
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarr;
