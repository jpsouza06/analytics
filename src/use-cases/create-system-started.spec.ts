import { beforeEach, describe, expect, it } from 'vitest'
import { CreatePageViewUseCase } from './create-page-view'
import { InMemorySystemStartedRepository } from '@/repositories/in-memory/in-memory-system-started-repository'
import { CreateSystemStartedUseCase } from './create-system-started'

let systemStartedRepository: InMemorySystemStartedRepository
let sut: CreateSystemStartedUseCase

describe('Create System Started Use Case', () => {
   beforeEach(() => {
      systemStartedRepository = new InMemorySystemStartedRepository()
      sut = new CreateSystemStartedUseCase(systemStartedRepository)
   })

   it('should be able to create a system started', async () => {
      const { systemStarted } = await sut.execute({
         estado: 'MG',
         modulo: 'Modulo',
         codCliente: '1',
         cidade: 'Cidade',
         versao: '1'
      })

      expect(systemStarted.id).toEqual(expect.any(String))
   })
})