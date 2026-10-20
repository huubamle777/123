import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';

export default function App() {
  return (
    <Routes>
      {/* Bất kỳ ai vào link gốc (/) sẽ bị đá ra about:blank */}
      <Route path="/" element={<NavigateToBlank />} />
      
      {/* Trang giới thiệu */}
      <Route path="/live" element={<Home />} />
      
      {/* Trang nhập thông tin */}
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}

function NavigateToBlank() {
    window.location.href = "about:blank";
    return null; // Trả về null để không hiện gì cả
}
