let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const listaPedido = document.getElementById("lista-pedido");
const valorTotal = document.getElementById("valor-total");

function carregarPedido() {

    listaPedido.innerHTML = "";

    let total = 0;

    carrinho.forEach((item, indice) => {

        total += item.preco * item.quantidade;

        listaPedido.innerHTML += `

        <div class="item-pedido">

            <div>

                <h3>${item.nome}</h3>

                <p>
                    R$ ${item.preco.toFixed(2)}
                </p>

            </div>

            <div>

                <button onclick="diminuir(${indice})">
                    -
                </button>

                ${item.quantidade}

                <button onclick="aumentar(${indice})">
                    +
                </button>

                <button onclick="remover(${indice})">

                    <i class="fa-solid fa-trash"></i>

                </button>

            </div>

        </div>

        `;

    });

    valorTotal.innerHTML =
        "R$ " + total.toFixed(2);

}

function aumentar(indice){

    carrinho[indice].quantidade++;

    salvar();

}

function diminuir(indice){

    if(carrinho[indice].quantidade > 1){

        carrinho[indice].quantidade--;

    }

    salvar();

}

function remover(indice){

    carrinho.splice(indice,1);

    salvar();

}

function salvar(){

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    carregarPedido();

}

function finalizarPedido(){

    const nome =
        document.getElementById("nome").value;

    const telefone =
        document.getElementById("telefone").value;

    const endereco =
        document.getElementById("endereco").value;

    if(
        nome === "" ||
        telefone === "" ||
        endereco === ""
    ){

        alert("Preencha todos os campos.");

        return;

    }

    alert("Pedido realizado com sucesso!");

    localStorage.removeItem("carrinho");

    window.location.href = "index.html";

}

carregarPedido();