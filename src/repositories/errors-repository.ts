import { ErrorQuery } from "@/interface/error-query-interface";
import { Error, Prisma } from "@prisma/client";

export interface ErrorsRepository {
   findManyByQuery(query: ErrorQuery, page: number): Promise<Error[] | null>
   findById(id: string): Promise<Error | null>
   create(data: Prisma.ErrorUncheckedCreateInput): Promise<Error>
}