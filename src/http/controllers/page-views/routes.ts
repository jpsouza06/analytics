import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";
import { schemaCreate, schemaGet, schemaQuery } from "@/docs/page-view";

export async function pageViewRoutes(app: FastifyInstance) {
   app.post('/page-view', {
      schema: schemaCreate,
      handler: Create
   })
   app.get('/page-view/:pageViewId', {
      schema: schemaGet,
      handler: Get
   })
   app.post('/page-view/query/:page', {
      schema: schemaQuery,
      handler: Query
   })
}