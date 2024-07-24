import React, { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography } from "@mui/material";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import logo from "../assets/logo.jpg";
import ChatIcon from "@mui/icons-material/Chat";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PublicIcon from "@mui/icons-material/Public";
import EventIcon from "@mui/icons-material/Event";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";

const Sidebarr = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const renderMenuItem = (title, icon, subItems = [], isLast = false) => {
    return (
      <Box mb="5px" px="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          paddingBottom="20px"
        >
          {!isCollapsed && <Typography>{title}</Typography>}
          <IconButton size="small" color="inherit">
            {icon}
          </IconButton>
        </Box>
        {!isCollapsed &&
          subItems.map((item, index) => (
            <Typography
              key={index}
              color="gray"
              style={{ cursor: "pointer", padding: "2px 0px 2px 0px" }}
              sx={{
                "&:hover": {
                  color: "#FF8C00",
                },
              }}
            >
              {item}
            </Typography>
          ))}
        {!isCollapsed && !isLast && (
          <hr
            style={{
              borderTop: "1px solid #D3D3D3",
              margin: "20px -0px 10px -10px",
            }}
          />
        )}
      </Box>
    );
  };

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
            style={{
              margin: "10px 0 20px 0",
            }}
            rootStyles={{
              ["&.ps-menuitem-root"]: {
                backgroundColor: "transparent !important",
              },
              ["&.ps-menuitem-root:hover"]: {
                backgroundColor: "transparent !important",
              },
            }}
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
                  alt=""
                  style={{ marginBottom: "0px", width: "60%", height: "40%" }}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {!isCollapsed && (
            <Box mb="25px" px="20px">
              <hr
                style={{
                  borderTop: "1px solid #D3D3D3",
                  margin: "-10px -0px 20px -5px",
                }}
              />
              <Typography pb="20px" textAlign="center" fontWeight="bold">
                {" "}
                My Dashboard{" "}
              </Typography>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography
                  color="gray"
                  style={{ cursor: "pointer" }}
                  sx={{
                    "&:hover": {
                      color: "#FF8C00",
                    },
                  }}
                >
                  {" "}
                  Chat{" "}
                </Typography>
                <IconButton size="small" color="inherit">
                  <ChatIcon fontSize="small" style={{ color: "gray" }} />
                </IconButton>
              </Box>
              <hr
                style={{
                  borderTop: "1px solid #D3D3D3",
                  margin: "20px -0px 10px -10px",
                }}
              />
            </Box>
          )}
          {renderMenuItem(
            "Art Shop",
            <ShoppingCartIcon fontSize="small" style={{ color: "gray" }} />,
            ["Orders", "Products", "Categories", "Shipping"]
          )}
          {renderMenuItem(
            "Trips",
            <PublicIcon fontSize="small" style={{ color: "gray" }} />,
            ["Sineries", "Tags", "Hotel Booking"]
          )}
          {renderMenuItem(
            "Events",
            <EventIcon fontSize="small" style={{ color: "gray" }} />,
            ["Hi Events"]
          )}
          {renderMenuItem(
            "Users",
            <GroupIcon fontSize="small" style={{ color: "gray" }} />,
            ["Manage", "Report Submission", "Notifications"]
          )}
          {renderMenuItem(
            "General Configurations",
            <SettingsIcon fontSize="small" style={{ color: "gray" }} />,
            ["Email Templates", "Countries"],
            true
          )}
        </Menu>
      </Sidebar>
    </Box>
  );
};

export default Sidebarr;
