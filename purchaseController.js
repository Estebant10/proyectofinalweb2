const pool = require('./index.js');

// Función para registrar una compra
const getCompras = async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM compras');
      res.status(200).json(result.rows);
    } catch (error) {
      console.error('Error executing query', error);
      res.status(500).json({ error: 'Error retrieving data' });
    }
  };
  
  module.exports = { getCompras };