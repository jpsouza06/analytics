export const schemaCreate = {
   tags: ["Page View"],
   description: "Rota para criar um novo evento de Page View",
   body: {
      type: "object",
      required: ["rotina", "modulo", "codCliente"],
      properties: {
         rotina: { type: "string" },
         modulo: { type: "string" },
         codCliente: { type: "string" },
      },
   },
   response: {
      201: {
         description: 'Sucesso',
         type: "object",
         properties: {
            pageView: {
               type: 'object',
               properties: {
                  id: { type: "string" },
                  rotina: { type: "string" },
                  modulo: { type: "string" },
                  codCliente: { type: "string" },
                  createdAt: { type: "string", }
               },
               example: {
                  "id": "267915cb-921f-4356-872f-203f42d973b8",
                  "rotina": "Rotina",
                  "modulo": "Modulo",
                  "codCliente": "1",
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
   tags: ["Page View"],
   description: "Rota para buscar um evento de Page View pelo ID",
   params: {
      type: 'object',
      properties: {
         pageViewId: {
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
            pageView: {
               type: 'object',
               properties: {
                  id: { type: "string" },
                  rotina: { type: "string" },
                  modulo: { type: "string" },
                  codCliente: { type: "string" },
                  createdAt: { type: "string", }
               },
               example: {
                  "id": "267915cb-921f-4356-872f-203f42d973b8",
                  "rotina": "Rotina",
                  "modulo": "Modulo",
                  "codCliente": "1",
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
               type: 'string',
               example: "params/pageViewId must match format \"uuid\""
            }
         }
      },
      404: {
         description: 'Page View não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Resource not found.' }
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
   tags: ["Page View"],
   description: "Rota para buscar eventos de Page View baseado nos filtros informados no corpo da requisição",
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
         rotina: { type: "string" },
         modulo: { type: "string" },
         codCliente: { type: "string" },
         dataInicio: { type: "string", format: "date" },
         dataFim: { type: "string", format: "date" },
         orderBy: {
            type: "object",
            description:
               "Os campos do orderBy devem ser passados com 'asc'(ordem crescente) ou 'desc'(ordem decrescente)",
            properties: {
               rotina: {
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
            pageViews: {
               type: 'array',
               properties: {
                  pageView: {
                     type: "object",
                     properties: {
                        id: { type: "string" },
                        rotina: { type: "string" },
                        modulo: { type: "string" },
                        codCliente: { type: "string" },
                        createdAt: { type: "string" }
                     }
                  }
               },
               example: [
                  {
                     "id": "267915cb-921f-4356-872f-203f42d973b8",
                     "rotina": "Rotina",
                     "modulo": "Modulo",
                     "codCliente": "1",
                     "createdAt": "2023-10-17T00:48:08.507Z"
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
         description: 'Page View não encontrado',
         type: 'object',
         properties: {
            message: { type: 'string', example: 'Recursno não encontrado' }
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