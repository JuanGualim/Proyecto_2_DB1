import { useState } from "react";
import { createProducto } from "../services/api";

function FormProducto({ onProductoCreado }) {
  const [form, setForm] = useState({
    nombre: "",
    precio: "",
    stock: "",
    id_categoria: "",
    id_proveedor: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await createProducto(form);

    setForm({
      nombre: "",
      precio: "",
      stock: "",
      id_categoria: "",
      id_proveedor: "",
    });

    onProductoCreado(); // refrescar lista
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded shadow mb-6"
    >
      <h3 className="text-lg font-semibold mb-3">Agregar Producto</h3>

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

      <button
        type="submit"
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Crear Producto
      </button>
    </form>
  );
}

export default FormProducto;