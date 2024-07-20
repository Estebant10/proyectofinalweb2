const express = require('express');
const router = express.Router();

// Helper function to handle queries
const queryDatabase = async (query, params = []) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query, params);
        return result.rows;
    } finally {
        client.release();
    }
};

// Rutas para Concesionarios
router.get('/concesionarios', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM concesionario');
    res.json(result);
});

router.post('/concesionarios', async (req, res) => {
    const { nombre, direccion } = req.body;
    await queryDatabase('INSERT INTO concesionario (nombre, direccion) VALUES ($1, $2)', [nombre, direccion]);
    res.status(201).send('Concesionario creado');
});

router.get('/concesionarios/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM concesionario WHERE id_concesionario = $1', [id]);
    res.json(result[0]);
});

router.put('/concesionarios/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion } = req.body;
    await queryDatabase('UPDATE concesionario SET nombre = $1, direccion = $2 WHERE id_concesionario = $3', [nombre, direccion, id]);
    res.send('Concesionario actualizado');
});

router.delete('/concesionarios/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM concesionario WHERE id_concesionario = $1', [id]);
    res.send('Concesionario eliminado');
});

// Rutas para Vehículos
router.get('/vehiculos', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM vehiculo');
    res.json(result);
});

router.post('/vehiculos', async (req, res) => {
    const { marca, modelo, año, precio, id_concesionario } = req.body;
    await queryDatabase('INSERT INTO vehiculo (marca, modelo, año, precio, id_concesionario) VALUES ($1, $2, $3, $4, $5)', [marca, modelo, año, precio, id_concesionario]);
    res.status(201).send('Vehículo creado');
});

router.get('/vehiculos/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM vehiculo WHERE id_vehiculo = $1', [id]);
    res.json(result[0]);
});

router.put('/vehiculos/:id', async (req, res) => {
    const { id } = req.params;
    const { marca, modelo, año, precio, id_concesionario } = req.body;
    await queryDatabase('UPDATE vehiculo SET marca = $1, modelo = $2, año = $3, precio = $4, id_concesionario = $5 WHERE id_vehiculo = $6', [marca, modelo, año, precio, id_concesionario, id]);
    res.send('Vehículo actualizado');
});

router.delete('/vehiculos/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM vehiculo WHERE id_vehiculo = $1', [id]);
    res.send('Vehículo eliminado');
});

// Rutas para Insumos
router.get('/insumos', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM insumo');
    res.json(result);
});

router.post('/insumos', async (req, res) => {
    const { nombre, descripcion, precio, id_almacen } = req.body;
    await queryDatabase('INSERT INTO insumo (nombre, descripcion, precio, id_almacen) VALUES ($1, $2, $3, $4)', [nombre, descripcion, precio, id_almacen]);
    res.status(201).send('Insumo creado');
});

router.get('/insumos/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM insumo WHERE id_insumo = $1', [id]);
    res.json(result[0]);
});

router.put('/insumos/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, descripcion, precio, id_almacen } = req.body;
    await queryDatabase('UPDATE insumo SET nombre = $1, descripcion = $2, precio = $3, id_almacen = $4 WHERE id_insumo = $5', [nombre, descripcion, precio, id_almacen, id]);
    res.send('Insumo actualizado');
});

router.delete('/insumos/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM insumo WHERE id_insumo = $1', [id]);
    res.send('Insumo eliminado');
});

// Rutas para Almacenes
router.get('/almacenes', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM almacen');
    res.json(result);
});

router.post('/almacenes', async (req, res) => {
    const { nombre, ubicacion } = req.body;
    await queryDatabase('INSERT INTO almacen (nombre, ubicacion) VALUES ($1, $2)', [nombre, ubicacion]);
    res.status(201).send('Almacén creado');
});

router.get('/almacenes/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM almacen WHERE id_almacen = $1', [id]);
    res.json(result[0]);
});

router.put('/almacenes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, ubicacion } = req.body;
    await queryDatabase('UPDATE almacen SET nombre = $1, ubicacion = $2 WHERE id_almacen = $3', [nombre, ubicacion, id]);
    res.send('Almacén actualizado');
});

router.delete('/almacenes/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM almacen WHERE id_almacen = $1', [id]);
    res.send('Almacén eliminado');
});

// Rutas para Empleados
router.get('/empleados', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM empleado');
    res.json(result);
});

