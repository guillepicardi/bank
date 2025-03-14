--Ingreso las compañías
INSERT INTO company (id, name, cuit, creationDate) VALUES('111deb4d-3b7d-4bad-9bdd-110d7b3dcb6d','Company 0 ok','12345678901',DATE_SUB(CURDATE(), INTERVAL 20 DAY));
INSERT INTO company (id, name, cuit, creationDate) VALUES('221deb4d-3b7d-4bad-9bdd-110d7b3dcb6d','Company 1 ok','12345678902',DATE_SUB(CURDATE(), INTERVAL 0 DAY));
INSERT INTO company (id, name, cuit, creationDate) VALUES('331deb4d-3b7d-4bad-9bdd-110d7b3dcb6d','Company 2 ok','12345678903',DATE_SUB(CURDATE(), INTERVAL 29 DAY));
INSERT INTO company (id, name, cuit, creationDate) VALUES('441deb4d-3b7d-4bad-9bdd-110d7b3dcb6d','Company 3 off','12345678904',DATE_SUB(CURDATE(), INTERVAL 30 DAY));
INSERT INTO company (id, name, cuit, creationDate) VALUES('551deb4d-3b7d-4bad-9bdd-110d7b3dcb6d','Company 4 off','12345678905',DATE_SUB(CURDATE(), INTERVAL 31 DAY));


--Ingreso transferencias para Company 4 (mes actual)
INSERT INTO bank.transfer (id, amount, debitAccountCbu, creditAccountCbu, creationDate, companyId) VALUES('00000000-3b7d-4bad-9bdd-110d7b3dcb6d', 12258.59, '1111111111111111111111', '2222222222222222222222', DATE_SUB(CURDATE(), INTERVAL 20 DAY),'551deb4d-3b7d-4bad-9bdd-110d7b3dcb6d');
--Ingreso transferencias para Company 3 (mes anterior)
INSERT INTO bank.transfer (id, amount, debitAccountCbu, creditAccountCbu, creationDate, companyId) VALUES('11111111-3b7d-4bad-9bdd-110d7b3dcb6d', 220578.00, '2222222222222222222222', '3333333333333333333333',DATE_SUB(CURDATE(), INTERVAL 35 DAY), '441deb4d-3b7d-4bad-9bdd-110d7b3dcb6d');

--Ingreso transferencias para Company 2 (mes anterior y actual)
INSERT INTO bank.transfer (id, amount, debitAccountCbu, creditAccountCbu, creationDate, companyId) VALUES('22222222-3b7d-4bad-9bdd-110d7b3dcb6d', 4500000, '3333333333333333333333', '4444444444444444444444', DATE_SUB(CURDATE(), INTERVAL 10 DAY),'331deb4d-3b7d-4bad-9bdd-110d7b3dcb6d');
INSERT INTO bank.transfer (id, amount, debitAccountCbu, creditAccountCbu, creationDate, companyId) VALUES('33333333-3b7d-4bad-9bdd-110d7b3dcb6d', 62351.22, '4444444444444444444444', '5555555555555555555555',DATE_SUB(CURDATE(), INTERVAL 35 DAY), '331deb4d-3b7d-4bad-9bdd-110d7b3dcb6d');

-- Company 0 y 1 no tienen transferencias