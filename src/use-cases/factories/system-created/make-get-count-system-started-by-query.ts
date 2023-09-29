import { PrismaSystemStartedRepository } from '@/repositories/prisma/system-started-repository'
import { GetCountSystemStartedByQueryUseCase } from '../../get-count-system-started-by-state'

export function makeGetCountSystemStartedByQueryUseCase() {
   const systemStartedRepository = new PrismaSystemStartedRepository()
   const getCountSystemStartedByQueryUseCase = new GetCountSystemStartedByQueryUseCase(systemStartedRepository)

   getCountSystemStartedByQueryUseCase
}