import { FastifyInstance } from "fastify";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";
import { schemaCreate, schemaGet, schemaQuery } from "@/docs/error";

export async function errorRoutes(app: FastifyInstance) {
   app.post('/error', {
      schema: schemaCreate,
      handler: Create
   })
   app.get('/error/:errorId', {
      schema: schemaGet,
      handler: Get
   })

   app.post('/error/query/:page', {
      schema: schemaQuery,
      handler: Query
   })
}