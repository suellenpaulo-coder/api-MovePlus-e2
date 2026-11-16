
import express from "express";
import type { Request, Response } from "express";
import Academia from "./models/academia.js";

const app = express();

app.use(express.json());

// Campos permitidos para cadastro e atualização
const camposAcademia = [
    "name",
    "plans",
    "createdAt",
    "activities",
    "phone",
    "description",
    "cnpj",
    "email",
    "address",
    "openingHours",
    "isActive",
    "modalities",
    "capacity"
] as const;

// GET - página inicial
app.get("/", (req: Request, res: Response) => {
    return res.status(200).send("MovePlus funcionando!");
});

// GET - listar todas as academias
app.get("/academias", async (req: Request, res: Response) => {
    try {
        const academias = await Academia.find();

        return res.status(200).json(academias);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao consultar academias."
        });
    }
});

// GET - buscar academia pelo ID
app.get("/academias/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensagem: "ID inválido."
            });
        }

        const academia = await Academia.findOne({ id });

        if (!academia) {
            return res.status(404).json({
                mensagem: "Academia não encontrada."
            });
        }

        return res.status(200).json(academia);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao buscar academia."
        });
    }
});

// POST - cadastrar academia
app.post("/academias", async (req: Request, res: Response) => {
    try {
        const dados = req.body;

        if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
            return res.status(400).json({
                mensagem: "Envie os dados da academia em formato JSON."
            });
        }

        const camposObrigatorios = [
            "name",
            "plans",
            "activities",
            "phone",
            "description",
            "cnpj",
            "email",
            "address",
            "openingHours",
            "isActive",
            "modalities",
            "capacity"
        ];

        for (const campo of camposObrigatorios) {
            if (dados[campo] === undefined || dados[campo] === null) {
                return res.status(400).json({
                    mensagem: `O campo ${campo} é obrigatório.`
                });
            }
        }

        const ultimoRegistro = await Academia.findOne().sort({ id: -1 });
        const novoId = ultimoRegistro ? ultimoRegistro.id + 1 : 1;

        const novaAcademia = await Academia.create({
            ...dados,
            id: novoId
        });

        return res.status(201).json({
            mensagem: "Academia cadastrada com sucesso!",
            academia: novaAcademia
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao cadastrar academia."
        });
    }
});

// PUT - atualizar todos os dados da academia
app.put("/academias/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensagem: "ID inválido."
            });
        }

        const dados = req.body;

        if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
            return res.status(400).json({
                mensagem: "Envie os dados em formato JSON."
            });
        }

        for (const campo of camposAcademia) {
            if (dados[campo] === undefined || dados[campo] === null) {
                return res.status(400).json({
                    mensagem: `O campo ${campo} é obrigatório para atualização completa.`
                });
            }
        }

        const atualizacao: Record<string, unknown> = {};

        for (const campo of camposAcademia) {
            atualizacao[campo] = dados[campo];
        }

        const academiaAtualizada = await Academia.findOneAndUpdate(
            { id },
            { $set: atualizacao },
            { new: true, runValidators: true }
        );

        if (!academiaAtualizada) {
            return res.status(404).json({
                mensagem: "Academia não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Academia atualizada com sucesso!",
            academia: academiaAtualizada
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar academia."
        });
    }
});

// PATCH - atualizar parcialmente a academia
app.patch("/academias/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensagem: "ID inválido."
            });
        }

        const dados = req.body;

        if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
            return res.status(400).json({
                mensagem: "Envie os dados em formato JSON."
            });
        }

        const atualizacao: Record<string, unknown> = {};

        for (const campo of camposAcademia) {
            if (dados[campo] !== undefined) {
                atualizacao[campo] = dados[campo];
            }
        }

        if (Object.keys(atualizacao).length === 0) {
            return res.status(400).json({
                mensagem: "Informe pelo menos um campo válido para atualizar."
            });
        }

        const academiaAtualizada = await Academia.findOneAndUpdate(
            { id },
            { $set: atualizacao },
            { new: true, runValidators: true }
        );

        if (!academiaAtualizada) {
            return res.status(404).json({
                mensagem: "Academia não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Academia atualizada parcialmente!",
            academia: academiaAtualizada
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao atualizar academia."
        });
    }
});

// DELETE - excluir academia
app.delete("/academias/:id", async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            return res.status(400).json({
                mensagem: "ID inválido."
            });
        }

        const academiaExcluida = await Academia.findOneAndDelete({ id });

        if (!academiaExcluida) {
            return res.status(404).json({
                mensagem: "Academia não encontrada."
            });
        }

        return res.status(200).json({
            mensagem: "Academia excluída com sucesso!",
            academia: academiaExcluida
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            mensagem: "Erro ao excluir academia."
        });
    }
});

export default app;
