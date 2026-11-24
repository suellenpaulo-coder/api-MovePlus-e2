
import { z } from "zod";

// VALIDAÇÃO DOS DADOS DO EXERCÍCIO
export const exercicioSchema = z.object({
    id: z.coerce.number().int().positive().optional(),

    alunoId: z.coerce.number()
        .int()
        .positive("O ID do aluno deve ser positivo"),

    name: z.string()
        .trim()
        .min(1, "O nome do exercício é obrigatório"),

    muscleGroup: z.string()
        .trim()
        .min(1, "O grupo muscular é obrigatório"),

    date: z.coerce.date().optional(),

    sets: z.coerce.number()
        .int()
        .min(1, "Deve haver pelo menos uma série"),

    repetitions: z.coerce.number()
        .int()
        .min(1, "Deve haver pelo menos uma repetição"),

    weight: z.coerce.number()
        .min(0, "O peso não pode ser negativo")
        .optional(),

    notes: z.string()
        .trim()
        .optional()
});

export const exercicioAtualizacaoSchema = exercicioSchema
    .partial()
    .refine((dados) => Object.keys(dados).length > 0, {
        message: "Informe pelo menos um campo para atualizar"
    });
