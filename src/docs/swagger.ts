
export const swaggerDocument = {
    openapi: "3.0.0",

    info: {
        title: "API de Academias",
        version: "1.0.0",
        description: "Documentação da API para gerenciamento de academias, incluindo cadastro, consulta, atualização e exclusão."
    },

    servers: [
        {
            url: "http://localhost:3000",
            description: "Servidor local"
        }
    ],

    tags: [
        {
            name: "Academias",
            description: "Rotas para gerenciamento de academias"
        }
    ],

    paths: {
        "/academias": {
            get: {
                tags: ["Academias"],
                summary: "Listar todas as academias",
                description: "Retorna a lista de todas as academias cadastradas.",
                responses: {
                    "200": {
                        description: "Lista de academias retornada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "array",
                                    items: {
                                        $ref: "#/components/schemas/Academia"
                                    }
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno ao buscar academias",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Erro ao buscar academias"
                                }
                            }
                        }
                    }
                }
            },

            post: {
                tags: ["Academias"],
                summary: "Cadastrar uma academia",
                description: "Cadastra uma nova academia no sistema.",
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AcademiaInput"
                            },
                            example: {
                                id: 1,
                                name: "Academia Fitness Life",
                                plans: "Mensal, Trimestral e Anual",
                                activities: "Musculação, Pilates e Funcional",
                                phone: "71999999999",
                                description: "Academia especializada em saúde e bem-estar",
                                cnpj: "12345678000199",
                                email: "contato@fitnesslife.com",
                                address: "Rua das Flores, 100, Salvador - BA",
                                openingHours: "Segunda a sábado, das 06h às 22h",
                                isActive: true,
                                modalities: [
                                    "Musculação",
                                    "Pilates",
                                    "Funcional"
                                ],
                                capacity: 200
                            }
                        }
                    }
                },
                responses: {
                    "201": {
                        description: "Academia cadastrada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Academia"
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Erro ao cadastrar academia ou dados inválidos",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Erro ao cadastrar academia"
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno do servidor"
                    }
                }
            }
        },

        "/academias/{id}": {
            get: {
                tags: ["Academias"],
                summary: "Buscar academia pelo ID",
                description: "Busca uma academia específica utilizando seu ID.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID numérico da academia",
                        schema: {
                            type: "integer",
                            example: 1
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Academia encontrada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Academia"
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Academia não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Academia não encontrada"
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno ao buscar academia"
                    }
                }
            },

            put: {
                tags: ["Academias"],
                summary: "Atualizar academia completamente",
                description: "Atualiza todos os dados de uma academia existente.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da academia que será atualizada",
                        schema: {
                            type: "integer",
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AcademiaInput"
                            },
                            example: {
                                id: 1,
                                name: "Academia Power Fitness",
                                plans: "Mensal e Anual",
                                activities: "Musculação e Funcional",
                                phone: "71988888888",
                                description: "Academia com equipamentos modernos",
                                cnpj: "12345678000199",
                                email: "contato@powerfitness.com",
                                address: "Avenida Central, 200, Salvador - BA",
                                openingHours: "Segunda a sábado, das 05h às 23h",
                                isActive: true,
                                modalities: [
                                    "Musculação",
                                    "Funcional"
                                ],
                                capacity: 300
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Academia atualizada com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Academia"
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Dados inválidos para atualização",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Informe os dados obrigatórios da academia"
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Academia não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Academia não encontrada"
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno do servidor"
                    }
                }
            },

            patch: {
                tags: ["Academias"],
                summary: "Atualizar academia parcialmente",
                description: "Atualiza apenas os campos informados da academia.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da academia que será atualizada",
                        schema: {
                            type: "integer",
                            example: 1
                        }
                    }
                ],
                requestBody: {
                    required: true,
                    content: {
                        "application/json": {
                            schema: {
                                $ref: "#/components/schemas/AcademiaAtualizacao"
                            },
                            example: {
                                plans: "Plano mensal, trimestral e anual",
                                phone: "71977777777",
                                isActive: true,
                                capacity: 250
                            }
                        }
                    }
                },
                responses: {
                    "200": {
                        description: "Academia atualizada parcialmente com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Academia"
                                }
                            }
                        }
                    },
                    "400": {
                        description: "Nenhum campo válido foi informado",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Nenhum campo válido foi informado"
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Academia não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Academia não encontrada"
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno do servidor"
                    }
                }
            },

            delete: {
                tags: ["Academias"],
                summary: "Excluir academia",
                description: "Remove uma academia do sistema utilizando seu ID.",
                parameters: [
                    {
                        name: "id",
                        in: "path",
                        required: true,
                        description: "ID da academia que será excluída",
                        schema: {
                            type: "integer",
                            example: 1
                        }
                    }
                ],
                responses: {
                    "200": {
                        description: "Academia excluída com sucesso",
                        content: {
                            "application/json": {
                                schema: {
                                    type: "object",
                                    properties: {
                                        mensagem: {
                                            type: "string",
                                            example: "Academia deletada com sucesso"
                                        }
                                    }
                                }
                            }
                        }
                    },
                    "404": {
                        description: "Academia não encontrada",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Academia não encontrada"
                                }
                            }
                        }
                    },
                    "500": {
                        description: "Erro interno ao excluir academia",
                        content: {
                            "application/json": {
                                schema: {
                                    $ref: "#/components/schemas/Erro"
                                },
                                example: {
                                    mensagem: "Erro ao deletar academia"
                                }
                            }
                        }
                    }
                }
            }
        }
    },

    components: {
        schemas: {
            Academia: {
                type: "object",
                properties: {
                    _id: {
                        type: "string",
                        example: "673a123456789abcdef12345"
                    },
                    id: {
                        type: "integer",
                        example: 1
                    },
                    name: {
                        type: "string",
                        example: "Academia Fitness Life"
                    },
                    plans: {
                        type: "string",
                        example: "Mensal, Trimestral e Anual"
                    },
                    activities: {
                        type: "string",
                        example: "Musculação, Pilates e Funcional"
                    },
                    phone: {
                        type: "string",
                        example: "71999999999"
                    },
                    description: {
                        type: "string",
                        example: "Academia especializada em saúde e bem-estar"
                    },
                    cnpj: {
                        type: "string",
                        example: "12345678000199"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "contato@fitnesslife.com"
                    },
                    address: {
                        type: "string",
                        example: "Rua das Flores, 100, Salvador - BA"
                    },
                    openingHours: {
                        type: "string",
                        example: "Segunda a sábado, das 06h às 22h"
                    },
                    createdAt: {
                        type: "string",
                        format: "date-time",
                        example: "2026-11-19T10:00:00.000Z"
                    },
                    isActive: {
                        type: "boolean",
                        example: true
                    },
                    modalities: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: [
                            "Musculação",
                            "Pilates",
                            "Funcional"
                        ]
                    },
                    capacity: {
                        type: "number",
                        example: 200
                    }
                }
            },

            AcademiaInput: {
                type: "object",
                required: [
                    "id",
                    "name",
                    "plans",
                    "activities",
                    "phone",
                    "description",
                    "cnpj",
                    "email",
                    "address",
                    "openingHours"
                ],
                properties: {
                    id: {
                        type: "integer",
                        minimum: 1,
                        example: 1
                    },
                    name: {
                        type: "string",
                        minLength: 1,
                        example: "Academia Fitness Life"
                    },
                    plans: {
                        type: "string",
                        minLength: 1,
                        example: "Mensal, Trimestral e Anual"
                    },
                    activities: {
                        type: "string",
                        minLength: 1,
                        example: "Musculação, Pilates e Funcional"
                    },
                    phone: {
                        type: "string",
                        minLength: 1,
                        example: "71999999999"
                    },
                    description: {
                        type: "string",
                        minLength: 1,
                        example: "Academia especializada em saúde e bem-estar"
                    },
                    cnpj: {
                        type: "string",
                        minLength: 1,
                        example: "12345678000199"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "contato@fitnesslife.com"
                    },
                    address: {
                        type: "string",
                        minLength: 1,
                        example: "Rua das Flores, 100, Salvador - BA"
                    },
                    openingHours: {
                        type: "string",
                        minLength: 1,
                        example: "Segunda a sábado, das 06h às 22h"
                    },
                    isActive: {
                        type: "boolean",
                        example: true
                    },
                    modalities: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: [
                            "Musculação",
                            "Pilates",
                            "Funcional"
                        ]
                    },
                    capacity: {
                        type: "number",
                        minimum: 0,
                        example: 200
                    }
                }
            },

            AcademiaAtualizacao: {
                type: "object",
                minProperties: 1,
                properties: {
                    id: {
                        type: "integer",
                        minimum: 1,
                        example: 1
                    },
                    name: {
                        type: "string",
                        minLength: 1,
                        example: "Academia Power Fitness"
                    },
                    plans: {
                        type: "string",
                        example: "Mensal e Anual"
                    },
                    activities: {
                        type: "string",
                        example: "Musculação e Funcional"
                    },
                    phone: {
                        type: "string",
                        example: "71988888888"
                    },
                    description: {
                        type: "string",
                        example: "Academia com equipamentos modernos"
                    },
                    cnpj: {
                        type: "string",
                        example: "12345678000199"
                    },
                    email: {
                        type: "string",
                        format: "email",
                        example: "contato@powerfitness.com"
                    },
                    address: {
                        type: "string",
                        example: "Avenida Central, 200, Salvador - BA"
                    },
                    openingHours: {
                        type: "string",
                        example: "Segunda a sábado, das 05h às 23h"
                    },
                    isActive: {
                        type: "boolean",
                        example: true
                    },
                    modalities: {
                        type: "array",
                        items: {
                            type: "string"
                        },
                        example: [
                            "Musculação",
                            "Funcional"
                        ]
                    },
                    capacity: {
                        type: "number",
                        minimum: 0,
                        example: 300
                    }
                }
            },

            Erro: {
                type: "object",
                properties: {
                    mensagem: {
                        type: "string",
                        example: "Erro ao processar a solicitação"
                    }
                }
            }
        }
    }
} as const;
