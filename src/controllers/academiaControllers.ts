import type { Request, Response } from "express";
import Academia from "../models/academia.ts";

class AcademiaController {
    // GET - BUSCAR DADOS DA ACADEMIA
    static async buscar(req: Request, res: Response) {
        try {
            const academia = await Academia.findOne({ id: 1 });

            if (!academia) {
                return res.status(404).json({
                    mensagem: "Dados da academia não encontrados"
                });
            }

            return res.status(200).json(academia);
        } catch (error) {
            return res.status(500).json({
                mensagem: "Erro ao buscar dados da academia"
            });
        }
    }

    // PUT - CADASTRAR OU ATUALIZAR DADOS DA ACADEMIA
    static async atualizar(req: Request, res: Response) {
        try {
            const dadosAcademia = req.body;

            const academia = await Academia.findOneAndUpdate(
                { id: 1 },
                { $set: { ...dadosAcademia, id: 1 } },
                {
                    new: true,
                    upsert: true,
                    runValidators: true,
                    setDefaultsOnInsert: true
                }
            );

            return res.status(200).json(academia);
        } catch (error) {
            return res.status(400).json({
                mensagem: "Erro ao atualizar dados da academia"
            });
        }
    }
}

export default AcademiaController;