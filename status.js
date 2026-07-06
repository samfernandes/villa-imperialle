const parametros = new URLSearchParams(window.location.search);

const id = parametros.get("id");

async function carregarStatus() {

    const resposta =
        await fetch(`http://localhost:3000/pedido/${id}`);

    const pedido =
        await resposta.json();

    document.getElementById("numero").innerHTML =
        "Pedido Nº " + pedido.id;

    document.getElementById("cliente").innerHTML =
        pedido.nome_cliente;

    document.getElementById("valor").innerHTML =
        "R$ " + Number(pedido.valor_total).toFixed(2);

    document.getElementById("status").innerHTML =
        pedido.status;

}

carregarStatus();
setInterval(carregarStatus, 5000);