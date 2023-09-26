import { PageViewQuery } from "@/interface/page-view-query-interface";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";
import { PageViewsRepository } from "../page-views-repository";

export class PrismaPageViewsRepository implements PageViewsRepository {
   async findManyByQuery(query: PageViewQuery, page: number)  {
      console.log(query)
      const pageViews = await prisma.pageView.findMany({
         where: {
            ...(query.rotina && { rotina: { contains: query.rotina } }),
            ...(query.modulo && { modulo: { contains: query.modulo} }),
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
      console.log(pageViews)
      return pageViews
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