import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
		pageViewId: z.string().uuid()
	})

   const {pageViewId} = getParamsSchema.parse(request.params)
   
	const pageView = await prisma.pageView.findFirst({
      where: {
         id: pageViewId
      }
	})

   if (!pageView) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      pageView,
   })
}