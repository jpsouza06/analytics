import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetSystemStartedUseCase } from "@/use-cases/factories/system-created/make-get-system-started-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
      systemStartedId: z.string().uuid()
   })

   const { systemStartedId } = getParamsSchema.parse(request.params)

   try {
      const getPageViewUseCase = makeGetSystemStartedUseCase()

      const { systemStarted } = await getPageViewUseCase.execute({
         systemStartedId,
      })

      if (!systemStarted) {
         return reply.status(404).send()
      }

      return reply.status(200).send({
         systemStarted,
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