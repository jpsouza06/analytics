import { FastifyInstance } from "fastify";
import { Count } from "./count";
import { Create } from "./create";
import { Get } from "./get";
import { Query } from "./query";
import { schemaCount, schemaCreate, schemaGet, schemaQuery } from "@/docs/system-started";

export async function systemStartedRoutes(app: FastifyInstance) {
   app.post('/system-started', {
      schema: schemaCreate,
      handler: Create
   })
   app.get('/system-started/:systemStartedId', {
      schema: schemaGet,
      handler: Get
   })
   app.post('/system-started/query/:page', {
      schema: schemaQuery,
      handler: Query
   })
   app.post('/system-started/query/count', {
      schema: schemaCount,
      handler: Count
   })
}