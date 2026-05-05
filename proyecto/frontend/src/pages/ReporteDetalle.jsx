import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getReporteVentas,
  getClientesTop,
  getProductosPopulares,
  getProductosVendidos,
  getReporteClientes,
  getReporteProductos,
  getClientesElite,
} from "../services/api";

function ReporteDetalle() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
     if (tipo === "ventas") getReporteVentas().then(setData);
    else if (tipo === "clientes") getClientesTop().then(setData);
    else if (tipo === "productos") getProductosPopulares().then(setData);  
    else if (tipo === "vendidos") getProductosVendidos().then(setData);
    else if (tipo === "reporte-clientes") getReporteClientes().then(setData);
    else if (tipo === "reporte-productos") getReporteProductos().then(setData);
    else if (tipo === "elite") getClientesElite().then(setData);
  }, [tipo]);

  return (
    <div className="space-y-6">

      {/* BOTÓN */}
      <button
        onClick={() => navigate("/reportes")}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        ← Volver
      </button>

      {/* TÍTULO */}
      <h2 className="text-2xl font-bold capitalize">
        {tipo === "ventas" && "Reporte de Ventas"}
        {tipo === "clientes" && "Clientes Top"}
        {tipo === "productos" && "Productos Populares"}
      </h2>

      {/* CONTENIDO */}
      <div className="bg-white p-6 rounded-lg shadow-md">

        {/* 🛒 VENTAS */}
        {tipo === "ventas" && (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-center">Cliente</th>
                <th className="p-2 text-center">Producto</th>
                <th className="p-2 text-center">Subtotal</th>
              </tr>
            </thead>

            <tbody>
              {data.map((v, i) => (
                <tr key={i} className="border-t text-center hover:bg-gray-50">
                  <td className="p-2">{v.cliente}</td>
                  <td className="p-2">{v.producto}</td>
                  <td className="p-2 text-green-600 font-semibold">
                    ${v.subtotal}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* CLIENTES */}
        {tipo === "clientes" && (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-center">Cliente</th>
                <th className="p-2 text-center">Compras</th>
              </tr>
            </thead>

            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-t text-center hover:bg-gray-50">
                  <td className="p-2">{c.nombre}</td>
                  <td className="p-2 font-semibold">{c.total_compras}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* PRODUCTOS */}
        {tipo === "productos" && (
          <table className="min-w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2 text-center">Producto</th>
                <th className="p-2 text-center">Vendidos</th>
              </tr>
            </thead>

            <tbody>
              {data.map((p, i) => (
                <tr key={i} className="border-t text-center hover:bg-gray-50">
                  <td className="p-2">{p.producto}</td>
                  <td className="p-2 font-semibold text-blue-600">
                    {p.total_vendido}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tipo === "vendidos" && (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Precio</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-2">{p.nombre}</td>
                  <td className="p-2 text-green-600">${p.precio}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tipo === "reporte-clientes" && (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Compras</th>
                <th className="p-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-2">{c.cliente}</td>
                  <td className="p-2">{c.cantidad_compras}</td>
                  <td className="p-2 text-green-600">${c.total_gastado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tipo === "reporte-productos" && (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Producto</th>
                <th className="p-2">Vendidos</th>
                <th className="p-2">Ingresos</th>
              </tr>
            </thead>
            <tbody>
              {data.map((p, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-2">{p.producto}</td>
                  <td className="p-2">{p.total_vendido}</td>
                  <td className="p-2 text-green-600">${p.ingresos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {tipo === "elite" && (
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-2">Cliente</th>
                <th className="p-2">Total Gastado</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c, i) => (
                <tr key={i} className="border-t text-center">
                  <td className="p-2">{c.nombre}</td>
                  <td className="p-2 text-blue-600">${c.total_gastado}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

      </div>
    </div>
  );
}

export default ReporteDetalle;