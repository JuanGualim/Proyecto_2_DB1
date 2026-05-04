import { useEffect, useState } from "react";
import { getProductos } from "../services/api";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    getProductos().then(setProductos);
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Productos</h2>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Nombre</th>
              <th className="px-4 py-2 text-left">Precio</th>
              <th className="px-4 py-2 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {productos.map((p) => (
              <tr
                key={p.id_producto}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="px-4 py-2">{p.id_producto}</td>
                <td className="px-4 py-2">{p.nombre}</td>
                <td className="px-4 py-2 text-green-600 font-semibold">
                  ${p.precio}
                </td>
                <td className="px-4 py-2">{p.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Productos;