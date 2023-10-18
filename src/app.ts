import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastify from 'fastify'
import { errorRoutes } from './http/controllers/errors/routes'
import { pageViewRoutes } from './http/controllers/page-views/routes'
import { systemStartedRoutes } from './http/controllers/system-created/routes'
import { errorSwagger } from './docs/error/swagger'

export const app = fastify()

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
}

const swaggerUiOptions = {
   routePrefix: "/docs",
   exposeRoute: true,
}

app.register(fastifySwagger, swaggerOptions);
app.register(fastifySwaggerUi, swaggerUiOptions);

app.register(pageViewRoutes)
app.register(errorRoutes)
app.register(systemStartedRoutes)