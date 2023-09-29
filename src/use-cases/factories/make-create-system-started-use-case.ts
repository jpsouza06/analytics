import { PrismaSystemStartedRepository } from '@/repositories/prisma/system-started-repository'
import { CreateSystemStartedUseCase } from '../create-system-started'

export function makeCreateSystemStartedUseCase() {
   const systemStartedRepository = new PrismaSystemStartedRepository()
   const createSystemStartedUseCase = new CreateSystemStartedUseCase(systemStartedRepository)

   return createSystemStartedUseCase
}