router.post('/empleados', async (req, res) => {
    const { nombre, cargo, salario, id_concesionario } = req.body;
    await queryDatabase('INSERT INTO empleado (nombre, cargo, salario, id_concesionario) VALUES ($1, $2, $3, $4)', [nombre, cargo, salario, id_concesionario]);
    res.status(201).send('Empleado creado');
});

router.get('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM empleado WHERE id_empleado = $1', [id]);
    res.json(result[0]);
});

router.put('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, cargo, salario, id_concesionario } = req.body;
    await queryDatabase('UPDATE empleado SET nombre = $1, cargo = $2, salario = $3, id_concesionario = $4 WHERE id_empleado = $5', [nombre, cargo, salario, id_concesionario, id]);
    res.send('Empleado actualizado');
});

router.delete('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM empleado WHERE id_empleado = $1', [id]);
    res.send('Empleado eliminado');
});

// Rutas para Clientes
router.get('/clientes', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM cliente');
    res.json(result);
});

router.post('/clientes', async (req, res) => {
    const { nombre, direccion, id_concesionario } = req.body;
    await queryDatabase('INSERT INTO cliente (nombre, direccion, id_concesionario) VALUES ($1, $2, $3)', [nombre, direccion, id_concesionario]);
    res.status(201).send('Cliente creado');
});

router.get('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM cliente WHERE id_cliente = $1', [id]);
    res.json(result[0]);
});

router.put('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    const { nombre, direccion, id_concesionario } = req.body;
    await queryDatabase('UPDATE cliente SET nombre = $1, direccion = $2, id_concesionario = $3 WHERE id_cliente = $4', [nombre, direccion, id_concesionario, id]);
    res.send('Cliente actualizado');
});

router.delete('/clientes/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM cliente WHERE id_cliente = $1', [id]);
    res.send('Cliente eliminado');
});

// Rutas para Compras
router.get('/compras', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM compra');
    res.json(result);
});

router.post('/compras', async (req, res) => {
    const { fecha, id_cliente, id_empleado, precio_total } = req.body;
    await queryDatabase('INSERT INTO compra (fecha, id_cliente, id_empleado, precio_total) VALUES ($1, $2, $3, $4)', [fecha, id_cliente, id_empleado, precio_total]);
    res.status(201).send('Compra registrada');
});

router.get('/compras/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM compra WHERE id_compra = $1', [id]);
    res.json(result[0]);
});

router.put('/compras/:id', async (req, res) => {
    const { id } = req.params;
    const { fecha, id_cliente, id_empleado, precio_total } = req.body;
    await queryDatabase('UPDATE compra SET fecha = $1, id_cliente = $2, id_empleado = $3, precio_total = $4 WHERE id_compra = $5', [fecha, id_cliente, id_empleado, precio_total, id]);
    res.send('Compra actualizada');
});

router.delete('/compras/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM compra WHERE id_compra = $1', [id]);
    res.send('Compra eliminada');
});

// Rutas para Detalles de Venta
router.get('/detalles-venta', async (req, res) => {
    const result = await queryDatabase('SELECT * FROM detalle_venta');
    res.json(result);
});

router.post('/detalles-venta', async (req, res) => {
    const { id_compra, id_producto, cantidad, precio_unitario, precio_total } = req.body;
    await queryDatabase('INSERT INTO detalle_venta (id_compra, id_producto, cantidad, precio_unitario, precio_total) VALUES ($1, $2, $3, $4, $5)', [id_compra, id_producto, cantidad, precio_unitario, precio_total]);
    res.status(201).send('Detalle de venta creado');
});

router.get('/detalles-venta/:id', async (req, res) => {
    const { id } = req.params;
    const result = await queryDatabase('SELECT * FROM detalle_venta WHERE id_detalleventa = $1', [id]);
    res.json(result[0]);
});

router.put('/detalles-venta/:id', async (req, res) => {
    const { id } = req.params;
    const { id_compra, id_producto, cantidad, precio_unitario, precio_total } = req.body;
    await queryDatabase('UPDATE detalle_venta SET id_compra = $1, id_producto = $2, cantidad = $3, precio_unitario = $4, precio_total = $5 WHERE id_detalleventa = $6', [id_compra, id_producto, cantidad, precio_unitario, precio_total, id]);
    res.send('Detalle de venta actualizado');
});

router.delete('/detalles-venta/:id', async (req, res) => {
    const { id } = req.params;
    await queryDatabase('DELETE FROM detalle_venta WHERE id_detalleventa = $1', [id]);
    res.send('Detalle de venta eliminado');
});

module.exports = router;
