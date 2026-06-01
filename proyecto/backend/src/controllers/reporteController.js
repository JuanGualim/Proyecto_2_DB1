import * as reporteService from "../services/reporteService.js";

export const obtenerReporteVentas   = async (req, res) => res.json(await reporteService.getReporteVentas());
export const getVentasJoin          = async (req, res) => res.json(await reporteService.getVentasJoin());
export const getProductosDetalle    = async (req, res) => res.json(await reporteService.getProductosDetalle());
export const getDetalleVentas       = async (req, res) => res.json(await reporteService.getDetalleVentas());
export const getProductosVendidos   = async (req, res) => res.json(await reporteService.getProductosVendidos());
export const getClientesTop         = async (req, res) => res.json(await reporteService.getClientesTop());
export const getReporteClientes     = async (req, res) => res.json(await reporteService.getReporteClientes());
export const getReporteProductos    = async (req, res) => res.json(await reporteService.getReporteProductos());
export const getProductosPopulares  = async (req, res) => res.json(await reporteService.getProductosPopulares());
export const getClientesElite       = async (req, res) => res.json(await reporteService.getClientesElite());
