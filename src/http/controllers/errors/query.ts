import { makeFindErrorByQueryUseCase } from "@/use-cases/factories/error/make-find-error-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const queryErrorBodySchema = z.object({
      unit: z.string().optional(),
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      conteudo: z.string().optional(),
      dataInicio: z.string(),
      dataFim: z.string().optional(),
   })

   const queryErrorParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })

   const {
      unit,
      rotina,
      modulo,
      conteudo,
      dataInicio,
      dataFim
   } = queryErrorBodySchema.parse(request.body)

   const { page } = queryErrorParamsSchema.parse(request.params)

   const findErrorByQueryUseCase = makeFindErrorByQueryUseCase()

   const query = {
      unit,
      rotina,
      modulo,
      conteudo,
      dataInicio,
      dataFim
   }

   const { errors } = await findErrorByQueryUseCase.execute({
      query,
      page
   })

   if (!errors || errors.length === 0) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      errors,
   })
}