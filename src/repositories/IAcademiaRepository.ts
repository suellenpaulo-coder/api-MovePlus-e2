
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
    listar(): Promise<AcademiaDTO[]>;
    buscarPorId(id: string): Promise<AcademiaDTO | null>;
    buscarPorFiltro(filtros: FiltroAcademiaDTO): Promise<AcademiaDTO[]>;
    cadastrar(dados: AcademiaDTO): Promise<AcademiaDTO[]>;
    atualizar(id: string, dados: AcademiaDTO): Promise<AcademiaDTO[]>;
    atualizarParcial(
        id: string,
        dados: Partial<AcademiaDTO>
    ): Promise<AcademiaDTO[] | null>;
    deletar(id: string): Promise<boolean>;
}
