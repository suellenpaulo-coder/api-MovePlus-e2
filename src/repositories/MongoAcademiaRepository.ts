
import Academia from "../models/academia.js";

import type {
    AcademiaDTO,
    FiltroAcademiaDTO,
    IAcademiaRepository
} from "./IAcademiaRepository.js";

class MongoAcademiaRepository implements IAcademiaRepository {

    // LISTAR TODAS AS ACADEMIAS
    async listar(): Promise<any[]> {
        return await Academia.find({});
    }

    // BUSCAR ACADEMIA PELO ID
    async buscarPorId(id: string): Promise<any | null> {
        return await Academia.findOne({
            id: Number(id)
        });
    }

    // BUSCAR ACADEMIA POR FILTRO
    async buscarPorFiltro(
        filtros: FiltroAcademiaDTO
    ): Promise<any[]> {
        return await Academia.find(filtros);
    }

    // CADASTRAR ACADEMIA
    async cadastrar(dados: AcademiaDTO): Promise<any[]> {
        const novaAcademia = await Academia.create(dados);
        return [novaAcademia];
    }

    // ATUALIZAR ACADEMIA COMPLETAMENTE
    async atualizar(
        id: string,
        dados: AcademiaDTO
    ): Promise<any[]> {
        const academia = await Academia.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return academia ? [academia] : [];
    }

    // ATUALIZAR ACADEMIA PARCIALMENTE
    async atualizarParcial(
        id: string,
        dados: Partial<AcademiaDTO>
    ): Promise<any[] | null> {
        const academia = await Academia.findOneAndUpdate(
            { id: Number(id) },
            { $set: dados },
            { new: true, runValidators: true }
        );

        return academia ? [academia] : null;
    }

    // DELETAR ACADEMIA
    async deletar(id: string): Promise<boolean> {
        const academia = await Academia.findOneAndDelete({
            id: Number(id)
        });

        return academia !== null;
    }
}

export default MongoAcademiaRepository;
