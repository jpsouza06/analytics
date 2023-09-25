import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createPagesViewSchema = z.object({
      rotina: z.string(),
      modulo: z.string(),
      filial: z.string()
   })

   const {rotina, modulo, filial} = createPagesViewSchema.parse(request.body)

	const pageView = await prisma.pageView.create({
      data: {
         id: randomUUID(),
         rotina,
         modulo,
         filial 
      }
	})

   return reply.status(201).send({
      pageView,
   })
}