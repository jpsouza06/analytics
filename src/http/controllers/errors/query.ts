import { prisma } from "@/lib/prisma";
import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";

export async function Query(request: FastifyRequest, reply: FastifyReply) {
   const getBodySchema = z.object({
      unit: z.string().optional(),
      rotina: z.string().optional(),
      modulo: z.string().optional(),
      filial: z.string().optional(),
      conteudo: z.string().optional()
	})

   const {unit, rotina, modulo, filial, conteudo} = getBodySchema.parse(request.body)
   
	const errors = await prisma.error.findMany({
      where: {
         ...(unit && { unit: { contains: unit } }),
         ...(rotina && { rotina: { contains: rotina } }),
         ...(modulo && { modulo: { contains: modulo} }),
         ...(filial && { filial: { contains: filial } }),
         ...(conteudo && { conteudo: { contains: conteudo } })
      }
	})
   
   if (!errors || errors.length === 0) {
      return reply.status(400).send()
   }

   return reply.status(200).send({
      errors,
   })
}