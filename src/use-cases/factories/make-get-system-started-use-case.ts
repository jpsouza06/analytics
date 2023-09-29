import { PrismaSystemStartedRepository } from '@/repositories/prisma/system-started-repository'
import { GetSystemStartedUseCase } from '../get-system-started'

export function makeGetSystemStartedUseCase() {
   const systemStartedRepository = new PrismaSystemStartedRepository()
   const getSystemStartedUseCase = new GetSystemStartedUseCase(systemStartedRepository)

   return getSystemStartedUseCase
}