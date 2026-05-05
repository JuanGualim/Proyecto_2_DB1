import { useNavigate } from "react-router-dom";

function Reportes() {
  const navigate = useNavigate();

    const cards = [
        { titulo: "Ventas", ruta: "ventas", color: "bg-blue-500" },
        { titulo: "Clientes Top", ruta: "clientes", color: "bg-green-500" },
        { titulo: "Productos Populares", ruta: "productos", color: "bg-purple-500" },
        { titulo: "Productos Vendidos", ruta: "vendidos", color: "bg-pink-500" },
        { titulo: "Reporte Clientes", ruta: "reporte-clientes", color: "bg-yellow-500" },
        { titulo: "Reporte Productos", ruta: "reporte-productos", color: "bg-indigo-500" },
        { titulo: "Clientes Elite (CTE)", ruta: "elite", color: "bg-red-500" },
    ];

    return (
    <div>
        <button
            onClick={() => navigate("/")}
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
            >
            ← Volver a Productos
        </button>
        <h2 className="text-2xl font-bold mb-6">Reportes</h2>


        <div className="grid grid-cols-3 gap-6">
            {cards.map((c) => (
                <div
                key={c.ruta}
                onClick={() => navigate(`/reportes/${c.ruta}`)}
                className={`${c.color} text-white p-6 rounded-lg shadow-lg cursor-pointer hover:scale-105 transition`}
            >
                <h3 className="text-xl font-semibold">{c.titulo}</h3>
                </div>
            ))}
        </div>
    </div>
  );
}

export default Reportes;