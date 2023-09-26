import { makeGetPageViewUseCase } from "@/use-cases/factories/make-get-page-view-use-case";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
		pageViewId: z.string().uuid()
	})

   const {pageViewId} = getParamsSchema.parse(request.params)
   
	const getPageViewUseCase = makeGetPageViewUseCase()

   const {pageView} = await getPageViewUseCase.execute({
      pageViewId,
   })

   if (!pageView) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      pageView,
   })
}