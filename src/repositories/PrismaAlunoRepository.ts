
import prisma from "../config/prismaClient.js";
import type {
    AlunoDTO,
    FiltroAlunoDTO,
    IAlunoRepository
} from "./IAlunoRepository.js";

class PrismaAlunoRepository implements IAlunoRepository {

    async listar(): Promise<any[]> {
        return await prisma.aluno.findMany();
    }

    async buscarPorId(id: string): Promise<any | null> {
        return await prisma.aluno.findUnique({ where: { id: Number(id) } });
    }

    async buscarPorFiltro(filtros: FiltroAlunoDTO): Promise<any[]> {
        return await prisma.aluno.findMany({ where: filtros });
    }

    async cadastrar(dados: AlunoDTO): Promise<any[]> {
        const novoAluno = await prisma.aluno.create({ data: dados });
        return [novoAluno];
    }

    async atualizar(id: string, dados: AlunoDTO): Promise<any[]> {
        const aluno = await prisma.aluno.update({
            where: { id: Number(id) },
            data: dados
        });
        return [aluno];
    }

    async atualizarParcial(
        id: string,
        dados: Partial<AlunoDTO>
    ): Promise<any[] | null> {
        const aluno = await prisma.aluno.update({
            where: { id: Number(id) },
            data: dados
        });
        return [aluno];
    }

    async deletar(id: string): Promise<boolean> {
        const deleted = await prisma.aluno.delete({
            where: { id: Number(id) }
        });
        return deleted !== null;
    }
}

export default PrismaAlunoRepository;
