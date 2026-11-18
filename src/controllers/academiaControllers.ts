
import type { Request, Response } from "express";
import Academia from "../models/academia.js";

// CAMPOS PERMITIDOS PARA CADASTRO E ATUALIZAÇÃO
const camposAcademia = [
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
] as const;

class AcademiaController {

    // GET - LISTAR TODAS AS ACADEMIAS
    static async listar(req: Request, res: Response) {
        try {
            const academias = await Academia.find();

            return res.status(200).json(academias);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao consultar academias."
            });
        }
    }

    // GET - BUSCAR ACADEMIA PELO ID
    static async buscar(req: Request, res: Response) {
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
    }

    // POST - CADASTRAR ACADEMIA
    static async cadastrar(req: Request, res: Response) {
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

            const dadosPermitidos = Object.fromEntries(
                Object.entries(dados).filter(([campo]) =>
                    camposAcademia.includes(campo as typeof camposAcademia[number])
                )
            );

            const novaAcademia = await Academia.create({
                ...dadosPermitidos,
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
    }

    // PUT - ATUALIZAR TODOS OS DADOS DA ACADEMIA
    static async atualizar(req: Request, res: Response) {
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

            const atualizacao = Object.fromEntries(
                camposAcademia.map(campo => [campo, dados[campo]])
            );

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
    }

    // PATCH - ATUALIZAR PARCIALMENTE A ACADEMIA
    static async atualizarParcialmente(req: Request, res: Response) {
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

            const atualizacao = Object.fromEntries(
                Object.entries(dados).filter(([campo]) =>
                    camposAcademia.includes(campo as typeof camposAcademia[number])
                )
            );

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
    }

    // DELETE - EXCLUIR ACADEMIA
    static async deletar(req: Request, res: Response) {
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
    }
}

export default AcademiaController;
