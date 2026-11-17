
import type { Request, Response } from "express";
import Aluno from "../models/alunos.js";

class AlunosController {

    // GET - LISTAR TODOS OS ALUNOS COM FILTROS DINÂMICOS
    static async listar(req: Request, res: Response) {
        try {
            const filtros: { id?: number; name?: RegExp } = {};
            const { id, name } = req.query;

            // FILTRO POR ID
            if (typeof id === "string") {
                const idNumero = Number(id);

                if (!Number.isInteger(idNumero) || idNumero <= 0) {
                    return res.status(400).json({
                        mensagem: "Informe um ID válido"
                    });
                }

                filtros.id = idNumero;
            }

            // FILTRO POR NOME
            if (typeof name === "string") {
                const nomeLimpo = name.trim();

                if (nomeLimpo.length > 0) {
                    const nomeEscapado = nomeLimpo.replace(
                        /[.*+?^${}()|[\]\\]/g,
                        "\\$&"
                    );

                    filtros.name = new RegExp(nomeEscapado, "i");
                }
            }

            const listaAlunos = await Aluno.find(filtros);

            console.log("FILTROS RECEBIDOS:", req.query);
            console.log("FILTROS APLICADOS:", filtros);
            console.log("ALUNOS ENCONTRADOS:", listaAlunos);

            return res.status(200).json(listaAlunos);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao buscar alunos"
            });
        }
    }

    // GET - BUSCAR UM ÚNICO ALUNO PELO ID
    static async buscar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "Informe um ID válido"
                });
            }

            const aluno = await Aluno.findOne({ id });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao buscar aluno"
            });
        }
    }

    // POST - CADASTRAR ALUNO
    static async cadastrar(req: Request, res: Response) {
        try {
            const { id, name } = req.body;

            const novoAluno = await Aluno.create({
                id,
                name
            });

            return res.status(201).json(novoAluno);

        } catch (error) {
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao cadastrar aluno"
            });
        }
    }

    // PUT - ATUALIZAR ALUNO COMPLETAMENTE
    static async atualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "Informe um ID válido"
                });
            }

            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    mensagem: "O nome do aluno é obrigatório"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id },
                { $set: { name } },
                { new: true, runValidators: true }
            );

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);

        } catch (error) {
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE UM ALUNO
    static async atualizarParcialmente(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const { name } = req.body;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "Informe um ID válido"
                });
            }

            if (typeof name !== "string" || !name.trim()) {
                return res.status(400).json({
                    mensagem: "Informe um nome válido para atualização"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id },
                { $set: { name } },
                { new: true, runValidators: true }
            );

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);

        } catch (error) {
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // DELETE - DELETAR ALUNO
    static async deletar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "Informe um ID válido"
                });
            }

            const aluno = await Aluno.findOneAndDelete({ id });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json({
                mensagem: "Aluno deletado com sucesso"
            });

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao deletar aluno"
            });
        }
    }
}

export default AlunosController;
