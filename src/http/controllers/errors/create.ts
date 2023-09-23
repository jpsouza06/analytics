import { prisma } from "@/lib/prisma";
import { randomUUID } from "node:crypto";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Create(request: FastifyRequest, reply: FastifyReply) {
   const createPagesViewSchema = z.object({
      unit: z.string(),
      rotina: z.string(),
      modulo: z.string(),
      filial: z.string(),
      conteudo: z.string()
   })

   const {unit, rotina, modulo, filial, conteudo} = createPagesViewSchema.parse(request.body)

	const error = await prisma.error.create({
      data: {
         id: randomUUID(),
         unit,
         rotina,
         modulo,
         filial,
         conteudo
      }
	})

   return reply.status(201).send({
      error,
   })
}