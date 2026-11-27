
import { PrismaClient } from "../generated/prisma/index.js";
import type {
    ExercicioDTO,
    FiltroExercicioDTO,
    IExercicioRepository
} from "./IExercicioRepository.js";

const prisma = new PrismaClient();

class PrismaExercicioRepository implements IExercicioRepository {

    async listar(): Promise<any[]> {
        return await prisma.exercicio.findMany();
    }

    async buscarPorId(id: string): Promise<any | null> {
        return await prisma.exercicio.findUnique({ where: { id: Number(id) } });
    }

    async buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<any[]> {
        return await prisma.exercicio.findMany({ where: filtros });
    }

    async cadastrar(dados: ExercicioDTO): Promise<any[]> {
        const novo = await prisma.exercicio.create({ data: dados });
        return [novo];
    }

    async atualizar(id: string, dados: ExercicioDTO): Promise<any[]> {
        const exercicio = await prisma.exercicio.update({
            where: { id: Number(id) },
            data: dados
        });
        return [exercicio];
    }

    async atualizarParcial(
        id: string,
        dados: Partial<ExercicioDTO>
    ): Promise<any[] | null> {
        const exercicio = await prisma.exercicio.update({
            where: { id: Number(id) },
            data: dados
        });
        return [exercicio];
    }

    async deletar(id: string): Promise<boolean> {
        const deleted = await prisma.exercicio.delete({
            where: { id: Number(id) }
        });
        return deleted !== null;
    }
}

export default PrismaExercicioRepository;
