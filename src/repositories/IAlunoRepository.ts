
export interface AlunoDTO {
    id: number;
    name: string;
}

export interface FiltroAlunoDTO {
    id?: number;
    name?: string;
}

export interface IAlunoRepository {
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any | null>;
    buscarPorFiltro(filtros: FiltroAlunoDTO): Promise<any[]>;
    cadastrar(dados: AlunoDTO): Promise<any[]>;
    atualizar(id: string, dados: AlunoDTO): Promise<any[]>;
    atualizarParcial(
        id: string,
        dados: Partial<AlunoDTO>
    ): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;
}
