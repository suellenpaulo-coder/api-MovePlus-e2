
import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

const AcademySchema = new Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        plans: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            required: true,
            default: Date.now
        },
        activities: {
            type: String,
            required: true
        },
        phone: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        cnpj: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        openingHours: {
            type: String,
            required: true
        },
        isActive: {
            type: Boolean,
            required: true
        },
        modalities: {
            type: [String],
            required: true
        },
        capacity: {
            type: Number,
            required: true
        }
    },
    {
        versionKey: false
    }
);

export type IAcademia = InferSchemaType<typeof AcademySchema>;

const Academia = mongoose.model("Academia", AcademySchema);

export default Academia;
