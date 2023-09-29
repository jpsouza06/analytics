import { makeFindPageViewByQueryUseCase } from "@/use-cases/factories/page-view/make-find-page-view-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const queryPageViewBodySchema = z.object({
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      dataInicio: z.string(),
      dataFim: z.string().optional(),
   })

   const queryPageViewParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })
   console.log(request.body)
   const { rotina, modulo, dataInicio, dataFim } = queryPageViewBodySchema.parse(request.body)

   const { page } = queryPageViewParamsSchema.parse(request.params)

   const findPageViewByQueryUseCase = makeFindPageViewByQueryUseCase()

   const query = {
      rotina,
      modulo,
      dataInicio,
      dataFim
   }

   const { pageViews } = await findPageViewByQueryUseCase.execute({
      query,
      page
   })

   if (!pageViews || pageViews.length === 0) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      pageViews,
   })
}