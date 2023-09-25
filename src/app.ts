import fastify from 'fastify'
import { errorRoutes } from './http/controllers/errors/routes'
import { pageViewRoutes } from './http/controllers/page-views/routes'

export const app = fastify()

app.register(pageViewRoutes)
app.register(errorRoutes)
