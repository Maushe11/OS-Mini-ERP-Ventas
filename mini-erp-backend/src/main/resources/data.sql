INSERT INTO users (username, password, role, active, created_at)
VALUES ('admin', '$2a$10$TtFrGEiWScRUBIDVLp3tbeIE4TonMD7Lp4wEVTLchh4KtM/YG6G9W', 'ADMIN', true, NOW()), -- admin123
       ('juan', '$2a$10$fDIjClEmwtfMBRLWOkrYDOlmRz3Ec34pt1gFxGWUINvTpkxqDGQpe', 'USER', true, NOW()); -- juan123

INSERT INTO customers (document, name, email, phone, address)
VALUES ('71234567', 'Juan Pérez', 'juan.perez@example.com', '987654321', 'Av. Los Álamos 123, Lima'),
       ('81234567', 'María López', 'maria.lopez@example.com', '998877665', 'Jr. La Unión 456, Cusco'),
       ('91234567', 'Carlos Ramírez', 'carlos.ramirez@example.com', '976543210', 'Av. Perú 789, Arequipa'),
       ('10234567', 'Lucía Torres', 'lucia.torres@example.com', '945612378', 'Calle Sol 321, Trujillo'),
       ('11234567', 'Pedro Castillo', 'pedro.castillo@example.com', '956789123', 'Av. Primavera 987, Lima'),
       ('12234567', 'Rosa Aguirre', 'rosa.aguirre@example.com', '934567812', 'Jr. Los Cedros 654, Piura'),
       ('13234567', 'Luis Mendoza', 'luis.mendoza@example.com', '987321654', 'Av. Grau 432, Chiclayo'),
       ('14234567', 'Ana García', 'ana.garcia@example.com', '912345678', 'Calle Lima 321, Tacna'),
       ('15234567', 'Jorge Salazar', 'jorge.salazar@example.com', '923456781', 'Av. Cáceres 111, Huancayo'),
       ('16234567', 'Patricia Vega', 'patricia.vega@example.com', '934512678', 'Jr. Las Flores 202, Ica'),
       ('17234567', 'Eduardo Pacheco', 'eduardo.pacheco@example.com', '956123789', 'Av. Bolognesi 567, Lima'),
       ('18234567', 'Sandra Morales', 'sandra.morales@example.com', '976451233', 'Calle Comercio 345, Arequipa'),
       ('19234567', 'Fernando Ruiz', 'fernando.ruiz@example.com', '987654120', 'Av. Argentina 890, Lima'),
       ('20234567', 'Jessica Ramos', 'jessica.ramos@example.com', '945678321', 'Jr. Santa Rosa 432, Puno'),
       ('21234567', 'Ricardo Silva', 'ricardo.silva@example.com', '923678451', 'Av. Trapiche 765, Lima'),
       ('22234567', 'Valeria Soto', 'valeria.soto@example.com', '912334455', 'Calle Arequipa 221, Cusco'),
       ('23234567', 'Hernán Guzmán', 'hernan.guzman@example.com', '934556677', 'Jr. Misti 675, Arequipa'),
       ('24234567', 'Daniela Chávez', 'daniela.chavez@example.com', '945667788', 'Av. Colonial 543, Lima'),
       ('25234567', 'Miguel Cárdenas', 'miguel.cardenas@example.com', '976667755', 'Jr. Las Violetas 234, Lambayeque'),
       ('26234567', 'Carolina Navarro', 'carolina.navarro@example.com', '987332211', 'Calle Libertad 999, Trujillo');

INSERT INTO s (name, description, price, stock, min_stock, active)
VALUES ('Arroz Costeño 5kg', 'Arroz extra superior de 5 kilogramos', 22.50, 80, 10, true),
       ('Aceite Primor 1L', 'Aceite vegetal de 1 litro', 12.90, 60, 8, true),
       ('Azúcar Rubia 1kg', 'Azúcar rubia granulada de 1 kilogramo', 4.50, 120, 15, true),
       ('Leche Gloria Entera 400g', 'Leche evaporada entera en lata 400g', 4.20, 150, 20, true),
       ('Fideos Don Vittorio 500g', 'Fideos spaghetti marca Don Vittorio', 3.80, 100, 15, true),
       ('Atún Florida 170g', 'Atún en aceite vegetal 170 gramos', 6.50, 75, 10, true),
       ('Galletas Field Soda 12p', 'Paquete de galletas de soda Field 12 unidades', 5.50, 90, 12, true),
       ('Jabón Marsella 250g', 'Jabón para ropa de 250 gramos', 2.80, 140, 20, true),
       ('Detergente Ace 1kg', 'Detergente en polvo marca Ace 1 kilogramo', 10.50, 65, 10, true),
       ('Shampoo Head & Shoulders 375ml', 'Shampoo anticaspa 375ml', 16.90, 40, 6, true),
       ('Papel Higiénico Elite 12 rollos', 'Papel higiénico doble hoja', 18.00, 55, 8, true),
       ('Café Altomayo 200g', 'Café molido Altomayo tradicional 200g', 14.90, 35, 5, true),
       ('Gaseosa Inca Kola 1.5L', 'Bebida gaseosa Inca Kola de 1.5 litros', 7.50, 70, 10, true),
       ('Agua Cielo 625ml', 'Botella de agua mineral sin gas', 2.20, 200, 30, true),
       ('Vinagre Iberia 500ml', 'Botella de vinagre blanco 500ml', 3.50, 50, 8, true);
