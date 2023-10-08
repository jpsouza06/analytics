import { makeFindPageViewByQueryUseCase } from "@/use-cases/factories/page-view/make-find-page-view-by-query-use-case";
import { makeFindSystemStartedByQueryUseCase } from "@/use-cases/factories/system-created/make-find-system-started-by-query-use-case";
import { makeGetCountSystemStartedByQueryUseCase } from "@/use-cases/factories/system-created/make-get-count-system-started-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Count(request: FastifyRequest, reply: FastifyReply) {
   const querySystemStartedBodySchema = z.object({
      estado: z.string().optional(),
      modulo: z.string().optional(),
      filial: z.string().optional(),
      dataInicio: z.string(),
      dataFim: z.string().optional(),
   })

   const { estado, modulo, filial, dataInicio, dataFim } = querySystemStartedBodySchema.parse(request.body)

   const getCountSystemStartedByQueryUseCase = makeGetCountSystemStartedByQueryUseCase()

   const query = {
      estado,
      modulo,
      filial,
      dataInicio,
      dataFim
   }

   const { score } = await getCountSystemStartedByQueryUseCase.execute({
      query
   })

   return reply.status(200).send({
      score,
   })
}