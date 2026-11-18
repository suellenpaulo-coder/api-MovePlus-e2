import mongoose, { Schema, type InferSchemaType } from "mongoose";

// DEFINIÇÃO DO SCHEMA MAPEANDO OS CAMPOS
const AcademiaSchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true,
            default: 1
        },
        name: {
            type: String,
            required: true,
            trim: true
        },
        plans: {
            type: String,
            required: true,
            trim: true
        },
        activities: {
            type: String,
            required: true,
            trim: true
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        cnpj: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        address: {
            type: String,
            required: true,
            trim: true
        },
        openingHours: {
            type: String,
            required: true,
            trim: true
        },
        isActive: {
            type: Boolean,
            required: true,
            default: true
        },
        modalities: {
            type: [String],
            required: true
        },
        capacity: {
            type: Number,
            required: true,
            min: 1
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
);

// EXTRAÇÃO AUTOMÁTICA DO TIPO
export type IAcademia = InferSchemaType<typeof AcademiaSchema>;

// CRIAÇÃO DO MODEL (MONGOOSE)
const Academia = mongoose.model("Academia", AcademiaSchema);

// DISPONIBILIZA O MÓDULO PARA SER IMPORTADO EM OUTROS ARQUIVOS
export default Academia;