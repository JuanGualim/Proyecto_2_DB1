import { useState, useEffect } from "react";
import { createProducto, updateProducto } from "../services/api";

function FormProducto({ onProductoCreado, productoEditar, setProductoEditar }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_proveedor: "",
  });

  // 🔥 Cargar datos cuando se edita
  useEffect(() => {
    if (productoEditar) {
      setForm(productoEditar);
    }
  }, [productoEditar]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (productoEditar) {
      await updateProducto(productoEditar.id_producto, form);
      setProductoEditar(null);
    } else {
      await createProducto(form);
    }

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      id_categoria: "",
      id_proveedor: "",
    });

    onProductoCreado();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6">
      <h3 className="text-lg font-semibold mb-3">
        {productoEditar ? "Editar Producto" : "Agregar Producto"}
      </h3>

      <div className="grid grid-cols-2 gap-3">
        <input
          name="nombre"
          placeholder="Nombre"
          value={form.nombre}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="precio"
          placeholder="Precio"
          value={form.precio}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="stock"
          placeholder="Stock"
          value={form.stock}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="id_categoria"
          placeholder="ID Categoría"
          value={form.id_categoria}
          onChange={handleChange}
          className="border p-2 rounded"
        />

        <input
          name="id_proveedor"
          placeholder="ID Proveedor"
          value={form.id_proveedor}
          onChange={handleChange}
          className="border p-2 rounded"
        />
      </div>

      <div className="flex gap-3 mt-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          {productoEditar ? "Actualizar Producto" : "Crear Producto"}
        </button>

        {productoEditar && (
          <button
            type="button"
            onClick={() => setProductoEditar(null)}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
}

export default FormProducto;