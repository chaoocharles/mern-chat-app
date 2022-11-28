import { Routes, Route, Navigate } from "react-router-dom";
import Chat from "./components/Chat";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Chat />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
