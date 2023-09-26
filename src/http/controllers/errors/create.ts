import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreateErrorUseCase } from "@/use-cases/factories/make-create-error-use-case";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createErrorBodySchema = z.object({
      unit: z.string(),
      rotina: z.string(),
      modulo: z.string(),
      conteudo: z.string()
   })

   const {unit, rotina, modulo, conteudo} = createErrorBodySchema.parse(request.body)

   const createUseCase = makeCreateErrorUseCase()

	const {error} = await createUseCase.execute({
      unit,
      rotina,
      modulo,
      conteudo
	})

   return reply.status(201).send({
      error,
   })
}