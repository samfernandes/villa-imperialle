CREATE DATABASE villa_imperialle;
USE villa_imperialle;
CREATE TABLE categoria (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL UNIQUE
);
CREATE TABLE prato (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    descricao VARCHAR(150),
    valor DECIMAL(10,2) NOT NULL,
    imagem VARCHAR(255),
    categoria_id INT NOT NULL,
    ativo BOOLEAN DEFAULT TRUE,
    FOREIGN KEY (categoria_id)
        REFERENCES categoria(id)
);
CREATE TABLE pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome_cliente VARCHAR(100) NOT NULL,
    telefone VARCHAR(20) NOT NULL,
    endereco VARCHAR(150) NOT NULL,
    valor_total DECIMAL(10,2) NOT NULL,
    data_pedido DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM(
        'Recebido',
        'Preparando',
        'Saiu para entrega',
        'Entregue',
        'Cancelado'
    ) DEFAULT 'Recebido'
);
CREATE TABLE item_pedido (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pedido_id INT NOT NULL,
    prato_id INT NOT NULL,
    quantidade INT NOT NULL,
    preco_unitario DECIMAL(10,2) NOT NULL,
    observacao VARCHAR(255),
    FOREIGN KEY (pedido_id)
        REFERENCES pedido(id),
    FOREIGN KEY (prato_id)
        REFERENCES prato(id)
);
INSERT INTO categoria (nome)
VALUES
	('Massas'),
    ('Pizzas'),
    ('Sobremesas'),
    ('Bebidas');
INSERT INTO prato (nome, valor, categoria_id)
VALUES
	('Penne ao Molho Arrabbiata', '49.90', '1'),
    ('Bucatini ao Molho Amatriciana', '54.90', '1'),
    ('Lasanha à Bolonhesa', '59.90', '1'),
    ('Pizza Margherita', '49.90', '2'),
    ('Pizza Capricciosa', '54.90', '2'),
    ('Pizza Boscaiola', '59.90', '2'),
    ('Canolli canudinhos', '49.90', '3'),
    ('Panna Cotta', '54.90', '3'),
    ('Tiramisú', '59.90', '3'),
    ('Aperol Spritz', '49.90', '4'),
    ('Negroni', '54.90', '4'),
    ('Franciacorta', '59.90', '4');
;