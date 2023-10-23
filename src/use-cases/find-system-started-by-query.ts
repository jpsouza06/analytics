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
      const data = await this.systemStartedRepository.findManyByQuery(query, page)

      if (!data) {
         throw new ResourceNotFoundError()
      }

      return {
         systemStarted: data.systemStarted,
         total: data.total
      }
   }
}