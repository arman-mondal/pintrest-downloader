import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './pages/home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';
import { AuthProvider } from './hooks';
import Blogs from './pages/Blogs';
import BlogDetail from './pages/BlogDetails'
function App() {
  return (
  <AuthProvider>
      <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/blogs' element={<Blogs />} />
      <Route path='/admin' element={<Admin/>} />
      <Route path='/blogs/:id' element={<BlogDetail />} />

    </Routes>
    
    </BrowserRouter>
  </AuthProvider>
  
  );
}

export default App;
