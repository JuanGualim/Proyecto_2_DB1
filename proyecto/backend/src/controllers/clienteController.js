import * as clienteService from "../services/clienteService.js";

export const obtenerClientes = async (req, res) => {
    try {
        const clientes = await clienteService.getClientes();
        res.json(clientes);
    } catch {
        res.status(500).json({ error: "Error al obtener clientes" });
    }
};

export const obtenerCliente = async (req, res) => {
    try {
        const cliente = await clienteService.getClienteById(req.params.id);
        res.json(cliente);
    } catch {
        res.status(500).json({ error: "Error al obtener cliente" });
    }
};

export const crearCliente = async (req, res) => {
    try {
        const id = await clienteService.createCliente(req.body);
        res.json({ mensaje: "Cliente creado", id });
    } catch {
        res.status(500).json({ error: "Error al crear cliente" });
    }
};

export const actualizarCliente = async (req, res) => {
    try {
        await clienteService.updateCliente(req.params.id, req.body);
        res.json({ mensaje: "Cliente actualizado" });
    } catch {
        res.status(500).json({ error: "Error al actualizar cliente" });
    }
};

export const eliminarCliente = async (req, res) => {
    try {
        await clienteService.deleteCliente(req.params.id);
        res.json({ mensaje: "Cliente eliminado" });
    } catch {
        res.status(500).json({ error: "Error al eliminar cliente" });
    }
};