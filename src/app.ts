import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import { errorRoutes } from './http/controllers/errors/routes'
import { pageViewRoutes } from './http/controllers/page-views/routes'
import { systemStartedRoutes } from './http/controllers/system-created/routes'

export const app = fastify()

app.register(pageViewRoutes)
app.register(errorRoutes)
app.register(systemStartedRoutes)


const swaggerOptions = {
   swagger: {
      info: {
         title: "Analytics",
         description: "Api que recebe eventos de outros sistemas",
         version: "1.0.0",
      },
      schemes: ["http", "https"],
      consumes: ["application/json"],
      produces: ["application/json"]
   },
};

const swaggerUiOptions = {
   routePrefix: "/docs",
   exposeRoute: true,
};

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register((app, options, done) => {
   app.get("/error/{errorId}", {
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
               description: 'Resposta de sucesso',
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
                     }
                  }
               },
            },
            404: {
               description: 'Reposta de erro não encontrado',
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
      handler: (req, res) => {
         res.send({ anything: "meaningfull" });
      },
   });
   done();
});