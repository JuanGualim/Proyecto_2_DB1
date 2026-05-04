import { useNavigate } from "react-router-dom";

function Reportes() {
  const navigate = useNavigate();

  const cards = [
    { titulo: "Reporte de Ventas", ruta: "ventas" },
    { titulo: "Clientes Top", ruta: "clientes" },
    { titulo: "Productos Populares", ruta: "productos" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Reportes</h2>
        <button
            onClick={() => navigate("/")}
            className="mb-4 bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
            >
            ← Volver
        </button>        

      <div className="grid grid-cols-3 gap-4">
        {cards.map((c) => (
          <div
            key={c.ruta}
            onClick={() => navigate(`/reportes/${c.ruta}`)}
            className="bg-white p-6 rounded-lg shadow hover:shadow-lg cursor-pointer transition"
          >
            <h3 className="text-lg font-semibold">{c.titulo}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Reportes;