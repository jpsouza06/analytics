import { ErrorsRepository } from "@/repositories/errors-repository";
import { Error } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetErrorUseCaseRequest {
   errorId: string
}

interface GetErrorUseCaseResponse {
   error: Error
}

export class GetErrorUseCase {
   constructor(
      private errorsRepository: ErrorsRepository
   ) {}

   async execute({
      errorId
   }: GetErrorUseCaseRequest): Promise<GetErrorUseCaseResponse> {
      
      const error = await this.errorsRepository.findById(errorId)

      if (!error) {
         throw new ResourceNotFoundError()
      }

      return {
         error,
      }
   }
}