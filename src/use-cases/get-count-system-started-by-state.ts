import { countSystemStartedQuery } from "@/interface/system-started-query-interface";
import { SystemStartedRepository } from "@/repositories/system-started-repository";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetCountSystemStartedByQueryUseCaseRequest {
   query: countSystemStartedQuery
}

interface GetCountSystemStartedByQueryUseCaseResponse {
   count: number
}

export class GetCountSystemStartedByQueryUseCase {
   constructor(
      private systemStartedRepository: SystemStartedRepository
   ) { }

   async execute({
      query
   }: GetCountSystemStartedByQueryUseCaseRequest
   ): Promise<GetCountSystemStartedByQueryUseCaseResponse> {

      const { count } = await this.systemStartedRepository.countByQuery(query)

      if (!count) {
         return {
            count: 0
         }
      }

      return {
         count,
      }
   }
}