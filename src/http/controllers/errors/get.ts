import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetErrorUseCase } from "@/use-cases/factories/error/make-get-error-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getErrorsParamsSchema = z.object({
      errorId: z.string().uuid()
   })

   try {
      const { errorId } = getErrorsParamsSchema.parse(request.params)

      const getErrorUseCase = makeGetErrorUseCase()

      const { error } = await getErrorUseCase.execute({
         errorId,
      })

      return reply.status(200).send({
         error,
      })

   } catch (error) {
      if (error instanceof ResourceNotFoundError) {
         return reply.status(404).send({ message: error.message })
      }

      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error.issues })
      }

      return reply.status(500).send('Erro interno do servidor');
   }
}