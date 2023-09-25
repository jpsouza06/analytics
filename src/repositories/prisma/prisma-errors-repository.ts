import { ErrorQuery } from "@/interface/error-query-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ErrorsRepository } from "../errors-repository";

export class PrismaErrorsRepository implements ErrorsRepository {
   async findManyByQuery(query: ErrorQuery, page: number)  {
      const errors = await prisma.error.findMany({
         where: {
            ...(query.unit && { unit: { contains: query.unit } }),
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo} }),
            ...(query.conteudo && { conteudo: { contains: query.conteudo} }),
            ...(query.dataInicio && 
               { 
                  data: {
                     lte: new Date(query.dataInicio),
                     get: 
                        (
                           query.dataFim ? 
                           new Date(query.dataFim) : 
                           new Date()
                        )
                  } 
               }),
         },
         take: 20,
         skip: (page - 1) * 20,
      })

      return errors
   }
   async findById(id: string) {
      const error = await prisma.error.findUnique({
         where: {
            id,
         }
      })

      return error
   }
   async create(data: Prisma.ErrorUncheckedCreateInput) {
      const error = await prisma.error.create({
         data,
      })

      return error
   }
}