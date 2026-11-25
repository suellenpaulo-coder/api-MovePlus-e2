
export interface AcademiaDTO {
    id: number;
    name: string;
    plans: string;
    activities: string;
    phone: string;
    description: string;
    cnpj: string;
    email: string;
    address: string;
    openingHours: string;
    isActive: boolean;
    modalities: string[];
    capacity: number;
}

export interface FiltroAcademiaDTO {
    id?: number;
    name?: string;
    email?: string;
    cnpj?: string;
    isActive?: boolean;
}

export interface IAcademiaRepository {
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any | null>;
    buscarPorFiltro(filtros: FiltroAcademiaDTO): Promise<any[]>;
    cadastrar(dados: AcademiaDTO): Promise<any[]>;
    atualizar(id: string, dados: AcademiaDTO): Promise<any[]>;
    atualizarParcial(
        id: string,
        dados: Partial<AcademiaDTO>
    ): Promise<any[] | null>;
    deletar(id: string): Promise<boolean>;
}
