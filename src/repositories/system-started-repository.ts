import { countSystemStartedQuery, findSystemStartedQuery } from "@/interface/system-started-query-interface";
import { Prisma, SystemStarted } from "@prisma/client";

export interface SystemStartedRepository {
   countByState(query: countSystemStartedQuery): Promise<[{ _count: number, estado: string }]>
   findManyByQuery(query: findSystemStartedQuery, page: number): Promise<{ systemStarted: SystemStarted[], total: number } | null>
   countByQuery(query: countSystemStartedQuery): Promise<{ count: number }>
   findById(id: string): Promise<SystemStarted | null>
   create(data: Prisma.SystemStartedUncheckedCreateInput): Promise<SystemStarted>
}