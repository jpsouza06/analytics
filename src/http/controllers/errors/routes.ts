import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";

export async function errorRoutes(app: FastifyInstance) {
   app.post('/error', {
      schema: {
         tags: ["Errors"],
         body: {
            type: "object",
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
      },
      handler: Create
   })
   app.get('/error/:errorId', {
      schema: {
         tags: ["Errors"],
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
      },
      handler: Get
   })

   app.post('/error/query/:page', Query)
}