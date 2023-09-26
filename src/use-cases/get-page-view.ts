import { PageViewsRepository } from "@/repositories/page-views-repository";
import { PageView } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface GetPageViewUseCaseRequest {
   pageViewId: string
}

interface GetPageViewUseCaseResponse {
   pageView: PageView
}

export class GetPageViewUseCase {
   constructor(
      private pageViewRepository: PageViewsRepository
   ) {}

   async execute({
      pageViewId
   }: GetPageViewUseCaseRequest): Promise<GetPageViewUseCaseResponse> {
      
      const pageView = await this.pageViewRepository.findById(pageViewId)

      if (!pageView) {
         throw new ResourceNotFoundError()
      }

      return {
         pageView,
      }
   }
}