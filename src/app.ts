import express from "express";
import type {Request, Response} from "express";

// export interface Aluno {
//     id: number;
//     name: string;
// }

const app = express();

app.use(express.json());

// const alunos: Aluno[] = [
//     { id: 1, name: "Lucas Santos" },
//     { id: 2, name: "Mariana Oliveira" }
// ];

// Buscar aluno pelo ID
// function buscaAluno(id: string | number): number {
//     return alunos.findIndex(aluno => aluno.id === Number(id));
// }

// GET - página inicial
app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("MovePlus funcionando!!");
});

// GET - listar alunos
app.get("/alunos", (req: Request, res: Response) => {

     try{
        const listaAlunos = alunos.find({});
        res.status(200).json(listaAlunos);

     }catch (error){
        res.status(500).json({ mensagem: "Erro ao buscar alunos"});

     }

    return res.status(200).json(alunos);
});

// GET - buscar um único aluno pelo ID
app.get("/alunos/:id", (req: Request, res: Response) => {

     try{
        const listaAlunos = Alunos.find({});
     }
    const id = Number(req.params.id);

    // Valida se o ID é um número inteiro válido
    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const indice = buscaAluno(id);

    // Se não encontrar o aluno, retorna 404
    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    // Retorna apenas o aluno encontrado
    return res.status(200).json(alunos[indice]);
});

// POST - cadastrar aluno
app.post("/alunos", (req: Request, res: Response) => {
    const { id, name } = req.body;

    if (id === undefined || name === undefined || !String(name).trim()) {
        return res.status(400).json({
            mensagem: "ID e nome são obrigatórios"
        });
    }

    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    if (buscaAluno(idNumerico) !== -1) {
        return res.status(409).json({
            mensagem: "Já existe um aluno com esse ID"
        });
    }

    const novoAluno: Aluno = {
        id: idNumerico,
        name: String(name).trim()
    };

    alunos.push(novoAluno);

    return res.status(201).json({
        mensagem: "Aluno cadastrado com sucesso",
        aluno: novoAluno
    });
});

// PUT - atualizar aluno completamente
app.put("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const indice = buscaAluno(id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const { name } = req.body;

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            mensagem: "O campo name é obrigatório"
        });
    }

    alunos[indice] = {
        id,
        name: name.trim()
    };

    return res.status(200).json({
        mensagem: "Aluno atualizado completamente",
        aluno: alunos[indice]
    });
});

// PATCH - atualizar aluno parcialmente
app.patch("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const indice = buscaAluno(id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const name: unknown = req.body?.name;

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            mensagem: "Informe um nome válido"
        });
    }

    const aluno = alunos[indice];

    if (!aluno) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    aluno.name = name.trim();

    return res.status(200).json({
        mensagem: "Aluno atualizado parcialmente",
        aluno
    });
});

// DELETE - excluir aluno
app.delete("/alunos/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({
            mensagem: "ID inválido"
        });
    }

    const indice = buscaAluno(id);

    if (indice === -1) {
        return res.status(404).json({
            mensagem: "Aluno não encontrado"
        });
    }

    const alunoExcluido = alunos.splice(indice, 1)[0];

    return res.status(200).json({
        mensagem: "Aluno excluído com sucesso",
        aluno: alunoExcluido
    });
});

export default app;