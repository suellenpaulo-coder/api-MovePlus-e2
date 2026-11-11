import mongoose, { Schema } from "mongoose";
import type { InferSchemaType } from "mongoose";

// INTERFACE ALINHADA COM AS PROPRIEDADES USADAS NO APP.TS

// export interface IAlunos extends Document {
//     id: number;
//     name: string;
    

// }

// definicao de schema mapeado os campos 

const AlunoSchema: Schema = new Schema({
    id: { type: Number, required: true},
    name: { type: String, required: true},
    plans: { type: String, required: true},
    createdAt: { type: Date, required: true},
    activities: { type: String, required: true},
    phone: { type: String, required: true},

  },
  { versionKey: false}

);

// extracao automatica do tipo ( substituir s criacao manual da interface)

  export type IAlunos = InferSchemaType<typeof AlunoSchema>;

  // criacao do model ( mongoose)

    const Aluno = mongoose.model(" Alonos", AlunoSchema);


// disponibiliza o modulo para ser importado em outros arquivos
    
    export default Aluno;
