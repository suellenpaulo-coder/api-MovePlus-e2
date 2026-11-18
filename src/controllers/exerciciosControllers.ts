import type { Request, Response } from "express";
import Exercicio from "../models/exercicios.ts";
import Aluno from "../models/alunos.js";

class ExerciciosController {
    // GET - LISTAR TODOS OS EXERCÍCIOS
    static async listar(req: Request, res: Response) {
        try {
            const listaExercicios = await Exercicio.find({});

            return res.status(200).json(listaExercicios);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios"
            });
        }
    }

    // GET - LISTAR EXERCÍCIOS DE UM ALUNO
    static async listarPorAluno(req: Request, res: Response) {
        try {
            const { alunoId } = req.params;

            const aluno = await Aluno.findOne({
                id: Number(alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            const exercicios = await Exercicio.find({
                alunoId: Number(alunoId)
            });

            return res.status(200).json(exercicios);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios do aluno"
            });
        }
    }

    // GET - BUSCAR UM EXERCÍCIO PELO ID
    static async buscar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const exercicio = await Exercicio.findOne({
                id: Number(id)
            });

            if (!exercicio) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar exercício"
            });
        }
    }

    // POST - REGISTRAR EXERCÍCIO
    static async cadastrar(req: Request, res: Response) {
        try {
            const {
                id,
                alunoId,
                name,
                muscleGroup,
                date,
                sets,
                repetitions,
                weight,
                notes
            } = req.body;

            const aluno = await Aluno.findOne({
                id: Number(alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            const novoExercicio = await Exercicio.create({
                id,
                alunoId,
                name,
                muscleGroup,
                date,
                sets,
                repetitions,
                weight,
                notes
            });

            return res.status(201).json(novoExercicio);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao registrar exercício"
            });
        }
    }

    // PUT - ATUALIZAR EXERCÍCIO COMPLETAMENTE
    static async atualizar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const dados = req.body;

            if (
                !dados.alunoId ||
                !dados.name ||
                !dados.muscleGroup ||
                !dados.sets ||
                !dados.repetitions
            ) {
                return res.status(400).json({
                    mensagem: "Informe os dados obrigatórios do exercício"
                });
            }

            const aluno = await Aluno.findOne({
                id: Number(dados.alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            const exercicio = await Exercicio.findOneAndUpdate(
                { id: Number(id) },
                { $set: dados },
                { new: true, runValidators: true }
            );

            if (!exercicio) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE UM EXERCÍCIO
    static async atualizarParcialmente(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const dados = req.body;

            const camposPermitidos = [
                "alunoId",
                "name",
                "muscleGroup",
                "date",
                "sets",
                "repetitions",
                "weight",
                "notes"
            ];

            const atualizacoes = Object.fromEntries(
                Object.entries(dados).filter(([campo]) =>
                    camposPermitidos.includes(campo)
                )
            );

            if (Object.keys(atualizacoes).length === 0) {
                return res.status(400).json({
                    mensagem: "Nenhum campo válido foi informado"
                });
            }

            if (atualizacoes.alunoId !== undefined) {
                const aluno = await Aluno.findOne({
                    id: Number(atualizacoes.alunoId)
                });

                if (!aluno) {
                    return res.status(404).json({
                        mensagem: "Aluno não encontrado"
                    });
                }
            }

            const exercicio = await Exercicio.findOneAndUpdate(
                { id: Number(id) },
                { $set: atualizacoes },
                { new: true, runValidators: true }
            );

            if (!exercicio) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // DELETE - DELETAR EXERCÍCIO
    static async deletar(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const exercicio = await Exercicio.findOneAndDelete({
                id: Number(id)
            });

            if (!exercicio) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json({
                mensagem: "Exercício deletado com sucesso"
            });
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao deletar exercício"
            });
        }
    }
}

export default ExerciciosController;