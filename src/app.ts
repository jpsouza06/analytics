import fastify from 'fastify'
import { errorRoutes } from './http/controllers/errors/routes'
import { pageViewRoutes } from './http/controllers/page-views/routes'
import { systemStartedRoutes } from './http/controllers/system-created/routes'

export const app = fastify()

app.register(pageViewRoutes)
app.register(errorRoutes)
app.register(systemStartedRoutes)
