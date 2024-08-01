import React, { Fragment, useState, useEffect } from "react";
import "./App.css";
import rawData from "./assets/data.json";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const Dashboard = () => {
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [allCountryData, setAllCountryData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [openPopup, setOpenPopup] = useState(false);
  const [newEntry, setNewEntry] = useState({
    country_name: "",
    region: "",
    placename: "",
    description: "",
    main_island: "",
    images: [],
  });

  useEffect(() => {
    const flattenedData = Object.entries(rawData).flatMap(
      ([countryName, locations]) =>
        locations.map((location) => ({
          ...location,
          country_name: countryName,
        }))
    );
    setAllCountryData(flattenedData);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (country.trim() === "" && region.trim() === "") {
      setDisplayedData([]);
    } else {
      const filteredData = allCountryData.filter(
        (item) =>
          item.country_name.toLowerCase().includes(country.toLowerCase()) &&
          item.region.toLowerCase().includes(region.toLowerCase())
      );
      setDisplayedData(filteredData);
    }
  };

  useEffect(() => {
    const filteredResults = displayedData.filter((location) =>
      location.country_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setDisplayedData(filteredResults);
  }, [searchTerm]);

  const handleOpenPopup = () => setOpenPopup(true);
  const handleClosePopup = () => setOpenPopup(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEntry((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => URL.createObjectURL(file));
    setNewEntry((prevState) => ({
      ...prevState,
      images: [...prevState.images, ...newImages],
    }));
  };

  const handleDeleteImage = (index) => {
    setNewEntry((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, i) => i !== index),
    }));
  };

  const handleAddEntry = () => {
    const {
      country_name,
      region,
      placename,
      description,
      main_island,
      images,
    } = newEntry;

    if (
      country_name &&
      region &&
      placename &&
      description &&
      main_island &&
      images.length > 0
    ) {
      setDisplayedData((prevData) => [...prevData, newEntry]);
      setAllCountryData((prevData) => [...prevData, newEntry]);
      setNewEntry({
        country_name: "",
        region: "",
        placename: "",
        description: "",
        main_island: "",
        images: [],
      });
      handleClosePopup();
    } else {
      Swal.fire({
        text: "All fields must be filled out before adding a new place.",
        icon: "warning",
        confirmButtonText: "Okay",
      });
    }
  };

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
            <Link to="/login" style={{ textDecoration: "none" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0px 30px",
                  cursor: "pointer",
                  color: "gray",
                }}
              >
                <span className="px-2 py-2 text-md font-Manrope">Login</span>
                <PersonIcon />
              </div>
            </Link>
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
              <h2
                className="text-xl font-Inter font-semibold pt-2"
                style={{ textAlign: "left", marginBottom: "20px" }}
              >
                Search Country
              </h2>
              <form
                onSubmit={handleSearch}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <label
                  className="font-Manrope"
                  htmlFor="country"
                  style={labelStyle}
                >
                  Country Name
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  placeholder="Country"
                  style={inputStyle}
                />
                <p style={helperTextStyle}>
                  Enter the full name of the country
                </p>

                <label htmlFor="region" style={labelStyle}>
                  Region
                </label>
                <input
                  id="region"
                  type="text"
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                  placeholder="Region"
                  style={inputStyle}
                />
                <p style={helperTextStyle}>Enter the geo region</p>
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  <div style={{ width: "100%", maxWidth: "100px" }}>
                    <button type="submit" style={buttonStyle}>
                      Search
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
                <h2
                  className="text-xl font-Inter font-semibold pt-2"
                  style={{ textAlign: "left", marginBottom: "20px" }}
                >
                  Add Country
                </h2>
                <div style={{ width: "100%", maxWidth: "100px" }}>
                  <button
                    type="submit"
                    onClick={handleOpenPopup}
                    style={buttonStyle}
                  >
                    Add
                  </button>
                </div>
              </div>
              {displayedData.length > 0 && (
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter results"
                  style={{ ...inputStyle, marginBottom: "20px", width: "97%" }}
                />
              )}

              {displayedData.length > 0 ? (
                <TableContainer component={Paper}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Country Name</TableCell>
                        <TableCell>Region</TableCell>
                        <TableCell>Place Name</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Main Island</TableCell>
                        <TableCell>Images</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {displayedData.map((location, index) => (
                        <TableRow key={index}>
                          <TableCell>{location.country_name}</TableCell>
                          <TableCell>{location.region}</TableCell>
                          <TableCell>{location.placename}</TableCell>
                          <TableCell>{location.description}</TableCell>
                          <TableCell>{location.main_island}</TableCell>
                          <TableCell>
  {location.images.length > 0 && (
    <div className="image-container">
      <img 
        src={location.images[0]} 
        alt={`Place 0`} 
        style={{ width: '50px', height: '50px' }} 
      />
      {location.images.length > 1 && (
        <div className="image-popup">
          {location.images.map((image, idx) => (
            <img key={idx} src={image} alt={`Place ${idx}`} style={{ width: '100px', height: '100px', margin: '5px' }} />
          ))}
        </div>
      )}
    </div>
  )}
</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <p className="font-Manrope text-sm">
                  No country to display. Please perform a search or add country.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
      <Dialog open={openPopup} onClose={handleClosePopup}>
        <DialogTitle className="text-xl font-Inter font-semibold pt-2">
          Add New Place
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="country_name"
            label="Country Name"
            type="text"
            fullWidth
            value={newEntry.country_name}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="region"
            label="Region"
            type="text"
            fullWidth
            value={newEntry.region}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="placename"
            label="Place Name"
            type="text"
            fullWidth
            value={newEntry.placename}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="description"
            label="Description"
            type="text"
            fullWidth
            value={newEntry.description}
            onChange={handleInputChange}
          />
          <TextField
            margin="dense"
            name="main_island"
            label="Main Island"
            type="text"
            fullWidth
            value={newEntry.main_island}
            onChange={handleInputChange}
          />
          <input
            accept="image/*"
            style={{ display: "none" }}
            id="image-upload"
            type="file"
            multiple
            onChange={handleImageUpload}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              style={{ marginTop: "10px", marginBottom: "10px" }}
            >
              Upload Images
            </Button>
          </label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {newEntry.images.map((image, index) => (
              <div
                key={index}
                style={{ position: "relative", display: "inline-block" }}
              >
                <img
                  src={image}
                  alt={`Upload ${index}`}
                  style={{ width: "100px", height: "100px" }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="small"
                  onClick={() => handleDeleteImage(index)}
                  style={{ position: "absolute", top: "5px", right: "5px" }}
                >
                  Delete
                </Button>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions style={{ padding: "20px 20px" }}>
          <Button onClick={handleClosePopup} style={buttonStyle}>
            Cancel
          </Button>
          <Button onClick={handleAddEntry} style={buttonStyle}>
            Add
          </Button>
        </DialogActions>
      </Dialog>
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
  maxWidth: "100px",
  width: "100%",
};

export default Dashboard;
