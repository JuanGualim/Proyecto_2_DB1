import { useEffect, useState } from "react";
import { getProductos } from "../services/api";
import FormProducto from "../components/FormProducto";

function Productos() {
  const [productos, setProductos] = useState([]);

  const cargarProductos = () => {
    getProductos().then(setProductos);
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <FormProducto onProductoCreado={cargarProductos} />

        <h2 className="text-2xl font-semibold mb-4">Productos</h2>

        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden shadow-sm">
            <thead className="bg-gray-100">
                <tr>
                <th className="px-4 py-2 text-center">ID</th>
                <th className="px-4 py-2 text-center">Nombre</th>
                <th className="px-4 py-2 text-center">Precio</th>
                <th className="px-4 py-2 text-center">Stock</th>
                </tr>
            </thead>

            <tbody>
                {productos.map((p) => (
                <tr
                    key={p.id_producto}
                    className="border-t hover:bg-gray-50 transition text-center"
                >
                    <td className="px-4 py-2">{p.id_producto}</td>

                    <td className="px-4 py-2 font-medium">
                    {p.nombre}
                    </td>

                    <td className="px-4 py-2 text-green-600 font-semibold">
                    ${p.precio}
                    </td>

                    <td className="px-4 py-2">{p.stock}</td>
                </tr>
                ))}
            </tbody>
        </table>
    </div>
  );
}

export default Productos;