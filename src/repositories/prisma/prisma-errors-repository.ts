import { ErrorQuery } from "@/interface/error-query-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { ErrorsRepository } from "../errors-repository";

export class PrismaErrorsRepository implements ErrorsRepository {
   async findManyByQuery(query: ErrorQuery, page: number) {
      const total = await prisma.error.count({
         where: {
            ...(query.unit && { unit: { contains: query.unit } }),
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.conteudo && { conteudo: { contains: query.conteudo } }),
            createdAt: {
               gte: (
                  query.dataInicio && new Date(query.dataInicio)
               ),
               lte: (
                  query.dataFim && new Date(query.dataFim)
               )
            }
         }
      })

      const errors = await prisma.error.findMany({
         where: {
            ...(query.unit && { unit: { contains: query.unit } }),
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.conteudo && { conteudo: { contains: query.conteudo } }),
            createdAt: {
               gte: (
                  query.dataInicio && new Date(query.dataInicio)
               ),
               lte: (
                  query.dataFim && new Date(query.dataFim)
               )
            }
         },
         orderBy:
            query.orderBy ?
               [
                  query.orderBy.unit ? { unit: query.orderBy.unit } : {},
                  query.orderBy.rotina ? { rotina: query.orderBy.rotina } : {},
                  query.orderBy.modulo ? { modulo: query.orderBy.modulo } : {},
                  query.orderBy.conteudo ? { conteudo: query.orderBy.conteudo } : {},
                  query.orderBy.createdAt ? { createdAt: query.orderBy.createdAt } : {},
               ]
               :
               [
                  { createdAt: 'desc' }
               ],
         take: 20,
         skip: (page - 1) * 20,
      })

      return {
         errors,
         total
      }
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