import { ErrorQuery } from "@/interface/error-query-interface";
import { Error, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { ErrorsRepository } from "../errors-repository";

export class InMemoryErrorsRepository implements ErrorsRepository {
   public items: Error[] = []
   async findManyByQuery(query: ErrorQuery, page: number) {
      let itemsQuery: Error[] = this.items

      query.unit && (
         itemsQuery = itemsQuery.filter(item => item.unit === query.unit)
      )

      query.rotina && (
         itemsQuery = itemsQuery.filter(item => item.rotina === query.rotina)
      )

      query.modulo && (
         itemsQuery = itemsQuery.filter(item => item.modulo === query.modulo)
      )

      query.conteudo && (
         itemsQuery = itemsQuery.filter(item => item.conteudo === query.conteudo)
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

      return itemsQuery.slice((page - 1) * 20, page * 20)
   }
   async findById(id: string) {
      const error = this.items.find(item => item.id === id)

      if (!error) {
         return null
      }

      return error
   }
   async create(data: Prisma.ErrorUncheckedCreateInput) {
      const error = {
         id: randomUUID(),
         unit: data.unit,
         rotina: data.rotina,
         modulo: data.modulo,
         conteudo: data.conteudo,
         createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
      }

      this.items.push(error)

      return error
   }
}