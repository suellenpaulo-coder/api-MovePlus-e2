
export interface AlunoDTO {
    id: number;
    name: string;
}

export interface FiltroAlunoDTO {
    id?: number;
    name?: string;
}

export interface IAlunoRepository {
    listar(): Promise<AlunoDTO[]>;
    buscarPorId(id: string): Promise<AlunoDTO | null>;
    buscarPorFiltro(filtros: FiltroAlunoDTO): Promise<AlunoDTO[]>;
    cadastrar(dados: AlunoDTO): Promise<AlunoDTO[]>;
    atualizar(id: string, dados: AlunoDTO): Promise<AlunoDTO[]>;
    atualizarParcial(
        id: string,
        dados: Partial<AlunoDTO>
    ): Promise<AlunoDTO[] | null>;
    deletar(id: string): Promise<boolean>;
}
