import { SystemStartedRepository } from "@/repositories/system-started-repository";
import { SystemStarted } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetSystemStartedUseCaseRequest {
   systemStartedId: string
}

interface GetSystemStartedUseCaseResponse {
   systemStarted: SystemStarted
}

export class GetSystemStartedUseCase {
   constructor(
      private systemStartedRepository: SystemStartedRepository
   ) { }

   async execute({
      systemStartedId
   }: GetSystemStartedUseCaseRequest): Promise<GetSystemStartedUseCaseResponse> {

      const systemStarted = await this.systemStartedRepository.findById(systemStartedId)

      if (!systemStarted) {
         throw new ResourceNotFoundError()
      }

      return {
         systemStarted,
      }
   }
}