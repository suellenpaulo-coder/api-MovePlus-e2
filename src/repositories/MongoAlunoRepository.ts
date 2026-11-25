
import Aluno from "../models/alunos.js";

import type {
    AlunoDTO,
    FiltroAlunoDTO,
    IAlunoRepository
} from "./IAlunoRepository.js";

class MongoAlunoRepository implements IAlunoRepository {

    async listar(): Promise<any[]> {
        return await Aluno.find({});
    }

    async buscarPorId(id: string): Promise<any | null> {
        return await Aluno.findOne({ id: Number(id) });
    }

    async buscarPorFiltro(
        filtros: FiltroAlunoDTO
    ): Promise<any[]> {
        return await Aluno.find(filtros);
    }

    async cadastrar(dados: AlunoDTO): Promise<any[]> {
        const novoAluno = await Aluno.create(dados);
        return [novoAluno];
    }

    async atualizar(
        id: string,
        dados: AlunoDTO
    ): Promise<any[]> {
        const aluno = await Aluno.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return aluno ? [aluno] : [];
    }

    async atualizarParcial(
        id: string,
        dados: Partial<AlunoDTO>
    ): Promise<any[] | null> {
        const aluno = await Aluno.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return aluno ? [aluno] : null;
    }

    async deletar(id: string): Promise<boolean> {
        const aluno = await Aluno.findOneAndDelete({
            id: Number(id)
        });

        return aluno !== null;
    }
}

export default MongoAlunoRepository;
