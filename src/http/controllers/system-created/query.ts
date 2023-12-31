import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeFindPageViewByQueryUseCase } from "@/use-cases/factories/page-view/make-find-page-view-by-query-use-case";
import { makeFindSystemStartedByQueryUseCase } from "@/use-cases/factories/system-created/make-find-system-started-by-query-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const querySystemStartedBodySchema = z.object({
      estado: z.string().optional(),
      cidade: z.string().optional(),
      modulo: z.string().optional(),
      codCliente: z.string().optional(),
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
      orderBy: z.object({
         estado: z.enum(['asc', 'desc']).optional(),
         cidade: z.enum(['asc', 'desc']).optional(),
         modulo: z.enum(['asc', 'desc']).optional(),
         codCliente: z.enum(['asc', 'desc']).optional(),
         createdAt: z.enum(['asc', 'desc']).optional()
      }).optional()
   })

   const querySystemStartedParamsSchema = z.object({
      page: z.coerce.number().min(1).default(1)
   })
   try {
      const {
         estado,
         cidade,
         modulo,
         codCliente,
         dataInicio,
         dataFim,
         orderBy
      } = querySystemStartedBodySchema.parse(request.body)

      const { page } = querySystemStartedParamsSchema.parse(request.params)

      const findSystemStartedByQueryUseCase = makeFindSystemStartedByQueryUseCase()

      const query = {
         estado,
         cidade,
         modulo,
         codCliente,
         dataInicio,
         dataFim,
         orderBy
      }

      const { systemStarted, total } = await findSystemStartedByQueryUseCase.execute({
         query,
         page
      })

      return reply.status(200).send({
         systemStarted,
         total
      })

   } catch (error) {
      if (error instanceof ResourceNotFoundError) {
         return reply.status(404).send({ message: error.message })
      }

      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error.issues[0].message })
      }

      return reply.status(500).send({ message: 'Erro interno do servidor' });
   }
}