export const schemaCreate = {
   tags: ["Error"],
   description: "Rota para criar um novo evento de Erro",
   body: {
      type: "object",
      required: ["unit", "rotina", "modulo", "conteudo"],
      properties: {
         unit: { type: "string" },
         rotina: { type: "string" },
         modulo: { type: "string" },
         conteudo: { type: "string" },
      },
   },
   response: {
      200: {
         description: 'Sucesso',
         type: "object",
         properties: {
            error: {
               type: 'object',
               properties: {
                  id: { type: "string" },
                  unit: { type: "string" },
                  rotina: { type: "string" },
                  modulo: { type: "string" },
                  conteudo: { type: "string" },
                  createdAt: { type: "string" }
               },
               example: {
                  "id": "267915cb-921f-4356-872f-203f42d973b8",
                  "unit": "Unit",
                  "rotina": "Rotina",
                  "modulo": "Modulo",
                  "conteudo": "Conteudo",
                  "createdAt": "2023-10-17T00:48:08.507Z"
               }
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'object',
               example: [
                  {
                     "validation": "uuid",
                     "code": "invalid_string",
                     "message": "Invalid uuid",
                     "path": [
                        "errorId"
                     ]
                  }
               ]
            }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: { type: 'string' }
         }
      },
   },
}

export const schemaGet = {
   tags: ["Error"],
   description: "Rota para buscar um evento de Erro pelo ID",
   params: {
      type: 'object',
      properties: {
         errorId: {
            type: 'string'
         }
      }
   },
   response: {
      200: {
         description: 'Sucesso',
         type: "object",
         properties: {
            error: {
               type: 'object',
               properties: {
                  id: { type: "string" },
                  unit: { type: "string" },
                  rotina: { type: "string" },
                  modulo: { type: "string" },
                  conteudo: { type: "string" },
                  createdAt: { type: "string" }
               },
               example: {
                  "id": "267915cb-921f-4356-872f-203f42d973b8",
                  "unit": "Unit",
                  "rotina": "Rotina",
                  "modulo": "Modulo",
                  "conteudo": "Conteudo",
                  "createdAt": "2023-10-17T00:48:08.507Z"
               }
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'object',
               example: [
                  {
                     "validation": "uuid",
                     "code": "invalid_string",
                     "message": "Invalid uuid",
                     "path": [
                        "errorId"
                     ]
                  }
               ]
            }
         }
      },
      404: {
         description: 'Erro não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Resource not found.' }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: { type: 'string' }
         }
      },
   },
}

export const schemaQuery = {
   tags: ["Error"],
   description: "Rota para buscar varios eventos de Erro baseado nos filtros informados no corpo da requisição",
   params: {
      type: 'object',
      properties: {
         page: {
            type: 'string'
         }
      }
   },
   body: {
      type: "object",
      properties: {
         unit: { type: "string" },
         rotina: { type: "string" },
         modulo: { type: "string" },
         conteudo: { type: "string" },
         dataInicio: { type: "string", format: "date" },
         dataFim: { type: "string", format: "date" },
         orderBy: {
            type: "object",
            description:
               "Os campos do orderBy devem ser passados com 'asc'(ordem crescente) ou 'desc'(ordem decrescente)",
            properties: {
               unit: {
                  type: "string",
                  enum: ["asc", "desc"],
               },
               rotina: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               modulo: {
                  type: "string",
                  enum: ["asc", "desc"]
               },
               conteudo: {
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
            errors: {
               type: 'array',
               properties: {
                  error: {
                     type: "object",
                     properties: {
                        id: { type: "string" },
                        unit: { type: "string" },
                        rotina: { type: "string" },
                        modulo: { type: "string" },
                        conteudo: { type: "string" },
                        createdAt: { type: "string" }
                     }
                  }
               },
               example: [
                  {
                     "id": "267915cb-921f-4356-872f-203f42d973b8",
                     "unit": "Unit",
                     "rotina": "Rotina",
                     "modulo": "Modulo",
                     "conteudo": "Conteudo",
                     "createdAt": "2023-10-17T00:48:08.507Z"
                  }
               ]
            }
         },
      },
      400: {
         description: 'Requisição incorreta',
         type: 'object',
         properties: {
            message: {
               type: 'object',
               example: [
                  {
                     "validation": "uuid",
                     "code": "invalid_string",
                     "message": "Invalid uuid",
                     "path": [
                        "errorId"
                     ]
                  }
               ]
            }
         }
      },
      500: {
         description: 'Erro interno do servidor',
         type: 'object',
         properties: {
            message: { type: 'string' }
         }
      },
   },
}