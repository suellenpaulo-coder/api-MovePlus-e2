
import { z } from "zod";

// VALIDAÇÃO DOS DADOS DO ALUNO
export const alunoSchema = z.object({
    id: z.coerce.number().int().positive().optional(),

    name: z.string()
        .trim()
        .min(3, "O nome deve ter pelo menos 3 caracteres")
});


export const alunoAtualizacaoSchema = alunoSchema
    .partial()
    .refine((dados) => Object.keys(dados).length > 0, {
        message: "Informe pelo menos um campo para atualizar"
    });
