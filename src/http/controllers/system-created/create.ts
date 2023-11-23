import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateSystemStartedUseCase } from "@/use-cases/factories/system-created/make-create-system-started-use-case";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createSystemCreatedSchema = z.object({
      estado: z.string().length(2),
      cidade: z.string(),
      modulo: z.string(),
      codCliente: z.string(),
      versao: z.string(),
   })
   try {
      const {
         estado,
         cidade,
         modulo,
         codCliente,
         versao
      } = createSystemCreatedSchema.parse(request.body)

      const createUseCase = makeCreateSystemStartedUseCase()

      await createUseCase.execute({
         estado,
         cidade,
         modulo,
         codCliente,
         versao,
      })

      return reply.status(201).send()

   } catch (error) {
      if (error instanceof z.ZodError) {
         return reply.status(400).send({ message: error })
      }

      return reply.status(500).send({ message: 'Erro interno do servidor' });
   }
}