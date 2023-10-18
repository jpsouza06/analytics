import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { makeCreatePageViewUseCase } from "@/use-cases/factories/page-view/make-create-page-view-use-case";
import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createPagesViewSchema = z.object({
      rotina: z.string(),
      modulo: z.string(),

   })

   try {
      const { rotina, modulo } = createPagesViewSchema.parse(request.body)

      const createUseCase = makeCreatePageViewUseCase()

      const { pageView } = await createUseCase.execute({
         rotina,
         modulo,
      })


      return reply.status(201).send({
         pageView,
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