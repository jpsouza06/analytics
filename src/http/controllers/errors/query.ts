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

      const { errors } = await findErrorByQueryUseCase.execute({
         query,
         page
      })

      if (!errors || errors.length === 0) {
         return reply.status(404).send()
      }

      return reply.status(200).send({
         errors,
      })
   } catch (err) {
      if (err instanceof z.ZodError) {
         console.log(err)
         return reply.status(400).send({ message: err.issues })
      }

      return reply.status(500).send('Erro interno do servidor');
   }


}