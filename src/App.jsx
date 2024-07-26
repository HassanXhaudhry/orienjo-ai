import React from 'react';
import "./App.css";
import './index.css';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Dashboard from './Dashboard';
import Country from './components/Country';
import Sidebar from './components/Sidebar';
import Login from './components/Login';

const App = () => {
  const location = useLocation();
  const showSidebar = location.pathname !== "/login";

  return (
    <div style={{ 
      display: 'flex', 
      height: '100vh', 
      width: '100vw', 
      overflow: 'hidden' 
    }}>
      {showSidebar && <Sidebar />}
      <div style={{ 
        flexGrow: 1, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor:'#F3F3F3'
      }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/country" element={<Country />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;
