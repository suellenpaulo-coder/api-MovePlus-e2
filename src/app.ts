import express from "express";
import type {Request, Response} from "express";

export interface Aluno {
	id: number;
	name: string;
}

const app = express();

app.use(express.json());

const alunos: Aluno [] = [
	{id: 1, name: "Lucas Santos"},
	{id: 2, name: "Mariana Oliveira"}
];

function buscaAluno(id: string | number): number {
	return alunos.findIndex(aluno => {
		return aluno.id === Number(id);
	});
}

app.get("/", (req: Request, res: Response) => {
	res.status(200).send("MovePlus funcionando!!");
});

app.get("/alunos", (req: Request, res: Response) => {
	res.status(200).json(alunos);
});

app.post("/alunos", (req: Request, res: Response) => {
	const { id, name } = req.body;

	const novoAluno: Aluno = {
		id: Number(id),
		name
	};

	alunos.push(novoAluno);
	res.status(201).json(novoAluno);
	message: "Aluno cadastrado com sucesso";
	alunos: novoAluno
});

app.put("/alunos/:id", (req: Request, res: Response) => {
	const id = Number(req.params.id);
	const indice = alunos.findIndex(aluno => aluno.id === id);

	if (indice === -1) {
		return res.status(404).json({ mensagem: "Aluno não encontrado" });
	}

	alunos[indice].nome = req.body.nome;
	res.status(200).json(alunos[indice]);
});

export default app;