
import express from "express";
import type { Request, Response } from "express";

export interface Aluno {
    id: number;
    name: string;
}

const app = express();

app.use(express.json());

const alunos: Aluno[] = [
    { id: 1, name: "Lucas Santos" },
    { id: 2, name: "Mariana Oliveira" }
];

function buscaAluno(id: string | number): number {
    return alunos.findIndex(aluno => aluno.id === Number(id));
}

// GET - Página inicial
app.get("/", (req: Request, res: Response) => {
    res.status(200).send("MovePlus funcionando!!");
});

// GET - Listar alunos
app.get("/alunos", (req: Request, res: Response) => {
    res.status(200).json(alunos);
});

// POST - Cadastrar aluno
app.post("/alunos", (req: Request, res: Response) => {
    const { id, name } = req.body;

    const novoAluno: Aluno = {
        id: Number(id),
        name
    };

    alunos.push(novoAluno);

    res.status(201).json({
        mensagem: "Aluno cadastrado com sucesso",
        aluno: novoAluno
    });
});

// PUT - Atualizar aluno completamente
app.put("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = buscaAluno(id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const { name } = req.body;

    alunos[indice] = {
        id: id,
        name
    };

    res.status(200).json({
        mensagem: "Aluno atualizado completamente",
        aluno: alunos[indice]
    });
});

// PATCH - Atualizar aluno parcialmente
app.patch("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = buscaAluno(id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const { name } = req.body;

    alunos[indice].name = name;

    res.status(200).json({
        mensagem: "Aluno atualizado parcialmente",
        aluno: alunos[indice]
    });
});

// DELETE - Excluir aluno
app.delete("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = buscaAluno(id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const alunoExcluido = alunos.splice(indice, 1);

    res.status(200).json({
        mensagem: "Aluno excluído com sucesso",
        aluno: alunoExcluido[0]
    });
});

export default app;
