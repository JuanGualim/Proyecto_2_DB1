import { BrowserRouter, Routes, Route } from "react-router-dom";
import Productos from "./pages/Productos";
import Reportes from "./pages/Reportes";
import ReporteDetalle from "./pages/ReporteDetalle";

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-blue-600 mb-6">
          Proyecto Tienda
        </h1>

        <Routes>
          <Route path="/" element={<Productos />} />
          <Route path="/reportes" element={<Reportes />} />
          <Route path="/reportes/:tipo" element={<ReporteDetalle />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;