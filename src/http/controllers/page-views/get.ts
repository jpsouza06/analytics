import { ResourceNotFoundError } from "@/use-cases/errors/resource-not-found-error";
import { makeGetPageViewUseCase } from "@/use-cases/factories/page-view/make-get-page-view-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
      pageViewId: z.string().uuid()
   })
   try {
      const { pageViewId } = getParamsSchema.parse(request.params)

      const getPageViewUseCase = makeGetPageViewUseCase()

      const { pageView } = await getPageViewUseCase.execute({
         pageViewId,
      })

      if (!pageView) {
         return reply.status(404).send()
      }

      return reply.status(200).send({
         pageView,
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