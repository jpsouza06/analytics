import { countSystemStartedQuery, findSystemStartedQuery } from "@/interface/system-started-query-interface";
import { Prisma, SystemStarted } from "@prisma/client";

export interface SystemStartedRepository {
   findManyByQuery(query: findSystemStartedQuery, page: number): Promise<SystemStarted[] | null>
   countByQuery(query: countSystemStartedQuery): Promise<{ count: number }>
   findById(id: string): Promise<SystemStarted | null>
   create(data: Prisma.SystemStartedUncheckedCreateInput): Promise<SystemStarted>
}