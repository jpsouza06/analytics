import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";

export async function errorRoutes(app: FastifyInstance) {
   app.post('/error', Create)
   app.get('/error/:errorId', Get)
}