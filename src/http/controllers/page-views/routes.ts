import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";

export async function pageViewRoutes(app: FastifyInstance) {
   app.post('/page-view', Create)
   app.get('/page-view/:pageViewId', Get)
   app.post('/page-view/query', Query)
}