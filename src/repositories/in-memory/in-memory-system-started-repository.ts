import { findSystemStartedQuery, countSystemStartedQuery } from "@/interface/system-started-query-interface";
import { Prisma, SystemStarted } from "@prisma/client";
import { randomUUID } from "crypto";
import { SystemStartedRepository } from "../system-started-repository";

export class InMemorySystemStartedRepository implements SystemStartedRepository {
   public items: SystemStarted[] = []

   async countByState(query: countSystemStartedQuery) {
      let itemsQuery: SystemStarted[] = this.items
      const contagem: any = {};

      query.estado && (
         itemsQuery = itemsQuery.filter(item => item.estado === query.estado)
      )

      query.modulo && (
         itemsQuery = itemsQuery.filter(item => item.modulo === query.modulo)
      )

      query.filial && (
         itemsQuery = itemsQuery.filter(item => item.filial === query.filial)
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

      itemsQuery.forEach((item) => {
         const estado = item.estado;

         if (contagem[estado]) {
            contagem[estado] += 1
         } else {
            contagem[estado] = 1
         }
      });

      return contagem
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
         systemStarted: itemsQuery.slice((page - 1) * 20, page * 20),
         total: itemsQuery.length
      }
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
         count: itemsQuery.length
      }
   }
   async findById(id: string) {
      const systemStarted = this.items.find(item => item.id === id)

      if (!systemStarted) {
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