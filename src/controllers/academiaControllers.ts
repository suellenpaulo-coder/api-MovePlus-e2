
import type { Request, Response } from 'express';
import Aluno from "../models/academia.js";

class AcademiaController {

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
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const aluno = await Aluno.findOne({ id: id });

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

            const novoAluno = await Aluno.create({
                id,
                name
            });

            return res.status(201).json(novoAluno);

        } catch (error) {
            return res.status(500).json({
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
                    mensagem: "ID inválido"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id: id },
                { name },
                { new: true, runValidators: true }
            );

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE UM ALUNO
    static async atualizarParcialmente(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const aluno = await Aluno.findOneAndUpdate(
                { id: id },
                { $set: req.body },
                { new: true, runValidators: true }
            );

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno);

        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao atualizar aluno"
            });
        }
    }

    // DELETE - DELETAR UM ALUNO
    static async deletar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const aluno = await Aluno.findOneAndDelete({ id: id });

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

export default AcademiaController;
