import { findSystemStartedQuery, countSystemStartedQuery } from "@/interface/system-started-query-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { SystemStartedRepository } from "../system-started-repository";

export class PrismaSystemStartedRepository implements SystemStartedRepository {
   async findManyByQuery(query: findSystemStartedQuery, page: number) {
      const systemStarted = await prisma.systemStarted.findMany({
         where: {
            ...(query.estado && { estado: { contains: query.estado } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.filial && { filial: { contains: query.filial } }),
            ...(query.dataInicio &&
            {
               createdAt: {
                  gte: new Date(query.dataInicio),
                  lte:
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

      return systemStarted
   }
   async countByQuery(query: countSystemStartedQuery) {
      const count = await prisma.systemStarted.count({
         where: {
            ...(query.estado && { estado: { contains: query.estado } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.filial && { filial: { contains: query.filial } }),
            ...(query.dataInicio &&
            {
               createdAt: {
                  gte: new Date(query.dataInicio),
                  lte:
                     (
                        query.dataFim ?
                           new Date(query.dataFim) :
                           new Date()
                     )
               }
            }),
         }
      })

      return {
         count
      }
   }
   async findById(id: string) {
      const systemStarted = await prisma.systemStarted.findUnique({
         where: {
            id,
         }
      })

      return systemStarted
   }
   async create(data: Prisma.SystemStartedUncheckedCreateInput) {
      const systemStarted = await prisma.systemStarted.create({
         data,
      })

      return systemStarted
   }
}