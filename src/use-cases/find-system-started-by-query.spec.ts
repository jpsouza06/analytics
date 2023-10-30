import { beforeEach, describe, expect, it } from 'vitest'
import { InMemorySystemStartedRepository } from '@/repositories/in-memory/in-memory-system-started-repository'
import { FindSystemStartedByQueryUseCase } from './find-system-started-by-query'

let systemStartedRepository: InMemorySystemStartedRepository
let sut: FindSystemStartedByQueryUseCase

describe('Find System Started Use Case', () => {
   beforeEach(() => {
      systemStartedRepository = new InMemorySystemStartedRepository()
      sut = new FindSystemStartedByQueryUseCase(systemStartedRepository)
   })

   it('should be able to find system started by query', async () => {
      await systemStartedRepository.create({
         estado: 'MG',
         cidade: 'Cidade',
         modulo: 'Modulo',
         codCliente: '1',
         versao: '1'
      })

      await systemStartedRepository.create({
         estado: 'RJ',
         cidade: 'Cidade',
         modulo: 'Modulo',
         codCliente: '1',
         versao: '1'
      })

      const { systemStarted } = await sut.execute({
         query: {
            estado: 'MG',
            modulo: 'Modulo',
            codCliente: '1',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 1
      })

      expect(systemStarted).toHaveLength(1)
      expect(systemStarted).toEqual([
         expect.objectContaining({ estado: 'MG' })
      ])
   })

   it('should be able to find system started per pages', async () => {
      for (let i = 0; i < 21; i++) {
         await systemStartedRepository.create({
            estado: 'MG',
            cidade: 'Cidade',
            modulo: 'Modulo',
            codCliente: '1',
            versao: '1'
         })
      }

      const { systemStarted, total } = await sut.execute({
         query: {
            estado: 'MG',
            modulo: 'Modulo',
            codCliente: '1',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 2
      })

      expect(systemStarted).toHaveLength(1)
      expect(total).toEqual(21)
   })

   it('should be able to find system started between dates', async () => {
      await systemStartedRepository.create({
         estado: 'MG',
         cidade: 'Cidade',
         modulo: 'Modulo',
         codCliente: '1',
         versao: '1',
         createdAt: '01-01-2020'
      })

      await systemStartedRepository.create({
         estado: 'MG',
         cidade: 'Cidade',
         modulo: 'Modulo',
         codCliente: '1',
         versao: '1',
         createdAt: '01-01-2022'
      })

      const { systemStarted } = await sut.execute({
         query: {
            estado: 'MG',
            dataInicio: new Date('01-01-2019').toString(),
            dataFim: new Date('01-02-2020').toString()
         },
         page: 1
      })

      expect(systemStarted).toHaveLength(1)
      expect(systemStarted).toEqual([
         expect.objectContaining({
            estado: 'MG',
            createdAt: new Date('01-01-2020')
         })
      ])
   })
})