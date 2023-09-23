import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";

export async function errorRoutes(app: FastifyInstance) {
   app.post('/error', Create)
   app.get('/error/:errorId', Get)
   app.post('/error/query', Query)
}