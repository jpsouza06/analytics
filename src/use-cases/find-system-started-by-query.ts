import { findSystemStartedQuery } from "@/interface/system-started-query-interface";
import { SystemStartedRepository } from "@/repositories/system-started-repository";
import { SystemStarted } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FindSystemStartedByQueryUseCaseRequest {
   query: findSystemStartedQuery,
   page: number
}

interface FindSystemStartedByQueryUseCaseResponse {
   systemStarted: SystemStarted[],
   total: number
}

export class FindSystemStartedByQueryUseCase {
   constructor(
      private systemStartedRepository: SystemStartedRepository
   ) { }

   async execute({
      query,
      page
   }: FindSystemStartedByQueryUseCaseRequest
   ): Promise<FindSystemStartedByQueryUseCaseResponse> {
      const systemStarted = await this.systemStartedRepository.findManyByQuery(query, page)

      if (!systemStarted) {
         throw new ResourceNotFoundError()
      }

      const { count } = await this.systemStartedRepository.countByQuery(query)

      return {
         systemStarted,
         total: count
      }
   }
}