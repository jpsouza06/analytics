import { SystemStartedRepository } from "@/repositories/system-started-repository";
import { SystemStarted } from "@prisma/client";

interface CreateSystemStartedUseCaseRequest {
   estado: string;
   cidade: string;
   modulo: string;
   codCliente: string;
   versao: string;
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
      cidade,
      modulo,
      codCliente,
      versao
   }: CreateSystemStartedUseCaseRequest): Promise<CreateSystemStartedUseCaseResponse> {
      const systemStarted = await this.systemStartedRepository.create({
         estado,
         cidade,
         modulo,
         codCliente,
         versao
      })

      return {
         systemStarted,
      }
   }
}