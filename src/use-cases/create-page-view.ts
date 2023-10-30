import { PageViewsRepository } from "@/repositories/page-views-repository";
import { PageView } from "@prisma/client";

interface CreatePageViewUseCaseRequest {
   rotina: string;
   modulo: string;
   codCliente: string
}

interface CreatePageViewUseCaseResponse {
   pageView: PageView
}

export class CreatePageViewUseCase {
   constructor(
      private pageViewRepository: PageViewsRepository
   ) { }

   async execute({
      rotina,
      modulo,
      codCliente
   }: CreatePageViewUseCaseRequest): Promise<CreatePageViewUseCaseResponse> {
      const pageView = await this.pageViewRepository.create({
         rotina,
         modulo,
         codCliente,
      })

      return {
         pageView,
      }
   }
}