import { SystemStartedRepository } from "@/repositories/system-started-repository";
import { SystemStarted } from "@prisma/client";

interface CreateSystemStartedUseCaseRequest {
   estado: string;
   modulo: string;
   filial: string;
}

interface CreateSystemStartedUseCaseResponse {
   systemStarted: SystemStarted
}

export class CreateSystemStartedUseCase {
   constructor(
      private systemStartedRepository: SystemStartedRepository
   ) { }

   async execute({
      estado,
      modulo,
      filial
   }: CreateSystemStartedUseCaseRequest): Promise<CreateSystemStartedUseCaseResponse> {
      const systemStarted = await this.systemStartedRepository.create({
         estado,
         modulo,
         filial
      })

      return {
         systemStarted,
      }
   }
}