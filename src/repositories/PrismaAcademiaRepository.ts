
import prisma from "../config/prismaClient.js";
import type {
    AcademiaDTO,
    FiltroAcademiaDTO,
    IAcademiaRepository
} from "./IAcademiaRepository.js";

class PrismaAcademiaRepository implements IAcademiaRepository {

    async listar(): Promise<any[]> {
        return await prisma.academia.findMany();
    }

    async buscarPorId(id: string): Promise<any | null> {
        return await prisma.academia.findUnique({ where: { id: Number(id) } });
    }

    async buscarPorFiltro(filtros: FiltroAcademiaDTO): Promise<any[]> {
        return await prisma.academia.findMany({ where: filtros });
    }

    async cadastrar(dados: AcademiaDTO): Promise<any[]> {
        const novaAcademia = await prisma.academia.create({ data: dados });
        return [novaAcademia];
    }

    async atualizar(id: string, dados: AcademiaDTO): Promise<any[]> {
        const academia = await prisma.academia.update({
            where: { id: Number(id) },
            data: dados
        });
        return [academia];
    }

    async atualizarParcial(
        id: string,
        dados: Partial<AcademiaDTO>
    ): Promise<any[] | null> {
        const academia = await prisma.academia.update({
            where: { id: Number(id) },
            data: dados
        });
        return [academia];
    }

    async deletar(id: string): Promise<boolean> {
        const deleted = await prisma.academia.delete({
            where: { id: Number(id) }
        });
        return deleted !== null;
    }
}

export default PrismaAcademiaRepository;
