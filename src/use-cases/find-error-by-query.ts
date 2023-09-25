import { ErrorQuery } from "@/interface/error-query-interface";
import { ErrorsRepository } from "@/repositories/errors-repository";
import { Error } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FindErrorByQueryUseCaseRequest {
   query: ErrorQuery
   page: number
}

interface FindErrorByQueryUseCaseResponse {
   errors: Error[]
}

export class FindErrorByQueryUseCase {
   constructor(
      private errorsRepository: ErrorsRepository
   ) {}

   async execute({
      query,
      page
   }: FindErrorByQueryUseCaseRequest): Promise<FindErrorByQueryUseCaseResponse> {
      
      const errors = await this.errorsRepository.findManyByQuery(query, page)

      if (!errors) {
         throw new ResourceNotFoundError()
      }

      return {
         errors,
      }
   }
}