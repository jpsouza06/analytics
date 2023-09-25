import { ErrorQuery } from "@/interface/error-query-interface";
import { Error, Prisma } from "@prisma/client";
import { randomUUID } from "crypto";
import { ErrorsRepository } from "../errors-repository";

export class InMemoryErrorsRepository implements ErrorsRepository {
   public items: Error[] = []
   async findManyByQuery(query: ErrorQuery, page: number) {
      console.log(query)
      return this.items
         .filter(item => {
            {query.unit && item.unit === query.unit}
            {query.rotina && item.rotina === query.rotina}
            {query.modulo && item.modulo === query.modulo}
            {query.conteudo && item.conteudo === query.conteudo}
            {query.dataInicio && 
               item.createdAt >= new Date(query.dataInicio)
            }
            {
               query.dataFim ? 
               item.createdAt <= new Date(query.dataFim) : 
               item.createdAt <= new Date()
            }
         })
         .slice((page - 1) * 20, page * 20)
   }
   async findById(id: string) {
      const error = this.items.find(item => item.id === id)

      if(!error) {
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
         createdAt: new Date(),
      }

      this.items.push(error)

      return error
   }
}