import { makeFindPageViewByQueryUseCase } from "@/use-cases/factories/page-view/make-find-page-view-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const queryPageViewBodySchema = z.object({
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      dataInicio: z.string(),
      dataFim: z.string().optional(),
      orderBy: z.object({
         rotina: z.enum(['asc', 'desc']).optional(),
         modulo: z.enum(['asc', 'desc']).optional(),
         createdAt: z.enum(['asc', 'desc']).optional()
      }).optional()
   })

   const queryPageViewParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })

   const { rotina, modulo, dataInicio, dataFim, orderBy } = queryPageViewBodySchema.parse(request.body)

   const { page } = queryPageViewParamsSchema.parse(request.params)

   const findPageViewByQueryUseCase = makeFindPageViewByQueryUseCase()

   const query = {
      rotina,
      modulo,
      dataInicio,
      dataFim,
      orderBy
   }

   const { pageViews } = await findPageViewByQueryUseCase.execute({
      query,
      page
   })

   if (!pageViews || pageViews.length === 0) {
      return reply.status(404).send()
   }

   return reply.status(200).send({
      pageViews,
   })
}