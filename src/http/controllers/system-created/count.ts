import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import {
   makeGetCountSystemStartedByQueryUseCase
} from "@/use-cases/factories/system-created/make-get-count-system-started-by-query";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Count(request: FastifyRequest, reply: FastifyReply) {
   const querySystemStartedBodySchema = z.object({
      estado: z.string().optional(),
      modulo: z.string().optional(),
      filial: z.string().optional(),
      dataInicio: z.string().optional(),
      dataFim: z.string().optional(),
   })

   const {
      estado,
      modulo,
      filial,
      dataInicio,
      dataFim
   } = querySystemStartedBodySchema.parse(request.body)

   try {
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

   } catch (error) {
      if (error instanceof ResourceNotFoundError) {
         return reply.status(404).send({ message: error.message })
      }

      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error.issues })
      }

      return reply.status(500).send({ message: 'Erro interno do servidor' });
   }
}