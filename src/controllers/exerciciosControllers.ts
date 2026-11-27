
import type { Request, Response } from "express";
import Aluno from "../models/alunos.js";

import type {
    ExercicioDTO,
    IExercicioRepository
} from "../repositories/IExercicioRepository.js";

class ExerciciosController {

    private repository: IExercicioRepository;

    constructor(repository: IExercicioRepository) {
        this.repository = repository;
    }

    // GET - LISTAR TODOS OS EXERCÍCIOS
    listar = async (req: Request, res: Response) => {
        try {
            const listaExercicios = await this.repository.listar();

            return res.status(200).json(listaExercicios);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios"
            });
        }
    }

    // GET - LISTAR EXERCÍCIOS DE UM ALUNO
    listarPorAluno = async (req: Request, res: Response) => {
        try {
            const { alunoId } = req.params;

            if (typeof alunoId !== "string") {
                return res.status(400).json({
                    mensagem: "ID do aluno inválido"
                });
            }

            const aluno = await Aluno.findOne({
                id: Number(alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            const exercicios = await this.repository.buscarPorFiltro({
                alunoId: Number(alunoId)
            });

            return res.status(200).json(exercicios);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios do aluno"
            });
        }
    }

    // GET - BUSCAR EXERCÍCIO PELO ID
    buscar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID do exercício inválido"
                });
            }

            const exercicio = await this.repository.buscarPorId(id);

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
    cadastrar = async (req: Request, res: Response) => {
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

            const dados: ExercicioDTO = {
                id: Number(id),
                alunoId: Number(alunoId),
                name,
                muscleGroup,
                date: date ? new Date(date) : new Date(),
                sets: Number(sets),
                repetitions: Number(repetitions),
                ...(weight !== undefined && weight !== null
                    ? { weight: Number(weight) }
                    : {}),
                ...(notes !== undefined ? { notes } : {})
            };

            const novoExercicio = await this.repository.cadastrar(dados);

            return res.status(201).json(novoExercicio[0]);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao registrar exercício"
            });
        }
    }

    // PUT - ATUALIZAR EXERCÍCIO COMPLETAMENTE
    atualizar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const dados = req.body;

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID do exercício inválido"
                });
            }

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

            const exercicioDados: ExercicioDTO = {
                id: Number(id),
                alunoId: Number(dados.alunoId),
                name: dados.name,
                muscleGroup: dados.muscleGroup,
                date: dados.date ? new Date(dados.date) : new Date(),
                sets: Number(dados.sets),
                repetitions: Number(dados.repetitions),
                ...(dados.weight !== undefined && dados.weight !== null
                    ? { weight: Number(dados.weight) }
                    : {}),
                ...(dados.notes !== undefined
                    ? { notes: dados.notes }
                    : {})
            };

            const exercicio = await this.repository.atualizar(
                id,
                exercicioDados
            );

            if (exercicio.length === 0) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio[0]);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // PATCH - ATUALIZAR EXERCÍCIO PARCIALMENTE
    atualizarParcialmente = async (
        req: Request,
        res: Response
    ) => {
        try {
            const { id } = req.params;
            const dados = req.body;

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID do exercício inválido"
                });
            }

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
            ) as Record<string, unknown>;

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

                atualizacoes.alunoId = Number(atualizacoes.alunoId);
            }

            if (atualizacoes.date !== undefined) {
                atualizacoes.date = new Date(String(atualizacoes.date));
            }

            if (atualizacoes.sets !== undefined) {
                atualizacoes.sets = Number(atualizacoes.sets);
            }

            if (atualizacoes.repetitions !== undefined) {
                atualizacoes.repetitions = Number(atualizacoes.repetitions);
            }

            if (atualizacoes.weight !== undefined) {
                atualizacoes.weight = Number(atualizacoes.weight);
            }

            const exercicio = await this.repository.atualizarParcial(
                id,
                atualizacoes as Partial<ExercicioDTO>
            );

            if (!exercicio || exercicio.length === 0) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio[0]);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // DELETE - DELETAR EXERCÍCIO
    deletar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID do exercício inválido"
                });
            }

            const deletado = await this.repository.deletar(id);

            if (!deletado) {
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
