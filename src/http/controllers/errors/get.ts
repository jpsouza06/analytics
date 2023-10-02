import { makeGetErrorUseCase } from "@/use-cases/factories/error/make-get-error-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getErrorsParamsSchema = z.object({
      errorId: z.string().uuid()
   })

   const { errorId } = getErrorsParamsSchema.parse(request.params)

   const getErrorUseCase = makeGetErrorUseCase()

   const { error } = await getErrorUseCase.execute({
      errorId,
   })

   if (!error) {
      return reply.status(404).send()
   }

   return reply.status(200).send({
      error,
   })
}