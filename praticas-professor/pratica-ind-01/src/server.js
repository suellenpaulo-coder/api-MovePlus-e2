import express from "express";

const app = express();
app.use(express.json()); // Habilita leitura do corpo em JSON

const jogos = [
    { id: 1, nome: "Minecraft" },
    { id: 2, nome: "FIFA 24" }
];

function buscaJogo(id) {
    return jogos.findIndex(jogo => {
        return jogo.id === Number(id);
    });
}

// REQUISIÇÕES
app.get("/", (req, res) => {
    res.status(200).send("Codificação BackEnd");
});

app.get("/jogos", (req, res) => {
    res.status(200).json(jogos);
});

// REQUISIÇÃO POST (CADASTRAR NOVO JOGO)
app.post("/jogos", (req, res) => {
    jogos.push(req.body);
    res.status(201).send("Jogo Cadastrado com Sucesso!");
});

// REQUISIÇÃO PUT (ATUALIZAR DADOS)
app.put("/jogos/:id", (req, res) => {
    const index = buscaJogo(req.params.id);

    if (index === -1) {
        return res.status(404).send("Jogo não encontrado!");
    }

    jogos[index] = {
        ...jogos[index],
        ...req.body
    };

    res.status(200).send("Jogo atualizado com sucesso!");
});

// REQUISIÇÃO DELETE (REMOVER JOGO)
app.delete("/jogos/:id", (req, res) => {
    const index = buscaJogo(req.params.id);

    if (index === -1) {
        return res.status(404).send("Jogo não encontrado!");
    }

    jogos.splice(index, 1);

    res.status(200).send("Jogo removido com sucesso!");
});

app.listen(3000, () => {
    console.log(`Servidor rodando na porta 3000`)
});