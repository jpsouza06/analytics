import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateErrorUseCase } from "@/use-cases/factories/error/make-create-error-use-case";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createErrorBodySchema = z.object({
      unit: z.string(),
      rotina: z.string(),
      modulo: z.string(),
      conteudo: z.string()
   })

   try {
      const { unit, rotina, modulo, conteudo } = createErrorBodySchema.parse(request.body)

      const createUseCase = makeCreateErrorUseCase()

      await createUseCase.execute({
         unit,
         rotina,
         modulo,
         conteudo
      })

      return reply.status(201).send()

   } catch (error) {
      if (error instanceof z.ZodError) {
         console.log({ message: error.issues })
         return reply.status(400).send({ message: error.issues })
      }

      return reply.status(500).send('Erro interno do servidor');
   }


}