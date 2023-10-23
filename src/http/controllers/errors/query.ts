import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFindErrorByQueryUseCase } from "@/use-cases/factories/error/make-find-error-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const queryErrorBodySchema = z.object({
      unit: z.string().optional(),
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      conteudo: z.string().optional(),
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
      orderBy: z.object({
         unit: z.enum(['asc', 'desc']).optional(),
         rotina: z.enum(['asc', 'desc']).optional(),
         modulo: z.enum(['asc', 'desc']).optional(),
         conteudo: z.enum(['asc', 'desc']).optional(),
         createdAt: z.enum(['asc', 'desc']).optional()
      }).optional()
   })

   const queryErrorParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })

   try {
      const {
         unit,
         rotina,
         modulo,
         conteudo,
         dataInicio,
         dataFim,
         orderBy
      } = queryErrorBodySchema.parse(request.body)

      const { page } = queryErrorParamsSchema.parse(request.params)

      const findErrorByQueryUseCase = makeFindErrorByQueryUseCase()

      const query = {
         unit,
         rotina,
         modulo,
         conteudo,
         dataInicio,
         dataFim,
         orderBy
      }

      const { errors, total } = await findErrorByQueryUseCase.execute({
         query,
         page
      })

      return reply.status(200).send({
         errors,
         total
      })
   } catch (error) {
      if (error instanceof ResourceNotFoundError) {
         return reply.status(404).send({ message: error.message })
      }

      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error.issues[0].message })
      }

      return reply.status(500).send('Erro interno do servidor');
   }


}