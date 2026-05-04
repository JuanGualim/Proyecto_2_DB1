import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  getReporteVentas,
  getClientesTop,
  getProductosPopulares,
} from "../services/api";

function ReporteDetalle() {
  const { tipo } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (tipo === "ventas") {
      getReporteVentas().then(setData);
    } else if (tipo === "clientes") {
      getClientesTop().then(setData);
    } else if (tipo === "productos") {
      getProductosPopulares().then(setData);
    }
  }, [tipo]);

  return (
    <div>
      <button
        onClick={() => navigate("/reportes")}
        className="mb-4 bg-gray-500 text-white px-3 py-1 rounded"
      >
        ← Volver
      </button>

      <h2 className="text-2xl font-bold mb-4 capitalize">
        {tipo}
      </h2>

      <div className="bg-white p-4 rounded shadow">
        {tipo === "ventas" &&
          data.map((v, i) => (
            <p key={i}>
              {v.cliente} compró {v.producto} (${v.subtotal})
            </p>
          ))}

        {tipo === "clientes" &&
          data.map((c, i) => (
            <p key={i}>
              {c.nombre} - {c.total_compras} compras
            </p>
          ))}

        {tipo === "productos" &&
          data.map((p, i) => (
            <p key={i}>
              {p.producto} - {p.total_vendido} vendidos
            </p>
          ))}
      </div>
    </div>
  );
}

export default ReporteDetalle;