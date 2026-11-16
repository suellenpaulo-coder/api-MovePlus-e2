
import express from "express";
import type { Request, Response } from "express";
import Academia from "./models/academia.js";

const app = express();

app.use(express.json());

// Campos permitidos para atualização
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

// Validar ID
function obterId(valor: string): number | null {
  const id = Number(valor);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

// Validar dados da academia
function validarDados(dados: any, completo: boolean): string | null {
  if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
    return "Envie os dados em formato JSON.";
  }

  if (completo) {
    for (const campo of camposAcademia) {
      if (dados[campo] === undefined || dados[campo] === null) {
        return `O campo ${campo} é obrigatório.`;
      }
    }
  }

  if ("name" in dados &&
    (typeof dados.name !== "string" || !dados.name.trim())) {
    return "Nome inválido.";
  }

  if ("plans" in dados && typeof dados.plans !== "string") {
    return "O campo plans deve ser um texto.";
  }

  if ("createdAt" in dados &&
    Number.isNaN(Date.parse(String(dados.createdAt)))) {
    return "Data de criação inválida.";
  }

  if ("activities" in dados && typeof dados.activities !== "string") {
    return "O campo activities deve ser um texto.";
  }

  if ("phone" in dados && typeof dados.phone !== "string") {
    return "Telefone inválido.";
  }

  if ("description" in dados && typeof dados.description !== "string") {
    return "Descrição inválida.";
  }

  if ("cnpj" in dados && typeof dados.cnpj !== "string") {
    return "CNPJ inválido.";
  }

  if ("email" in dados &&
    (typeof dados.email !== "string" ||
      !/^\S+@\S+\.\S+$/.test(dados.email))) {
    return "E-mail inválido.";
  }

  if ("address" in dados && typeof dados.address !== "string") {
    return "Endereço inválido.";
  }

  if ("openingHours" in dados && typeof dados.openingHours !== "string") {
    return "Horário de funcionamento inválido.";
  }

  if ("isActive" in dados && typeof dados.isActive !== "boolean") {
    return "isActive deve ser verdadeiro ou falso.";
  }

  if ("modalities" in dados &&
    (!Array.isArray(dados.modalities) ||
      !dados.modalities.every((item: unknown) => typeof item === "string"))) {
    return "Modalities deve ser uma lista de textos.";
  }

  if ("capacity" in dados &&
    (typeof dados.capacity !== "number" ||
      !Number.isFinite(dados.capacity) ||
      dados.capacity < 0)) {
    return "A capacidade deve ser um número maior ou igual a zero.";
  }

  return null;
}

// ROTA INICIAL
app.get("/", (_req: Request, res: Response) => {
  return res.status(200).send("MovePlus funcionando!");
});

// GET - LISTAR TODAS AS ACADEMIAS
app.get("/academias", async (_req: Request, res: Response) => {
  try {
    const academias = await Academia.find().sort({ id: 1 });

    return res.status(200).json(academias);
  } catch (error) {
    console.error("Erro ao listar academias:", error);

    return res.status(500).json({
      mensagem: "Erro ao consultar academias."
    });
  }
});

// GET - BUSCAR ACADEMIA POR ID
app.get("/academias/:id", async (req: Request, res: Response) => {
  const id = obterId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      mensagem: "ID inválido."
    });
  }

  try {
    const academia = await Academia.findOne({ id });

    if (!academia) {
      return res.status(404).json({
        mensagem: "Academia não encontrada."
      });
    }

    return res.status(200).json(academia);
  } catch (error) {
    console.error("Erro ao buscar academia:", error);

    return res.status(500).json({
      mensagem: "Erro ao buscar academia."
    });
  }
});

// POST - CADASTRAR ACADEMIA
app.post("/academias", async (req: Request, res: Response) => {
  const erro = validarDados(req.body, true);

  if (erro) {
    return res.status(400).json({
      mensagem: erro
    });
  }

  try {
    const ultimaAcademia = await Academia.findOne().sort({ id: -1 });

    const novoId = ultimaAcademia
      ? ultimaAcademia.id + 1
      : 1;

    const novaAcademia = await Academia.create({
      ...req.body,
      id: novoId
    });

    return res.status(201).json({
      mensagem: "Academia cadastrada com sucesso!",
      academia: novaAcademia
    });
  } catch (error) {
    console.error("Erro ao cadastrar academia:", error);

    return res.status(500).json({
      mensagem: "Erro ao cadastrar academia."
    });
  }
});

// PUT - ATUALIZAR TODOS OS DADOS
app.put("/academias/:id", async (req: Request, res: Response) => {
  const id = obterId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      mensagem: "ID inválido."
    });
  }

  const erro = validarDados(req.body, true);

  if (erro) {
    return res.status(400).json({
      mensagem: erro
    });
  }

  try {
    const dadosAtualizados: Record<string, unknown> = {};

    for (const campo of camposAcademia) {
      dadosAtualizados[campo] = req.body[campo];
    }

    const academia = await Academia.findOneAndUpdate(
      { id },
      { $set: dadosAtualizados },
      {
        new: true,
        runValidators: true
      }
    );

    if (!academia) {
      return res.status(404).json({
        mensagem: "Academia não encontrada."
      });
    }

    return res.status(200).json({
      mensagem: "Academia atualizada com sucesso!",
      academia
    });
  } catch (error) {
    console.error("Erro ao atualizar academia:", error);

    return res.status(500).json({
      mensagem: "Erro ao atualizar academia."
    });
  }
});

// PATCH - ATUALIZAR PARTE DOS DADOS
app.patch("/academias/:id", async (req: Request, res: Response) => {
  const id = obterId(req.params.id);

  if (id === null) {
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

  const camposRecebidos = Object.keys(dados);

  if (camposRecebidos.length === 0) {
    return res.status(400).json({
      mensagem: "Informe pelo menos um campo para atualizar."
    });
  }

  const campoInvalido = camposRecebidos.find(
    campo => !camposAcademia.includes(campo as typeof camposAcademia[number])
  );

  if (campoInvalido) {
    return res.status(400).json({
      mensagem: `Campo não permitido: ${campoInvalido}`
    });
  }

  const erro = validarDados(dados, false);

  if (erro) {
    return res.status(400).json({
      mensagem: erro
    });
  }

  try {
    const academia = await Academia.findOneAndUpdate(
      { id },
      { $set: dados },
      {
        new: true,
        runValidators: true
      }
    );

    if (!academia) {
      return res.status(404).json({
        mensagem: "Academia não encontrada."
      });
    }

    return res.status(200).json({
      mensagem: "Academia atualizada parcialmente!",
      academia
    });
  } catch (error) {
    console.error("Erro ao atualizar academia:", error);

    return res.status(500).json({
      mensagem: "Erro ao atualizar academia."
    });
  }
});

// DELETE - EXCLUIR ACADEMIA
app.delete("/academias/:id", async (req: Request, res: Response) => {
  const id = obterId(req.params.id);

  if (id === null) {
    return res.status(400).json({
      mensagem: "ID inválido."
    });
  }

  try {
    const academia = await Academia.findOneAndDelete({ id });

    if (!academia) {
      return res.status(404).json({
        mensagem: "Academia não encontrada."
      });
    }

    return res.status(200).json({
      mensagem: "Academia excluída com sucesso!",
      academia
    });
  } catch (error) {
    console.error("Erro ao excluir academia:", error);

    return res.status(500).json({
      mensagem: "Erro ao excluir academia."
    });
  }
});

export default app;
