function adicionarCarrinho(id, nome, preco, imagem) {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const itemExistente = carrinho.find(
        item => item.id === id
    );

    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({
            id,
            nome,
            preco,
            imagem,
            quantidade: 1
        });

    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarContador();

}

function atualizarContador() {

    let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

    const total = carrinho.reduce(
        (soma, item) => soma + item.quantidade,
        0
    );

    const contador = document.getElementById("contador-carrinho");

    if (contador) {

        contador.textContent = total;

    }

}

document.addEventListener(
    "DOMContentLoaded",
    atualizarContador
);