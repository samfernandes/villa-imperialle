# Villa Imperialle 🍕

Cardápio digital do restaurante **Villa Imperialle**, com páginas de cardápio (pizzas, massas, sobremesas e bebidas), carrinho de compras e acompanhamento de status do pedido.

O projeto é dividido em duas partes:

1. **Front-end**: páginas HTML/CSS/JS puro (não precisa de build, nem de framework).
2. **Back-end**: uma API em Node.js (Express) que salva os pedidos em um banco de dados MySQL.

---

## 📁 Estrutura principal

```
villa-imperialle-main/
├── index.html                  # Página inicial
├── cardapio.html                # Cardápio geral
├── cardapio-pizzas.html
├── cardapio-massas.html
├── cardapio-sobremesas.html
├── cardapio-bebidas.html
├── pedido.html                  # Carrinho / finalizar pedido
├── status.html                  # Acompanhamento do pedido
├── style.css / status.css       # Estilos
├── carrinho.js                  # Lógica do carrinho (localStorage)
├── pedido.js                    # Envia o pedido para a API
├── status.js                    # Consulta o status do pedido na API
├── server.js                    # Servidor Node/Express + MySQL
├── villa_imperialle.sql         # Schema + dados iniciais do banco MySQL
├── package.json
└── imagens/                     # Imagens dos pratos e banners
```

---

## ✅ Pré-requisitos

- Um navegador (Chrome, Firefox, Edge, etc.) para o front-end.
- [Node.js](https://nodejs.org/) (versão 18 ou superior) para rodar o servidor.
- [MySQL](https://dev.mysql.com/downloads/) instalado e rodando localmente.

---

## 1️⃣ Rodando apenas o front-end (cardápio, sem salvar pedidos)

Se você só quer visualizar o cardápio e navegar pelas páginas (o carrinho funciona via `localStorage`, mas finalizar o pedido exige o back-end rodando), basta abrir o `index.html` diretamente no navegador, ou servir a pasta com um servidor estático simples:

```bash
cd villa-imperialle-main
npx serve .
```

e acessar o endereço mostrado no terminal (algo como `http://localhost:3000`).

> ⚠️ Note que o back-end também usa a porta **3000** por padrão. Se for rodar os dois ao mesmo tempo, sirva o front-end em outra porta, por exemplo:
> ```bash
> npx serve . -l 5500
> ```

---

## 2️⃣ Rodando o back-end (API + banco de dados)

O botão "Finalizar pedido" (em `pedido.html`) e a página de status (`status.html`) dependem do servidor Node em `http://localhost:3000`.

### a) Instalar as dependências

```bash
cd villa-imperialle-main
npm install
```

Isso instala `express`, `mysql2` e `cors`, que já estão listados em `package.json`.

### b) Criar o banco de dados MySQL

O `server.js` se conecta com estas credenciais (linha 9-14 do arquivo):

```js
host: "localhost",
user: "root",
password: "insg",
database: "villa_imperialle"
```

Ajuste `user`, `password` e `host` conforme o seu ambiente MySQL, se necessário.

O repositório já inclui o arquivo **`villa_imperialle.sql`** com todo o schema pronto (tabelas `categoria`, `prato`, `pedido` e `item_pedido`, além dos dados iniciais do cardápio). Basta importá-lo:

```bash
mysql -u root -p < villa_imperialle.sql
```

Isso vai:
- Criar o banco `villa_imperialle`;
- Criar as tabelas:
  - `categoria` — categorias do cardápio (Massas, Pizzas, Sobremesas, Bebidas);
  - `prato` — pratos/itens do cardápio, vinculados a uma categoria (`categoria_id`), com campo `ativo` para habilitar/desabilitar itens;
  - `pedido` — pedidos feitos pelos clientes, com `status` controlado por `ENUM` (`Recebido`, `Preparando`, `Saiu para entrega`, `Entregue`, `Cancelado`);
  - `item_pedido` — itens de cada pedido, vinculados a `pedido` e a `prato`;
- Popular `categoria` e `prato` com os dados iniciais do cardápio (os mesmos pratos exibidos nas páginas `cardapio-*.html`).

> 💡 Se preferir, também é possível abrir o arquivo `villa_imperialle.sql` em uma ferramenta como MySQL Workbench, phpMyAdmin ou DBeaver e executá-lo por lá.

### c) Rodar o servidor

```bash
node server.js
```

Se tudo estiver certo, você verá no terminal:

```
Banco conectado.
Servidor rodando.
```

A API ficará disponível em `http://localhost:3000`, com as rotas:

- `POST /pedido` — cria um novo pedido (usado por `pedido.js`).
- `GET /pedido/:id` — consulta o status de um pedido (usado por `status.js`).

O status do pedido é atualizado automaticamente por temporizadores internos do servidor (30s → "Preparando", 60s → "Saiu para entrega", 90s → "Entregue") — é só uma simulação, não reflete um preparo real.

---

## 3️⃣ Usando o site completo

1. Rode o back-end (`node server.js`), deixando-o ativo em `http://localhost:3000`.
2. Abra `index.html` no navegador (ou sirva a pasta com `npx serve .` em outra porta).
3. Navegue pelo cardápio, adicione itens ao carrinho.
4. Vá até `pedido.html`, preencha nome/telefone/endereço e finalize o pedido.
5. Você será redirecionado para `status.html`, que consulta a API a cada intervalo para mostrar o progresso do pedido.

---

## 🌐 Publicação (GitHub Pages)

O repositório já contém um workflow (`.github/workflows`) que publica automaticamente o conteúdo estático no GitHub Pages a cada push na branch `main`. Nesse caso, porém, apenas o front-end fica publicado — o back-end (Node + MySQL) precisa ser hospedado separadamente (ex: Render, Railway, um VPS, etc.) e a URL usada em `pedido.js`/`status.js` (atualmente `http://localhost:3000`) precisaria ser atualizada para a URL pública do servidor.

---

## 🛠️ Problemas comuns

- **"Erro ao conectar com o servidor"** ao finalizar o pedido → verifique se `node server.js` está rodando e se a porta 3000 não está em uso por outro processo.
- **Erro de conexão com o MySQL** → confira usuário/senha/host em `server.js` e se o serviço do MySQL está ativo.
- **"Table doesn't exist" / erro ao salvar pedido** → verifique se o `villa_imperialle.sql` foi importado com sucesso (rode `SHOW TABLES;` dentro do banco `villa_imperialle` para conferir se `categoria`, `prato`, `pedido` e `item_pedido` foram criadas).
- **CORS bloqueado** → o `server.js` já usa o pacote `cors`, então isso normalmente não deve ocorrer; confirme que está acessando o front-end via `http://localhost` e não `file://` diretamente com bloqueios de segurança do navegador.
