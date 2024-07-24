import React, { Fragment, useState } from "react";
import Sidebarr from "./components/Sidebar";
import "./App.css";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";

const Dashboard = () => {
  const [city, setCity] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [cities, setCities] = useState([
    { name: "London", latitude: "51.5074", longitude: "-0.1278" },
    { name: "Paris", latitude: "48.8566", longitude: "2.3522" },
    { name: "New York", latitude: "40.7128", longitude: "-74.0060" },
  ]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(
      "Submitting:",
      city,
      latitude,
      longitude,
      "Checked:",
      isChecked
    );
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Fragment>
      <div
        className="dashboard"
        style={{
          display: "flex",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        <Sidebarr />
        <div
          style={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            width: "100%",
            overflow: "auto",
          }}
        >
          <nav
            style={{
              padding: "10px 0px 10px 0px",
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
              borderBottom: "1px solid #D3D3D3",
            }}
          >
            <span style={{ padding: "10px 30px 10px 10px", cursor: "pointer" }}>
              Admin User
            </span>
          </nav>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              padding: "20px",
            }}
          >
            <div style={formContainerStyle}>
              <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
                Edit city - London, England
              </h2>
              <form
                onSubmit={handleSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label htmlFor="city" style={labelStyle}>
                  City Name
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="City"
                  style={inputStyle}
                />
                <p style={helperTextStyle}>Enter the full name of the city</p>

                <label htmlFor="latitude" style={labelStyle}>
                  Latitude
                </label>
                <input
                  id="latitude"
                  type="text"
                  value={latitude}
                  onChange={(e) => setLatitude(e.target.value)}
                  placeholder="Latitude"
                  style={inputStyle}
                />
                <p style={helperTextStyle}>
                  Enter the latitude in decimal degrees (e.g 4.24225)
                </p>

                <label htmlFor="longitude" style={labelStyle}>
                  Longitude
                </label>
                <input
                  id="longitude"
                  type="text"
                  value={longitude}
                  onChange={(e) => setLongitude(e.target.value)}
                  placeholder="Longitude"
                  style={inputStyle}
                />
                <p style={helperTextStyle}>
                  Enter the longitude in decimal degrees (e.g, 0.24425)
                </p>

                <p style={{ ...labelStyle, marginBottom: "5px" }}>
                  Confirmation
                </p>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "10px",
                  }}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => setIsChecked(!isChecked)}
                    id="checkBox"
                    style={{ marginRight: "10px" }}
                  />
                  <label htmlFor="checkBox">
                    I confirm the information is correct
                  </label>
                </div>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", maxWidth: "100px" }}>
                    <button
                      type="submit"
                      style={buttonStyle}
                      disabled={!isChecked}
                    >
                      Update
                    </button>
                  </div>
                </div>
              </form>
            </div>

            {/* New Search and Table Section */}
            <div style={{ ...formContainerStyle, marginTop: "20px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <h2 style={{ textAlign: "left", marginBottom: "20px" }}>
                  United Kingdom
                </h2>
                <div style={{ width: "100%", maxWidth: "100px" }}>
                  <button
                    type="submit"
                    style={buttonStyle}
                    disabled={!isChecked}
                  >
                    Add City
                  </button>
                </div>
              </div>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search cities"
                style={{ ...inputStyle, marginBottom: "20px", width: "97%" }}
              />

              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>City Name</TableCell>
                      <TableCell>Latitude</TableCell>
                      <TableCell>Longitude</TableCell>
                      <TableCell>Settings</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredCities.map((city) => (
                      <TableRow key={city.name}>
                        <TableCell>{city.name}</TableCell>
                        <TableCell>{city.latitude}</TableCell>
                        <TableCell>{city.longitude}</TableCell>
                        <TableCell>
                          <button style={settingsButtonStyle}>
                            <SettingsIcon />
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const formContainerStyle = {
  width: "100%",
  maxWidth: "700px",
  padding: "10px 20px 10px 20px",
  boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
  borderRadius: "8px",
  backgroundColor: "white",
};

const labelStyle = {
  fontWeight: "bold",
  marginBottom: "5px",
  marginTop: "10px",
};

const inputStyle = {
  padding: "10px",
  margin: "5px 0",
  borderRadius: "5px",
  border: "1px solid #ccc",
  outline: "none",
  ":focus": {
    boxShadow: "0 0 0 2px rgba(255, 140, 0, 0.5)",
  },
};

const helperTextStyle = {
  fontSize: "0.8em",
  color: "#666",
  marginTop: "2px",
};

const buttonStyle = {
  padding: "10px 20px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#FF8C00",
  color: "white",
  cursor: "pointer",
  minWidth: "100px",
  maxWidth: "200px",
  width: "100%",
};

const settingsButtonStyle = {
  padding: "5px 10px",
  borderRadius: "5px",
  border: "none",
  backgroundColor: "#FF8C00",
  color: "white",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "0.8em",
};

export default Dashboard;
