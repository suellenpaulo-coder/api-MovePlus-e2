import mongoose, {Schema, Document} from "mongoose";

// INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS

export interface IAcademia extends Document {
    title: string;
    description: string;
    analise: string;
}