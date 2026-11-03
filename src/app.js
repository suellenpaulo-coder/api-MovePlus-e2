import express from "express";

const app = express();

app.use(express.json());

const alunos = [
	{ id: 1, nome: "Lucas Santos" },
	{ id: 2, nome: "Mariana Oliveira" }
];

app.get("/", (req, res) => {
	res.status(200).send("MovePlus funcionando!!");
});

app.get("/alunos", (req, res) => {
	res.status(200).json(alunos);
});

app.post("/alunos", (req, res) => {
	const { nome } = req.body;
	const novoAluno = {
		id: alunos.length + 1,
		nome
	};

	alunos.push(novoAluno);
	res.status(201).json(novoAluno);
});

app.put("/alunos/:id", (req, res) => {
	const id = Number(req.params.id);
	const indice = alunos.findIndex(aluno => aluno.id === id);

	if (indice === -1) {
		return res.status(404).json({ mensagem: "Aluno não encontrado" });
	}

	alunos[indice].nome = req.body.nome;
	res.status(200).json(alunos[indice]);
});

export default app;
