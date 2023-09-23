import fastify from 'fastify'
import { errorRoutes } from './http/controllers/errors/routes'
import { pageViewRoutes } from './http/controllers/pages-view/routes'

export const app = fastify()

app.register(pageViewRoutes)
app.register(errorRoutes)

app.get('/events', (request, reply) => {
   reply.status(200).send({
      message: 'Hello world'
   })
})