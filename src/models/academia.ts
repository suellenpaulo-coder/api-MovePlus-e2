
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
      required: true,
      trim: true
    },

    plans: {
      type: String,
      required: true,
      trim: true
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now
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
      trim: true
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
      required: true
    },

    modalities: {
      type: [String],
      required: true,
      default: []
    },

    capacity: {
      type: Number,
      required: true,
      min: 0
    }
  },
  {
    versionKey: false
  }
);

export type IAcademia = InferSchemaType<typeof AcademySchema>;

const Academia = mongoose.model("Academia", AcademySchema);

export default Academia;
