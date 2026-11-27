
import { getDbType } from "../config/dbConnect.js";

import MongoAcademiaRepository from "./MongoAcademiaRepository.js";
import PrismaAcademiaRepository from "./PrismaAcademiaRepository.js";
import type { IAcademiaRepository } from "./IAcademiaRepository.js";

import MongoAlunoRepository from "./MongoAlunoRepository.js";
import PrismaAlunoRepository from "./PrismaAlunoRepository.js";
import type { IAlunoRepository } from "./IAlunoRepository.js";

import MongoExercicioRepository from "./MongoExercicioRepository.js";
import PrismaExercicioRepository from "./PrismaExercicioRepository.js";
import type { IExercicioRepository } from "./IExercicioRepository.js";

// FABRICA O REPOSITÓRIO DE ACADEMIA DE ACORDO COM O DB_TYPE
export function criarAcademiaRepository(): IAcademiaRepository {
    return getDbType() === "MONGO"
        ? new MongoAcademiaRepository()
        : new PrismaAcademiaRepository();
}

// FABRICA O REPOSITÓRIO DE ALUNO DE ACORDO COM O DB_TYPE
export function criarAlunoRepository(): IAlunoRepository {
    return getDbType() === "MONGO"
        ? new MongoAlunoRepository()
        : new PrismaAlunoRepository();
}

// FABRICA O REPOSITÓRIO DE EXERCÍCIO DE ACORDO COM O DB_TYPE
export function criarExercicioRepository(): IExercicioRepository {
    return getDbType() === "MONGO"
        ? new MongoExercicioRepository()
        : new PrismaExercicioRepository();
}
