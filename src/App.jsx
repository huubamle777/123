import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';

export default function App() {
  return (
    <Routes>
      {/* 1. Link gốc (/) sẽ tự động chuyển hướng sang /live */}
      <Route path="/" element={<Navigate to="/live" replace />} />
      
      {/* 2. Trang giới thiệu tĩnh */}
      <Route path="/live" element={<Home />} />
      
      {/* 3. Trang nhập thông tin (Form) */}
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}
