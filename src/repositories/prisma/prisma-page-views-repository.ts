import { PageViewQuery } from "@/interface/page-view-query-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PageViewsRepository } from "../page-views-repository";

export class PrismaPageViewsRepository implements PageViewsRepository {
   async findManyByQuery(query: PageViewQuery, page: number) {
      const total = await prisma.pageView.count({
         where: {
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.codCliente && { codCliente: { contains: query.codCliente } }),
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

      const pageViews = await prisma.pageView.findMany({
         where: {
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo } }),
            ...(query.codCliente && { codCliente: { contains: query.codCliente } }),
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
                  query.orderBy.rotina ? { rotina: query.orderBy.rotina } : {},
                  query.orderBy.modulo ? { modulo: query.orderBy.modulo } : {},
                  query.orderBy.codCliente ? { codCliente: query.orderBy.codCliente } : {},
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
         pageViews,
         total
      }

   }
   async findById(id: string) {
      const pageView = await prisma.pageView.findUnique({
         where: {
            id,
         }
      })

      return pageView
   }
   async create(data: Prisma.PageViewUncheckedCreateInput) {
      const pageView = await prisma.pageView.create({
         data,
      })

      return pageView
   }
}