import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const getBodySchema = z.object({
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      filial: z.string().optional()
	})

   const {rotina, modulo, filial} = getBodySchema.parse(request.body)
   
	const pagesView = await prisma.pageView.findMany({
      where: {
         ...(rotina && { rotina: { contains: rotina } }),
         ...(modulo && { modulo: { contains: modulo} }),
         ...(filial && { filial: { contains: filial } }),
      }
	})

   if (!pagesView) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      pagesView,
   })
}