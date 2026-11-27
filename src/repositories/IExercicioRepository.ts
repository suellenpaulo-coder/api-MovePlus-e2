
export interface ExercicioDTO {
    id: number;
    alunoId: number;
    name: string;
    muscleGroup: string;
    date: Date;
    sets: number;
    repetitions: number;
    weight?: number;
    notes?: string;
}

export interface FiltroExercicioDTO {
    alunoId?: number;
    name?: string;
    muscleGroup?: string;
}

export interface IExercicioRepository {
    listar(): Promise<ExercicioDTO[]>;
    buscarPorId(id: string): Promise<ExercicioDTO | null>;
    buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<ExercicioDTO[]>;
    cadastrar(dados: ExercicioDTO): Promise<any[]>;
    atualizar(id: string, dados: ExercicioDTO): Promise<ExercicioDTO[]>;
    atualizarParcial(
        id: string,
        dados: Partial<ExercicioDTO>
    ): Promise<ExercicioDTO[] | null>;
    deletar(id: string): Promise<boolean>;
}
