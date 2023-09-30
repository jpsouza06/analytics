import { FastifyInstance } from "fastify";
import { Count } from "./count";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";

export async function systemStartedRoutes(app: FastifyInstance) {
   app.post('/system-started', Create)
   app.get('/system-started/:systemStartedId', Get)
   app.post('/system-started/query/:page', Query)
   app.post('/system-started/query/count', Count)
}