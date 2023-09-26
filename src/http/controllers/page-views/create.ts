import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePageViewUseCase } from "@/use-cases/factories/make-create-page-view-use-case";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createPagesViewSchema = z.object({
      rotina: z.string(),
      modulo: z.string(),
   })

   const {rotina, modulo} = createPagesViewSchema.parse(request.body)

   const createUseCase = makeCreatePageViewUseCase()

	const {pageView} = await createUseCase.execute({
      rotina,
      modulo,
	})


   return reply.status(201).send({
      pageView,
   })
}