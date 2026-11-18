
import type { Request, Response, NextFunction, RequestHandler } from "express";
import type { z } from "zod";

// MIDDLEWARE PARA VALIDAR OS DADOS RECEBIDOS
const validarSchema = (schema: z.ZodType): RequestHandler => {
    return (req: Request, res: Response, next: NextFunction) => {

        // VERIFICANDO OS DADOS RECEBIDOS
        console.log("CONTENT-TYPE:", req.headers["content-type"]);
        console.log("BODY RECEBIDO:", req.body);

        // VALIDANDO OS DADOS COM ZOD
        const resultado = schema.safeParse(req.body);

        // SE OS DADOS FOREM INVÁLIDOS
        if (!resultado.success) {
            return res.status(400).json({
                mensagem: "Dados inválidos",
                erros: resultado.error.issues.map((erro) => erro.message)
            });
        }

        // SE OS DADOS FOREM VÁLIDOS
        req.body = resultado.data;

        next();
    };
};

export default validarSchema;
