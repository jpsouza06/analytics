import { makeFindPageViewByQueryUseCase } from "@/use-cases/factories/page-view/make-find-page-view-by-query-use-case";
import { makeFindSystemStartedByQueryUseCase } from "@/use-cases/factories/system-created/make-find-system-started-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const querySystemStartedBodySchema = z.object({
      estado: z.string().optional(),
      modulo: z.string().optional(),
      filial: z.string().optional(),
      dataInicio: z.string(),
      dataFim: z.string().optional(),
      orderBy: z.object({
         estado: z.enum(['asc', 'desc']).optional(),
         modulo: z.enum(['asc', 'desc']).optional(),
         filial: z.enum(['asc', 'desc']).optional(),
         createdAt: z.enum(['asc', 'desc']).optional()
      }).optional()
   })

   const querySystemStartedParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })

   const { estado, modulo, filial, dataInicio, dataFim, orderBy } = querySystemStartedBodySchema.parse(request.body)

   const { page } = querySystemStartedParamsSchema.parse(request.params)

   const findSystemStartedByQueryUseCase = makeFindSystemStartedByQueryUseCase()

   const query = {
      estado,
      modulo,
      filial,
      dataInicio,
      dataFim,
      orderBy
   }

   const { systemStarted } = await findSystemStartedByQueryUseCase.execute({
      query,
      page
   })

   if (!systemStarted || systemStarted.length === 0) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      systemStarted,
   })
}