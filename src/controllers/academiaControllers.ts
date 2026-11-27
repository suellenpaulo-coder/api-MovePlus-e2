
import type { Request, Response } from "express";

import type {
    AcademiaDTO,
    IAcademiaRepository
} from "../repositories/IAcademiaRepository.js";

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

    private repository: IAcademiaRepository;

    constructor(repository: IAcademiaRepository) {
        this.repository = repository;
    }

    // GET - LISTAR TODAS AS ACADEMIAS
    listar = async (req: Request, res: Response) => {
        try {
            const academias = await this.repository.listar();

            return res.status(200).json(academias);
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao consultar academias."
            });
        }
    }

    // GET - BUSCAR ACADEMIA PELO ID
    buscar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const numeroId = Number(id);

            if (
                typeof id !== "string" ||
                !Number.isInteger(numeroId) ||
                numeroId <= 0
            ) {
                return res.status(400).json({
                    mensagem: "ID inválido."
                });
            }

            const academia = await this.repository.buscarPorId(id);

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
    cadastrar = async (req: Request, res: Response) => {
        try {
            const dados = req.body;

            if (!dados || typeof dados !== "object" || Array.isArray(dados)) {
                return res.status(400).json({
                    mensagem: "Envie os dados da academia em formato JSON."
                });
            }

            const camposObrigatorios = camposAcademia;

            for (const campo of camposObrigatorios) {
                if (dados[campo] === undefined || dados[campo] === null) {
                    return res.status(400).json({
                        mensagem: `O campo ${campo} é obrigatório.`
                    });
                }
            }

            const academias = await this.repository.listar();

            const maiorId = academias.reduce(
                (maior, academia) => Math.max(maior, academia.id),
                0
            );

            const novoId = maiorId + 1;

            const dadosPermitidos = Object.fromEntries(
                Object.entries(dados).filter(([campo]) =>
                    camposAcademia.includes(
                        campo as typeof camposAcademia[number]
                    )
                )
            );

            const novaAcademia: AcademiaDTO = {
                ...dadosPermitidos,
                id: novoId
            } as AcademiaDTO;

            const resultado = await this.repository.cadastrar(novaAcademia);

            return res.status(201).json({
                mensagem: "Academia cadastrada com sucesso!",
                academia: resultado[0]
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao cadastrar academia."
            });
        }
    }

    // PUT - ATUALIZAR TODOS OS DADOS DA ACADEMIA
    atualizar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const numeroId = Number(id);

            if (
                typeof id !== "string" ||
                !Number.isInteger(numeroId) ||
                numeroId <= 0
            ) {
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

            const dadosAtualizados: AcademiaDTO = {
                ...atualizacao,
                id: numeroId
            } as AcademiaDTO;

            const resultado = await this.repository.atualizar(
                id,
                dadosAtualizados
            );

            if (resultado.length === 0) {
                return res.status(404).json({
                    mensagem: "Academia não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Academia atualizada com sucesso!",
                academia: resultado[0]
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao atualizar academia."
            });
        }
    }

    // PATCH - ATUALIZAR PARCIALMENTE A ACADEMIA
    atualizarParcialmente = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const numeroId = Number(id);

            if (
                typeof id !== "string" ||
                !Number.isInteger(numeroId) ||
                numeroId <= 0
            ) {
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
                    camposAcademia.includes(
                        campo as typeof camposAcademia[number]
                    )
                )
            ) as Partial<AcademiaDTO>;

            if (Object.keys(atualizacao).length === 0) {
                return res.status(400).json({
                    mensagem: "Informe pelo menos um campo válido para atualizar."
                });
            }

            const academiaAtualizada =
                await this.repository.atualizarParcial(id, atualizacao);

            if (!academiaAtualizada || academiaAtualizada.length === 0) {
                return res.status(404).json({
                    mensagem: "Academia não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Academia atualizada parcialmente!",
                academia: academiaAtualizada[0]
            });
        } catch (error) {
            console.error(error);

            return res.status(500).json({
                mensagem: "Erro ao atualizar academia."
            });
        }
    }

    // DELETE - EXCLUIR ACADEMIA
    deletar = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const numeroId = Number(id);

            if (
                typeof id !== "string" ||
                !Number.isInteger(numeroId) ||
                numeroId <= 0
            ) {
                return res.status(400).json({
                    mensagem: "ID inválido."
                });
            }

            const excluida = await this.repository.deletar(id);

            if (!excluida) {
                return res.status(404).json({
                    mensagem: "Academia não encontrada."
                });
            }

            return res.status(200).json({
                mensagem: "Academia excluída com sucesso!"
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
