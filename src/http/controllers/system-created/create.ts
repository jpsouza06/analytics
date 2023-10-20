import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSystemStartedUseCase } from "@/use-cases/factories/system-created/make-create-system-started-use-case";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createSystemCreatedSchema = z.object({
      estado: z.string().length(2),
      modulo: z.string(),
      filial: z.string()
   })
   try {
      const { estado, modulo, filial } = createSystemCreatedSchema.parse(request.body)

      const createUseCase = makeCreateSystemStartedUseCase()

      const { systemStarted } = await createUseCase.execute({
         estado,
         modulo,
         filial
      })

      return reply.status(201).send({
         systemStarted,
      })

   } catch (error) {
      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error.issues })
      }

      return reply.status(500).send({ message: 'Erro interno do servidor' });
   }
}