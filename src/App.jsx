import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Verify from './pages/Verify';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/live" replace />} />
      <Route path="/live" element={<Home />} />
      <Route path="/verify" element={<Verify />} />
    </Routes>
  );
}
