import { BrowserRouter, Routes, Route } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Productos from "./pages/Productos";
import Reportes from "./pages/Reportes";
import ReporteDetalle from "./pages/ReporteDetalle";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen" style={{ background: "#fdf6f0" }}>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/reportes/:tipo" element={<ReporteDetalle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;