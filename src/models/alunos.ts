
import mongoose, { Schema, type InferSchemaType } from "mongoose";

// DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const alunoSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// EXTRAÇÃO AUTOMÁTICA DO TIPO
export type InterfaceAluno = InferSchemaType<typeof alunoSchema>;

// CRIAÇÃO DO MODEL (MONGOOSE)
const Aluno = mongoose.model("Aluno", alunoSchema);

// DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Aluno;
