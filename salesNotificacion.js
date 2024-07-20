const sendEmail = require('./emailService');

// Función para notificar a empleados sobre una venta
const notifySale = async (saleDetails) => {
    // Lógica para notificar a los empleados...
    
    // Enviar correo al empleado
    const employeeEmail = 'empleado@concesionario.com'; // Puedes usar una lista de correos de empleados
    const subject = 'Nueva Venta Realizada';
    const text = `Hola,\n\nSe ha realizado una nueva venta.\nDetalles de la venta:\nID de Venta: ${saleDetails.saleId}\nCliente: ${saleDetails.customerName}\nVehículo: ${saleDetails.vehicleModel}\n\nSaludos,\nEl equipo del concesionario.`;

    sendEmail(employeeEmail, subject, text);
};

module.exports = { notifySale };
