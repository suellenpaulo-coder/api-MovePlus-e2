
import Exercicio from "../models/exercicios.js";

import type {
    ExercicioDTO,
    FiltroExercicioDTO,
    IExercicioRepository
} from "./IExercicioRepository.js";

class MongoExercicioRepository implements IExercicioRepository {

    async listar(): Promise<any[]> {
        return await Exercicio.find({});
    }

    async buscarPorId(id: string): Promise<any | null> {
        return await Exercicio.findOne({ id: Number(id) });
    }

    async buscarPorFiltro(
        filtros: FiltroExercicioDTO
    ): Promise<any[]> {
        return await Exercicio.find(filtros);
    }

    async cadastrar(dados: ExercicioDTO): Promise<any[]> {
        const novoExercicio = await Exercicio.create(dados);
        return [novoExercicio];
    }

    async atualizar(
        id: string,
        dados: ExercicioDTO
    ): Promise<any[]> {
        const exercicio = await Exercicio.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return exercicio ? [exercicio] : [];
    }

    async atualizarParcial(
        id: string,
        dados: Partial<ExercicioDTO>
    ): Promise<any[] | null> {
        const exercicio = await Exercicio.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return exercicio ? [exercicio] : null;
    }

    async deletar(id: string): Promise<boolean> {
        const exercicio = await Exercicio.findOneAndDelete({
            id: Number(id)
        });

        return exercicio !== null;
    }
}

export default MongoExercicioRepository;
