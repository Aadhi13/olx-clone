import React from "react";
import { Route, Routes } from "react-router-dom";

import Signup from './Pages/Signup';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Create from './Pages/Create';
import View from './Pages/ViewPost';
import { AuthProvider } from "./contexts/AuthContext";
import Post from './contexts/PostContext'

function App() {
  return (
    
      
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create" element={<Create />} />
            <Route path="/view" element={<View />} />
          </Routes>
        </AuthProvider>
  
    
  );
}

export default App;
