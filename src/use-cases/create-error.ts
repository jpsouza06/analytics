import { ErrorsRepository } from "@/repositories/errors-repository";
import { Error } from "@prisma/client";

interface CreateErrorUseCaseRequest {
   unit: string;
   rotina: string;
   modulo: string;
   conteudo: string;
}

interface CreateErrorUseCaseResponse {
   error: Error
}

export class CreateErrorUseCase {
   constructor(
      private errorsRepository: ErrorsRepository
   ) {}

   async execute({
      unit,
      rotina,
      modulo,
      conteudo
   }: CreateErrorUseCaseRequest): Promise<CreateErrorUseCaseResponse> {
      const error = await this.errorsRepository.create({
         unit,
         rotina,
         modulo,
         conteudo
      })

      return {
         error,
      }
   }
}