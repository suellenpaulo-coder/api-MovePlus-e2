import type { Request, Response } from "express";
import Aluno from "../models/alunos.js";

class AlunosController {
    // GET - LISTAR TODOS OS ALUNOS
    static async listar(req: Request, res: Response) {
        try {
            const listaAlunos = await Aluno.find({});

            return res.status(200).json(listaAlunos);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar alunos"
            });
        }
    }

    // GET - BUSCAR UM ÚNICO ALUNO PELO ID
    static async buscar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const aluno = await Aluno.findOne({ id: Number(id) });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar aluno"
            });
        }
    }

    // POST - CADASTRAR ALUNO
    static async cadastrar(req: Request, res: Response) {
        try {
            const { id, name } = req.body;

            const novoAluno = await Aluno.create({ id, name });

            return res.status(201).json(novoAluno);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao cadastrar aluno"
            });
        }
    }

    // PUT - ATUALIZAR ALUNO COMPLETAMENTE
    static async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    mensagem: "O nome do aluno é obrigatório"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id: Number(id) },
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
            return res.status(400).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE UM ALUNO
    static async atualizarParcialmente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name } = req.body;

            if (!name) {
                return res.status(400).json({
                    mensagem: "Informe o nome para atualização"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id: Number(id) },
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
            return res.status(400).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // DELETE - DELETAR ALUNO
    static async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const aluno = await Aluno.findOneAndDelete({
                id: Number(id)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json({
                mensagem: "Aluno deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao deletar aluno"
            });
        }
    }
}

export default AlunosController;