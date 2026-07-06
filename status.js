const parametros = new URLSearchParams(window.location.search);
const id = parametros.get("id");

const etapas = [
    { nome: "Recebido", fim: 25 },
    { nome: "Produto sendo feito", fim: 50 },
    { nome: "Saiu para entrega", fim: 75 },
    { nome: "Pedido entregue", fim: 100 }
];

async function carregarPedido() {

    const resposta = await fetch(`http://localhost:3000/pedido/${id}`);
    const pedido = await resposta.json();

    document.getElementById("numero").innerHTML =
        "Pedido Nº " + pedido.id;

    document.getElementById("cliente").innerHTML =
        pedido.nome_cliente;

    document.getElementById("valor").innerHTML =
        "R$ " + Number(pedido.valor_total).toFixed(2);

    document.getElementById("endereco").innerHTML =
        pedido.endereco;

    iniciarAnimacao();

}

function iniciarAnimacao() {

    let etapaAtual = 0;
    let progresso = 0;

    const barra = document.getElementById("progresso");
    const status = document.getElementById("status");

    const c1 = document.getElementById("c1");
    const c2 = document.getElementById("c2");
    const c3 = document.getElementById("c3");
    const c4 = document.getElementById("c4");

    status.innerHTML = etapas[0].nome;
    c1.classList.add("ativo");

    const intervalo = setInterval(() => {

        progresso += 2;

        if (progresso > 100) {
            progresso = 100;
        }

        barra.style.width = progresso + "%";

        if (progresso >= 25) {
            c2.classList.add("ativo");
        }

        if (progresso >= 50) {
            c3.classList.add("ativo");
        }

        if (progresso >= 75) {
            c4.classList.add("ativo");
        }

        if (
            progresso >= etapas[etapaAtual].fim &&
            etapaAtual < etapas.length - 1
        ) {
            etapaAtual++;
            status.innerHTML = etapas[etapaAtual].nome;
        }

        if (progresso >= 100) {
            clearInterval(intervalo);
        }

    }, 100);
}

carregarPedido();