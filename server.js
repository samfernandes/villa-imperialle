let carrinho =
    JSON.parse(
        localStorage.getItem("carrinho")
    ) || [];

function adicionarCarrinho(id, nome, preco, imagem) {

    let itemExistente =
        carrinho.find(
            item => item.id === id
        );

    if (itemExistente) {

        itemExistente.quantidade++;

    } else {

        carrinho.push({

            id: id,
            nome: nome,
            preco: preco,
            imagem: imagem,
            quantidade: 1

        });

    }

    localStorage.setItem(
        "carrinho",
        JSON.stringify(carrinho)
    );

    atualizarMiniCarrinho();

    alert(nome + " foi adicionado ao carrinho!");

}

function atualizarMiniCarrinho() {

    let contador =
        document.getElementById(
            "contador-carrinho"
        );

    if (!contador) {

        return;

    }

    let quantidadeTotal = 0;

    carrinho.forEach(item => {

        quantidadeTotal += item.quantidade;

    });

    contador.textContent =
        quantidadeTotal;

}

atualizarMiniCarrinho();