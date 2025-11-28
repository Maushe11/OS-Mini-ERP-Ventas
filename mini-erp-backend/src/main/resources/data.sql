INSERT INTO users (username, password, role, active, created_at)
VALUES ('admin', '$2a$10$Aqw3TnwLhGQkplX8bd4/VeMe1Hh/C2ngRgjRz4WsE7HGjCYbqMp9K', 'ADMIN', true, NOW()),
       ('juan', '$2a$10$OCQZ/DDNfRlOUJauG4Kq0.HY7fz4ziUwl87V5GBzX0l4OBCpT6H62', 'USER', true, NOW());
