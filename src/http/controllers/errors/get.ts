import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Get(request: FastifyRequest, reply: FastifyReply) {
   const getParamsSchema = z.object({
		errorId: z.string().uuid()
	})

   const {errorId} = getParamsSchema.parse(request.params)
   
	const error = await prisma.error.findFirst({
      where: {
         id: errorId
      }
	})

   if (!error) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      error,
   })
}