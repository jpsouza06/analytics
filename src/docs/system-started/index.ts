export const schemaCreate = {
   tags: ["System Started"],
   description: "Rota para criar um novo evento de System Started",
   body: {
      type: "object",
      required: ["estado", "cidade", "modulo", "codCliente", "versao"],
      properties: {
         estado: { type: "string" },
         cidade: { type: "string" },
         modulo: { type: "string" },
         codCliente: { type: "string" },
         versao: { type: "string" }
      },
   },
   response: {
      201: {
         description: 'Sucesso',
         type: "object",
         properties: {
            message: {
               type: 'string',
               example: "Sucesso"
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Requisição incorreta"
            }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Erro interno do servidor"
            }
         }
      },
   },
}

export const schemaGet = {
   tags: ["System Started"],
   description: "Rota para buscar um evento de System Started pelo ID",
   params: {
      type: 'object',
      properties: {
         systemStartedId: {
            type: 'string',
            format: 'uuid'
         }
      }
   },
   response: {
      200: {
         description: 'Sucesso',
         type: "object",
         properties: {
            systemStarted: {
               type: 'object',
               properties: {
                  id: { type: "string" },
                  estado: { type: "string" },
                  cidade: { type: "string" },
                  modulo: { type: "string" },
                  codCliente: { type: "string" },
                  versao: { type: "string" },
                  createdAt: { type: "string", format: "date-time" }
               },
               example: {
                  "id": "040bb3dc-f7a8-49fa-9109-eb58bfbf9cbf",
                  "estado": "MG",
                  "cidade": "Cidade",
                  "modulo": "Modulo",
                  "codCliente": "1",
                  "versao": "1",
                  "createdAt": "2023-10-20T18:09:31.485Z"
               }
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Requisição incorreta"
            }
         }
      },
      404: {
         description: 'Recurso não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Recurso não encontrado.' }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Erro interno do servidor"
            }
         }
      },
   },
}

export const schemaQuery = {
   tags: ["System Started"],
   description: "Rota para buscar eventos de System Started baseado nos filtros informados no corpo da requisição",
   params: {
      type: 'object',
      properties: {
         page: {
            type: 'string',
         }
      }
   },
   body: {
      type: "object",
      properties: {
         estado: { type: "string" },
         cidade: { type: "string" },
         modulo: { type: "string" },
         codCliente: { type: "string" },
         versao: { type: "string" },
         dataInicio: { type: "string", format: "date-time" },
         dataFim: { type: "string", format: "date-time" },
         orderBy: {
            type: "object",
            description:
               "Os campos do orderBy devem ser passados com 'asc'(ordem crescente) ou 'desc'(ordem decrescente)",
            properties: {
               estado: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               cidade: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               modulo: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               codCliente: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               versao: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               createdAt: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
            }
         }
      }

   },
   response: {
      200: {
         description: 'Sucesso',
         type: "object",
         properties: {
            systemStarted: {
               type: 'array',
               properties: {
                  systemStarted: {
                     type: "object",
                     properties: {
                        id: { type: "string" },
                        estado: { type: "string" },
                        cidade: { type: "string" },
                        modulo: { type: "string" },
                        codCliente: { type: "string" },
                        versao: { type: "string" },
                        createdAt: { type: "string" }
                     }
                  }
               },
               example: [
                  {
                     "id": "bee7ebef-e7d7-4324-856f-5834e2e4e84f",
                     "estado": "MG",
                     "cidade": "Cidade",
                     "modulo": "Modulo",
                     "codCliente": "1",
                     "versao": "1",
                     "createdAt": "2023-10-20T18:21:29.900Z"
                  }
               ]
            },
            total: { type: "integer", example: 1 }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Requisição incorreta"
            }
         }
      },
      404: {
         description: 'Recurso não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Recurso não encontrado.' }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Erro interno do servidor"
            }
         }
      },
   },
}

export const schemaCount = {
   tags: ["System Started"],
   description: "Rota para buscar contagem eventos de System Started baseado nos filtros informados no corpo da requisição",
   body: {
      type: "object",
      properties: {
         estado: { type: "string" },
         cidade: { type: "string" },
         modulo: { type: "string" },
         codCliente: { type: "string" },
         versao: { type: "string" },
         dataInicio: { type: "string", format: "date-time" },
         dataFim: { type: "string", format: "date-time" },
         orderBy: {
            type: "object",
            description:
               "Os campos do orderBy devem ser passados com 'asc'(ordem crescente) ou 'desc'(ordem decrescente)",
            properties: {
               estado: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               cidade: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               modulo: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               codCliente: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               versao: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               createdAt: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
            }
         }
      }

   },
   response: {
      200: {
         description: 'Sucesso',
         type: "object",
         properties: {
            score: {
               type: 'object',
               properties: {
                  count: {
                     type: "array",
                     properties: {
                        _count: { type: "integer" },
                        estado: { type: "string" }
                     }
                  }
               },
               example: {
                  "count": [
                     {
                        "_count": 31,
                        "estado": "MG"
                     }
                  ]
               }
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Requisição incorreta"
            }
         }
      },
      404: {
         description: 'Recurso não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Recurso não encontrado.' }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: {
               type: 'string',
               example: "Erro interno do servidor"
            }
         }
      },
   }
}