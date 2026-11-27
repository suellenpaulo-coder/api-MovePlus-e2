
import { z } from "zod";

// VALIDAÇÃO DOS DADOS DA ACADEMIA
export const academiaSchema = z.object({
    id: z.coerce.number().int().positive().optional(),

    name: z.string()
        .trim()
        .min(1, "O nome da academia é obrigatório"),

    plans: z.string()
        .trim()
        .min(1, "Os planos são obrigatórios"),

    activities: z.string()
        .trim()
        .min(1, "As atividades são obrigatórias"),

    phone: z.string()
        .trim()
        .min(1, "O telefone é obrigatório"),

    description: z.string()
        .trim()
        .min(1, "A descrição é obrigatória"),

    cnpj: z.string()
        .trim()
        .min(1, "O CNPJ é obrigatório"),

    email: z.string()
        .trim()
        .email("E-mail inválido"),

    address: z.string()
        .trim()
        .min(1, "O endereço é obrigatório"),

    openingHours: z.string()
        .trim()
        .min(1, "O horário de funcionamento é obrigatório"),

    isActive: z.coerce.boolean().optional(),

    modalities: z.array(z.string().trim().min(1))
        .min(1, "Informe pelo menos uma modalidade"),

    capacity: z.coerce.number()
        .int()
        .positive("A capacidade deve ser positiva")
});

export const academiaAtualizacaoSchema = academiaSchema
    .partial()
    .refine((dados) => Object.keys(dados).length > 0, {
        message: "Informe pelo menos um campo para atualizar"
    });
