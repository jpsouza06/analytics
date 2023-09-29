import { PrismaSystemStartedRepository } from '@/repositories/prisma/system-started-repository'
import { FindSystemStartedByQueryUseCase } from '../../find-system-started-by-query'

export function makeFindSystemStartedByQueryUseCase() {
   const systemStartedRepository = new PrismaSystemStartedRepository()
   const findSystemStartedByQueryUseCase = new FindSystemStartedByQueryUseCase(systemStartedRepository)

   return findSystemStartedByQueryUseCase
}