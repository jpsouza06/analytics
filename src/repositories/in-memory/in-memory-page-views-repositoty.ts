import { PageViewQuery } from "@/interface/page-view-query-interface";
import { PageView, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { PageViewsRepository } from "../page-views-repository";

export class InMemoryPageViewsRepository implements PageViewsRepository {
   public items: PageView[] = []
   async findManyByQuery(query: PageViewQuery, page: number) {
      let itemsQuery: PageView[] = this.items

      query.rotina && (
         itemsQuery = itemsQuery.filter(item => item.rotina === query.rotina)
      )

      query.modulo && (
         itemsQuery = itemsQuery.filter(item => item.modulo === query.modulo)
      )

      query.codCliente && (
         itemsQuery = itemsQuery.filter(item => item.codCliente === query.codCliente)
      )

      query.dataInicio && (
         itemsQuery = itemsQuery.filter(
            item => query.dataInicio && item.createdAt >= new Date(query.dataInicio)
         )
      )

      query.dataFim && (
         itemsQuery = itemsQuery.filter(
            item => query.dataFim && item.createdAt <= new Date(query.dataFim)
         )
      )

      return {
         pageViews: itemsQuery.slice((page - 1) * 20, page * 20),
         total: itemsQuery.length
      }
   }
   async findById(id: string) {
      const pageView = this.items.find(item => item.id === id)

      if (!pageView) {
         return null
      }

      return pageView
   }
   async create(data: Prisma.PageViewUncheckedCreateInput) {
      const pageView = {
         id: data.id ?? randomUUID(),
         rotina: data.rotina,
         modulo: data.modulo,
         codCliente: data.codCliente,
         createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
      }

      this.items.push(pageView)

      return pageView
   }
}