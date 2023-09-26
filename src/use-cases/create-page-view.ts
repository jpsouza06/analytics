import { PageViewsRepository } from "@/repositories/page-views-repository";
import { PageView } from "@prisma/client";

interface CreatePageViewUseCaseRequest {
   rotina: string;
   modulo: string;
}

interface CreatePageViewUseCaseResponse {
   pageView: PageView
}

export class CreatePageViewUseCase {
   constructor(
      private pageViewRepository: PageViewsRepository
   ) {}

   async execute({
      rotina,
      modulo,
   }: CreatePageViewUseCaseRequest): Promise<CreatePageViewUseCaseResponse> {
      const pageView = await this.pageViewRepository.create({
         rotina,
         modulo,
      })

      return {
         pageView,
      }
   }
}