import { number } from "zod";
import Exercicio from "../models/exercicios.js";
import type {ExercicioRepository, ExercicioDTO} from "./ExercicioRepository.js";

export class MongoExercicioRepository implements ExercicioRepository {
    static async listar() {
        return await Exercicio.find({});
    }

    static async buscarPorId(id: string) {
        return await Exercicio.findById(id);
    }

    async cadastrar(dados: ExercicioDTO){
        return await Exercicio.create({
                        id: Number(dados.id),
                        alunoId: dados.alunoId,
                        name: dados.name,
                        muscleGroup: dados.muscleGroup,
                        date: new Date(dados.date),
                        sets: Number(dados.sets),
                        repetitions: Number(dados.repetitions),
                        weight: Number(dados.weight),
                        notes: dados.notes
                    });
    }
}