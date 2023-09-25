import { PageViewQuery } from "@/interface/page-view-query-interface";
import { PageView, Prisma } from "@prisma/client";

export interface PageViewsRepository {
   findManyByQuery(query: PageViewQuery, page: number): Promise<PageView[] | null>
   findById(id: string): Promise<PageView | null>
   create(data: Prisma.PageViewUncheckedCreateInput): Promise<PageView>
}