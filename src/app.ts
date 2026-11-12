
import express from "express";
import type { Request, Response } from "express";
import Aluno from "./models/Aluno.js";

const app = express();

app.use(express.json());

// GET - página inicial
app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("MovePlus funcionando!!");
});

// GET - listar todos os alunos
app.get("/alunos", async (req: Request, res: Response) => {
    try {
        const alunos = await Aluno.find().sort({ id: 1 });
        return res.status(200).json(alunos);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao buscar alunos" });
    }
});

// GET - buscar aluno pelo ID
app.get("/alunos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    try {
        const aluno = await Aluno.findOne({ id });

        if (!aluno) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        return res.status(200).json(aluno);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ mensagem: "Erro ao buscar aluno" });
    }
});

// POST - cadastrar aluno
app.post("/alunos", async (req: Request, res: Response) => {
    const { id, name } = req.body;

    if (id === undefined || typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            mensagem: "ID e nome são obrigatórios"
        });
    }

    const idNumerico = Number(id);

    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    try {
        const existente = await Aluno.findOne({ id: idNumerico });

        if (existente) {
            return res.status(409).json({
                mensagem: "Já existe um aluno com esse ID"
            });
        }

        const novoAluno = await Aluno.create({
            id: idNumerico,
            name: name.trim()
        });

        return res.status(201).json({
            mensagem: "Aluno cadastrado com sucesso",
            aluno: novoAluno
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro ao cadastrar aluno"
        });
    }
});

// PUT - atualizar aluno completamente
app.put("/alunos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            mensagem: "O campo name é obrigatório"
        });
    }

    try {
        const aluno = await Aluno.findOneAndUpdate(
            { id },
            { name: name.trim() },
            { new: true, runValidators: true }
        );

        if (!aluno) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        return res.status(200).json({
            mensagem: "Aluno atualizado completamente",
            aluno
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro ao atualizar aluno"
        });
    }
});

// PATCH - atualizar aluno parcialmente
app.patch("/alunos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    if (typeof name !== "string" || !name.trim()) {
        return res.status(400).json({
            mensagem: "Informe um nome válido"
        });
    }

    try {
        const aluno = await Aluno.findOneAndUpdate(
            { id },
            { name: name.trim() },
            { new: true, runValidators: true }
        );

        if (!aluno) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        return res.status(200).json({
            mensagem: "Aluno atualizado parcialmente",
            aluno
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro ao atualizar aluno"
        });
    }
});

// DELETE - excluir aluno
app.delete("/alunos/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
        return res.status(400).json({ mensagem: "ID inválido" });
    }

    try {
        const alunoExcluido = await Aluno.findOneAndDelete({ id });

        if (!alunoExcluido) {
            return res.status(404).json({ mensagem: "Aluno não encontrado" });
        }

        return res.status(200).json({
            mensagem: "Aluno excluído com sucesso",
            aluno: alunoExcluido
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            mensagem: "Erro ao excluir aluno"
        });
    }
});

export default app;
