
import type { Request, Response } from "express";
import Exercicio from "../models/exercicios.js";
import Aluno from "../models/alunos.js";

class ExerciciosController {

    // GET - LISTAR TODOS OS EXERCÍCIOS COM FILTROS DINÂMICOS
    static async listar(req: Request, res: Response) {
        try {
            const filtros: Record<string, any> = {};

            // FILTRO PELO NOME DO EXERCÍCIO
            if (typeof req.query.name === "string" && req.query.name.trim()) {
                const nome = req.query.name.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                filtros.name = {
                    $regex: nome,
                    $options: "i"
                };
            }

            // FILTRO PELO GRUPO MUSCULAR
            if (typeof req.query.muscleGroup === "string" && req.query.muscleGroup.trim()) {
                const grupo = req.query.muscleGroup.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

                filtros.muscleGroup = {
                    $regex: grupo,
                    $options: "i"
                };
            }

            // FILTRO PELO ID DO ALUNO
            if (req.query.alunoId !== undefined) {
                const alunoId = Number(req.query.alunoId);

                if (!Number.isInteger(alunoId) || alunoId <= 0) {
                    return res.status(400).json({
                        mensagem: "ID do aluno inválido"
                    });
                }

                filtros.alunoId = alunoId;
            }

            // FILTRO PELA QUANTIDADE DE SÉRIES
            if (req.query.sets !== undefined) {
                const sets = Number(req.query.sets);

                if (!Number.isInteger(sets) || sets < 1) {
                    return res.status(400).json({
                        mensagem: "Quantidade de séries inválida"
                    });
                }

                filtros.sets = sets;
            }

            // FILTRO PELA QUANTIDADE DE REPETIÇÕES
            if (req.query.repetitions !== undefined) {
                const repetitions = Number(req.query.repetitions);

                if (!Number.isInteger(repetitions) || repetitions < 1) {
                    return res.status(400).json({
                        mensagem: "Quantidade de repetições inválida"
                    });
                }

                filtros.repetitions = repetitions;
            }

            // BUSCAR EXERCÍCIOS NO BANCO DE DADOS
            const listaExercicios = await Exercicio.find(filtros);

            return res.status(200).json(listaExercicios);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios"
            });
        }
    }

    // GET - LISTAR EXERCÍCIOS DE UM ALUNO
    static async listarPorAluno(req: Request, res: Response) {
        try {
            const alunoId = Number(req.params.alunoId);

            if (!Number.isInteger(alunoId) || alunoId <= 0) {
                return res.status(400).json({
                    mensagem: "ID do aluno inválido"
                });
            }

            const aluno = await Aluno.findOne({
                id: alunoId
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            const exercicios = await Exercicio.find({
                alunoId: alunoId
            });

            return res.status(200).json(exercicios);

        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao buscar exercícios do aluno"
            });
        }
    }

    // GET - BUSCAR UM EXERCÍCIO ESPECÍFICO PELO ID
    static async buscar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            // VALIDAR O ID INFORMADO
            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            // BUSCAR EXERCÍCIO NO BANCO DE DADOS
            const exercicio = await Exercicio.findOne({
                id: id
            });

            if (!exercicio) {
                return res.status(404).json({
                    mensagem: "Exercício não encontrado"
                });
            }

            return res.status(200).json(exercicio);

        } catch (error) {
            console.error(error);

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

            // VERIFICAR CAMPOS OBRIGATÓRIOS
            if (
                id === undefined ||
                alunoId === undefined ||
                typeof name !== "string" ||
                !name.trim() ||
                typeof muscleGroup !== "string" ||
                !muscleGroup.trim() ||
                sets === undefined ||
                repetitions === undefined
            ) {
                return res.status(400).json({
                    mensagem: "Informe todos os campos obrigatórios"
                });
            }

            // VERIFICAR SE O ALUNO EXISTE
            const aluno = await Aluno.findOne({
                id: Number(alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            // CADASTRAR EXERCÍCIO
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
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao registrar exercício"
            });
        }
    }

    // PUT - ATUALIZAR EXERCÍCIO COMPLETAMENTE
    static async atualizar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const dados = req.body;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            // VERIFICAR CAMPOS OBRIGATÓRIOS
            if (
                dados.alunoId === undefined ||
                typeof dados.name !== "string" ||
                !dados.name.trim() ||
                typeof dados.muscleGroup !== "string" ||
                !dados.muscleGroup.trim() ||
                dados.sets === undefined ||
                dados.repetitions === undefined
            ) {
                return res.status(400).json({
                    mensagem: "Informe os dados obrigatórios do exercício"
                });
            }

            // VERIFICAR SE O ALUNO EXISTE
            const aluno = await Aluno.findOne({
                id: Number(dados.alunoId)
            });

            if (!aluno) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            // ATUALIZAR EXERCÍCIO
            const exercicio = await Exercicio.findOneAndUpdate(
                { id: id },
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
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE UM EXERCÍCIO
    static async atualizarParcialmente(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);
            const dados = req.body;

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            // CAMPOS PERMITIDOS PARA ATUALIZAÇÃO
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

            // VERIFICAR SE O ALUNO EXISTE, CASO O ID SEJA ALTERADO
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

            // ATUALIZAR EXERCÍCIO
            const exercicio = await Exercicio.findOneAndUpdate(
                { id: id },
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
            console.error(error);

            return res.status(400).json({
                mensagem: "Erro ao atualizar exercício"
            });
        }
    }

    // DELETE - DELETAR EXERCÍCIO
    static async deletar(req: Request, res: Response) {
        try {
            const id = Number(req.params.id);

            if (!Number.isInteger(id) || id <= 0) {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const exercicio = await Exercicio.findOneAndDelete({
                id: id
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
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao deletar exercício"
            });
        }
    }
}

export default ExerciciosController;
