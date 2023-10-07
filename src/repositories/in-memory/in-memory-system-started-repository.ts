import { findSystemStartedQuery, countSystemStartedQuery } from "@/interface/system-started-query-interface";
import { Prisma, SystemStarted } from "@prisma/client";
import { randomUUID } from "crypto";
import { SystemStartedRepository } from "../system-started-repository";

export class InMemorySystemStartedRepository implements SystemStartedRepository {
   public items: SystemStarted[] = []

   async countByState(query: countSystemStartedQuery) {
      let itemsQuery: SystemStarted[] = this.items

      const contagem = [
         { estado: 'MG', count: 1 },
      ]

      itemsQuery.forEach((item) => {
         const estado = item.estado;

         contagem.forEach((state) => 
    
      return contagem;

            return {
               count: itemsQuery.length
            }
         }


   async findManyByQuery(query: findSystemStartedQuery, page: number) {
            let itemsQuery: SystemStarted[] = this.items

      query.estado && (
               itemsQuery = itemsQuery.filter(item => item.estado === query.estado)
            )

      query.modulo && (
               itemsQuery = itemsQuery.filter(item => item.modulo === query.modulo)
            )

      query.filial && (
               itemsQuery = itemsQuery.filter(item => item.filial === query.filial)
            )

      itemsQuery = itemsQuery.filter(
               item => item.createdAt >= new Date(query.dataInicio)
            )

      itemsQuery = itemsQuery.filter(
               item => query.dataFim ?
                  item.createdAt <= new Date(query.dataFim) :
                  item.createdAt <= new Date()
            )

      return itemsQuery.slice((page - 1) * 20, page * 20)
         }
   async countByQuery(query: countSystemStartedQuery) {
            let itemsQuery: SystemStarted[] = this.items

      query.estado && (
               itemsQuery = itemsQuery.filter(item => item.estado === query.estado)
            )

      query.modulo && (
               itemsQuery = itemsQuery.filter(item => item.modulo === query.modulo)
            )

      query.filial && (
               itemsQuery = itemsQuery.filter(item => item.filial === query.filial)
            )

      itemsQuery = itemsQuery.filter(
               item => item.createdAt >= new Date(query.dataInicio)
            )

      itemsQuery = itemsQuery.filter(
               item => query.dataFim ?
                  item.createdAt <= new Date(query.dataFim) :
                  item.createdAt <= new Date()
            )

      return {
               count: itemsQuery.length
            }
         }
   async findById(id: string) {
            const systemStarted = this.items.find(item => item.id === id)

      if(!systemStarted) {
               return null
            }

      return systemStarted
         }
   async create(data: Prisma.SystemStartedUncheckedCreateInput) {
            const systemStarted = {
               id: data.id ?? randomUUID(),
               estado: data.estado,
               modulo: data.modulo,
               filial: data.filial,
               createdAt: data.createdAt ? new Date(data.createdAt) : new Date()
            }

      this.items.push(systemStarted)

      return systemStarted
         }
}