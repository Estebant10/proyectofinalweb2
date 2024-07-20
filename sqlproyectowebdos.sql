-- Creación de la tabla `concesionario`
CREATE TABLE concesionario (
    id_concesionario SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    direccion VARCHAR(50)
);

-- Creación de la tabla `vehiculo`
CREATE TABLE vehiculo (
    id_vehiculo SERIAL PRIMARY KEY,
    marca VARCHAR(50),
    modelo VARCHAR(50),
    año INT,
    precio DECIMAL(30, 2),
    id_concesionario INT,
    FOREIGN KEY (id_concesionario) REFERENCES concesionario(id_concesionario)
);

-- Creación de la tabla `almacen`
CREATE TABLE almacen (
    id_almacen SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    ubicacion VARCHAR(50)
);

-- Creación de la tabla `insumo`
CREATE TABLE insumo (
    id_insumo SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    descripcion TEXT,
    precio DECIMAL(30, 2),
    id_almacen INT,
    FOREIGN KEY (id_almacen) REFERENCES almacen(id_almacen)
);

-- Creación de la tabla `empleado`
CREATE TABLE empleado (
    id_empleado SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    cargo VARCHAR(50),
    salario DECIMAL(30, 2),
    id_concesionario INT,
    FOREIGN KEY (id_concesionario) REFERENCES concesionario(id_concesionario)
);

-- Creación de la tabla `cliente`
CREATE TABLE cliente (
    id_cliente SERIAL PRIMARY KEY,
    nombre VARCHAR(50),
    direccion VARCHAR(50),
    id_concesionario INT,
    FOREIGN KEY (id_concesionario) REFERENCES concesionario(id_concesionario)
);

-- Creación de la tabla `compra`
CREATE TABLE compra (
    id_compra SERIAL PRIMARY KEY,
    fecha DATE,
    id_cliente INT,
    id_empleado INT,
    precio_total DECIMAL(30, 2),
    FOREIGN KEY (id_cliente) REFERENCES cliente(id_cliente),
    FOREIGN KEY (id_empleado) REFERENCES empleado(id_empleado)
);

-- Creación de la tabla `detalle_venta`
CREATE TABLE detalle_venta (
    id_detalleventa SERIAL PRIMARY KEY,
    id_compra INT,
    id_producto INT,
    cantidad INT,
    precio_unitario DECIMAL(10, 2),
    precio_total DECIMAL(30, 2),
    FOREIGN KEY (id_compra) REFERENCES compra(id_compra)
);

-- Insertar datos de ejemplo en `concesionario`
INSERT INTO concesionario (nombre, direccion) VALUES
('Concesionario A', '123 Calle Principal'),
('Concesionario B', '456 Avenida Secundaria'),
('Concesionario C', '789 Calle Tercera'),
('Concesionario D', '101 Calle Cuarta'),
('Concesionario E', '202 Calle Quinta');

-- Insertar datos de ejemplo en `almacen`
INSERT INTO almacen (nombre, ubicacion) VALUES
('Almacén Central', 'Calle 1, Sector A'),
('Almacén Norte', 'Calle 2, Sector B'),
('Almacén Sur', 'Calle 3, Sector C'),
('Almacén Este', 'Calle 4, Sector D'),
('Almacén Oeste', 'Calle 5, Sector E');

-- Insertar datos de ejemplo en `vehiculo`
INSERT INTO vehiculo (marca, modelo, año, precio, id_concesionario) VALUES
('Toyota', 'Corolla', 2024, 20000.00, 1),
('Honda', 'Civic', 2023, 22000.00, 1),
('Ford', 'Focus', 2022, 18000.00, 2),
('Chevrolet', 'Cruze', 2021, 17000.00, 3),
('Mazda', '3', 2020, 19000.00, 4);

-- Insertar datos de ejemplo en `insumo`
INSERT INTO insumo (nombre, descripcion, precio, id_almacen) VALUES
('Aceite Motor', 'Aceite para motor de 1 litro', 15.00, 1),
('Filtro de Aire', 'Filtro de aire para vehículos', 25.00, 2),
('Batería', 'Batería de automóvil de 12V', 100.00, 3),
('Pastillas de Freno', 'Pastillas de freno para vehículos', 50.00, 4),
('Amortiguador', 'Amortiguador para suspensión', 75.00, 5);

-- Insertar datos de ejemplo en `empleado`
INSERT INTO empleado (nombre, cargo, salario, id_concesionario) VALUES
('Juan Pérez', 'Vendedor', 3000.00, 1),
('Ana Gómez', 'Mecánico', 3200.00, 2),
('Luis Martínez', 'Administrador', 3500.00, 3),
('María Fernández', 'Asesor de Ventas', 3300.00, 4),
('Carlos López', 'Recepcionista', 2800.00, 5);

-- Insertar datos de ejemplo en `cliente`
INSERT INTO cliente (nombre, direccion, id_concesionario) VALUES
('Carlos López', '789 Calle Tercera', 1),
('María Fernández', '321 Calle Cuarta', 2),
('Luis Rodríguez', '654 Calle Sexta', 3),
('Patricia Sánchez', '987 Calle Séptima', 4),
('Pedro Álvarez', '741 Calle Octava', 5);

-- Insertar datos de ejemplo en `compra`
INSERT INTO compra (fecha, id_cliente, id_empleado, precio_total) VALUES
('2024-07-20', 1, 1, 40000.00),
('2024-07-21', 2, 2, 35000.00),
('2024-07-22', 3, 3, 32000.00),
('2024-07-23', 4, 4, 31000.00),
('2024-07-24', 5, 5, 33000.00);

-- Insertar datos de ejemplo en `detalle_venta`
INSERT INTO detalle_venta (id_compra, id_producto, cantidad, precio_unitario, precio_total) VALUES
(1, 1, 2, 20000.00, 40000.00),  -- Compra de 2 vehículos
(2, 2, 1, 22000.00, 22000.00),  -- Compra de 1 vehículo
(3, 3, 1, 18000.00, 18000.00),  -- Compra de 1 vehículo
(4, 4, 1, 17000.00, 17000.00),  -- Compra de 1 vehículo
(5, 5, 1, 19000.00, 19000.00);  -- Compra de 1 vehículo