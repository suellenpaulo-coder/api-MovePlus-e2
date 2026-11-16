
import mongoose, { Schema } from "mongoose";

const alunoSchema = new Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
});

const Aluno = mongoose.model("Aluno", alunoSchema);

export default Aluno;

