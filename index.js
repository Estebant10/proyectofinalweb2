require('dotenv').config();  // Cargar las variables de entorno desde el archivo .env
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');  // Importar el módulo cors
const { Pool } = require('pg');  // Importar el módulo pg

const app = express();
const port = process.env.PORT || 3000;

// Configurar la conexión a la base de datos
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
  } else {
    console.log('Connected to the database');
  }
});

// Middlewares
app.use(bodyParser.json());
app.use(express.json()); 
app.use(cors());  // Habilitar CORS

// Importar rutas
const concesionarioRoutes = require('./routes/concesionario');
const vehiculoRoutes = require('./routes/vehiculo');
const insumoRoutes = require('./routes/insumo');
const almacenRoutes = require('./routes/almacen');
const empleadoRoutes = require('./routes/empleado');
const clienteRoutes = require('./routes/cliente');
const compraRoutes = require('./routes/compra');
const detalleVentaRoutes = require('./routes/detalleVenta');

// Usar rutas
app.use('/api/concesionarios', concesionarioRoutes);
app.use('/api/vehiculos', vehiculoRoutes);
app.use('/api/insumos', insumoRoutes);
app.use('/api/almacenes', almacenRoutes);
app.use('/api/empleados', empleadoRoutes);
app.use('/api/clientes', clienteRoutes);
app.use('/api/compras', compraRoutes);
app.use('/api/detalles_venta', detalleVentaRoutes);

// Sincronizar base de datos y arrancar servidor
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = pool;
