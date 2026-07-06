const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "villa_imperialle"
});

conexao.connect((erro) => {
    if (erro) throw erro;
    console.log("Banco conectado.");
});

app.post("/pedido", (req, res) => {
    console.log(req.body);
    const pedido = req.body;

    conexao.query(
        `INSERT INTO pedido
        (nome_cliente, telefone, endereco, valor_total)
        VALUES (?, ?, ?, ?)`,
        [
            pedido.nome,
            pedido.telefone,
            pedido.endereco,
            pedido.valor_total
        ],
        (erro, resultado) => {

            if (erro) {
                console.log(erro);
                return res.status(500).json({ sucesso: false });
            }

            const pedidoId = resultado.insertId;
            atualizarStatusAutomatico(pedidoId);
            let restantes = pedido.itens.length;

            if (restantes === 0) {
                return res.json({
                    sucesso: true,
                    pedidoId
                });
            }

            pedido.itens.forEach(item => {

                conexao.query(
                    `INSERT INTO item_pedido
        (pedido_id, prato_id, quantidade, preco_unitario, observacao)
        VALUES (?, ?, ?, ?, ?)`,
                    [
                        pedidoId,
                        item.id,
                        item.quantidade,
                        item.preco,
                        item.observacao || ""
                    ],
                    (erro) => {

                        if (erro) {
                            console.log(erro);
                            return;
                        }

                        restantes--;

                        if (restantes === 0) {
                            res.json({
                                sucesso: true,
                                pedidoId
                            });
                        }
                    }
                );

            });
        }
    );

});

app.get("/pedido/:id", (req, res) => {

    const id = req.params.id;

    conexao.query(
        `SELECT
            id,
            nome_cliente,
            valor_total,
            status,
            data_pedido
        FROM pedido
        WHERE id = ?`,
        [id],
        (erro, resultado) => {

            if (erro)
                return res.status(500).json(erro);

            if (resultado.length === 0)
                return res.status(404).json({
                    erro: "Pedido não encontrado."
                });

            res.json(resultado[0]);

        }
    );

});

function atualizarStatusAutomatico(pedidoId) {

    setTimeout(() => {
        conexao.query(
            "UPDATE pedido SET status = 'Preparando' WHERE id = ?",
            [pedidoId]
        );
    }, 30000);

    setTimeout(() => {
        conexao.query(
            "UPDATE pedido SET status = 'Saiu para entrega' WHERE id = ?",
            [pedidoId]
        );
    }, 60000);

    setTimeout(() => {
        conexao.query(
            "UPDATE pedido SET status = 'Entregue' WHERE id = ?",
            [pedidoId]
        );
    }, 90000);
}

app.listen(3000, () => {
    console.log("Servidor rodando.");
});