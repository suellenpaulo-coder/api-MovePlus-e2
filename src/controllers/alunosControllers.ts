
import type { Request, Response } from "express";

import MongoAlunoRepository from "../repositories/MongoAlunoRepository.js";

import type {
    AlunoDTO
} from "../repositories/IAlunoRepository.js";

class AlunosController {

    private static repository = new MongoAlunoRepository();

    // GET - LISTAR TODOS OS ALUNOS
    static async listar(req: Request, res: Response) {
        try {
            const listaAlunos = await this.repository.listar();

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

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const aluno = await this.repository.buscarPorId(id);

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

            if (id === undefined || !name) {
                return res.status(400).json({
                    mensagem: "Informe o ID e o nome do aluno"
                });
            }

            const dados: AlunoDTO = {
                id: Number(id),
                name
            };

            const novoAluno = await this.repository.cadastrar(dados);

            return res.status(201).json(novoAluno[0]);
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

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            if (!name) {
                return res.status(400).json({
                    mensagem: "O nome do aluno é obrigatório"
                });
            }

            const dados: AlunoDTO = {
                id: Number(id),
                name
            };

            const aluno = await this.repository.atualizar(id, dados);

            if (aluno.length === 0) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno[0]);
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

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            if (!name) {
                return res.status(400).json({
                    mensagem: "Informe o nome para atualização"
                });
            }

            const aluno = await this.repository.atualizarParcial(id, {
                name
            });

            if (!aluno || aluno.length === 0) {
                return res.status(404).json({
                    mensagem: "Aluno não encontrado"
                });
            }

            return res.status(200).json(aluno[0]);
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

            if (typeof id !== "string") {
                return res.status(400).json({
                    mensagem: "ID inválido"
                });
            }

            const deletado = await this.repository.deletar(id);

            if (!deletado) {
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
