
import mongoose, { Schema, type InferSchemaType } from "mongoose";

// DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const exercicioSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        alunoId: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        muscleGroup: {
            type: String,
            required: true,
            trim: true
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        },
        sets: {
            type: Number,
            required: true,
            min: 1
        },
        repetitions: {
            type: Number,
            required: true,
            min: 1
        },
        weight: {
            type: Number,
            required: false,
            min: 0
        },
        notes: {
            type: String,
            required: false,
            trim: true
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// EXTRAÇÃO AUTOMÁTICA DO TIPO
export type InterfaceExercicio = InferSchemaType<typeof exercicioSchema>;

// CRIAÇÃO DO MODEL (MONGOOSE)
const Exercicio = mongoose.model("Exercicio", exercicioSchema);

// DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Exercicio;
