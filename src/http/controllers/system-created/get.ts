import { makeGetSystemStartedUseCase } from "@/use-cases/factories/system-created/make-get-system-started-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
      systemStartedId: z.string().uuid()
   })

   const { systemStartedId } = getParamsSchema.parse(request.params)

   const getPageViewUseCase = makeGetSystemStartedUseCase()

   const { systemStarted } = await getPageViewUseCase.execute({
      systemStartedId,
   })

   if (!systemStarted) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      systemStarted,
   })
}