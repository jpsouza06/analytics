import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySystemStartedRepository } from '@/repositories/in-memory/in-memory-system-started-repository'
import { GetCountSystemStartedByQueryUseCase } from './get-count-system-started-by-state'

let systemStartedRepository: InMemorySystemStartedRepository
let sut: GetCountSystemStartedByQueryUseCase

describe('Get Count System Started Use Case', () => {
   beforeEach(() => {
      systemStartedRepository = new InMemorySystemStartedRepository()
      sut = new GetCountSystemStartedByQueryUseCase(systemStartedRepository)
   })

   it('should be able to get system started count by query', async () => {
      await systemStartedRepository.create({
         estado: 'MG',
         filial: 'filial',
         modulo: 'modulo',
      })

      await systemStartedRepository.create({
         estado: 'MG',
         filial: 'filial',
         modulo: 'modulo',
      })

      await systemStartedRepository.create({
         estado: 'RJ',
         filial: 'filial',
         modulo: 'modulo',
      })

      await systemStartedRepository.create({
         estado: 'RJ',
         filial: 'filial',
         modulo: 'modulo1',
      })

      const { score } = await sut.execute({
         query: {
            dataInicio: new Date('01-01-2000').toString(),
            modulo: 'modulo'
         }
      })

      expect(score).toEqual(
         expect.objectContaining({ 'MG': 2, 'RJ': 1 })
      )
   })
})