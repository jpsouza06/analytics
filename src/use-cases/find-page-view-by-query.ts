import { PageViewQuery } from "@/interface/page-view-query-interface";
import { PageViewsRepository } from "@/repositories/page-views-repository";
import { PageView } from "@prisma/client";
import { ResourceNotFoundError } from "./errors/resource-not-found-error";

interface FindPageViewByQueryUseCaseRequest {
   query: PageViewQuery
   page: number
}

interface FindPageViewByQueryUseCaseResponse {
   pageViews: PageView[],
   total: number
}

export class FindPageViewByQueryUseCase {
   constructor(
      private pageViewRepository: PageViewsRepository
   ) { }

   async execute({
      query,
      page
   }: FindPageViewByQueryUseCaseRequest): Promise<FindPageViewByQueryUseCaseResponse> {

      const data = await this.pageViewRepository.findManyByQuery(query, page)

      if (!data?.pageViews) {
         throw new ResourceNotFoundError()
      }

      return {
         pageViews: data.pageViews,
         total: data.total
      }
   }
}