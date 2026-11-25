export interface ExercicioDTO {
    id: string;
    alunoId: number;
    name: string;
    muscleGroup: string;
    date: Date;
    sets: number;
    repetitions: number;
    weight: number;
    notes: string;
}

export interface FiltroExercicioDTO {

}

export interface ExercicioRepository {
    listar(): Promise<any[]>;
    buscarPorId(id: string): Promise<any[] | null>;
    buscarPorFiltro(filtros: FiltroExercicioDTO): Promise<any[]>;
    cadastrar(dados: ExercicioDTO): Promise<any[]>;
    atualizar(id: string, dados:ExercicioDTO): Promise <any[] | null>;
    atualizarParcial(id: string, dados: Partial<ExercicioDTO>): Promise <any[] | null>;
    deletar(id: string): Promise<boolean>;
}