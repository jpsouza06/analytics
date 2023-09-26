import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryErrorsRepository } from '@/repositories/in-memory/in-memory-errors-repository'
import { FindErrorByQueryUseCase } from './find-error-by-query'

let errorRepository: InMemoryErrorsRepository
let sut: FindErrorByQueryUseCase

describe('Find Error Use Case', () => {
	beforeEach(() => {
		errorRepository = new InMemoryErrorsRepository()
		sut = new FindErrorByQueryUseCase(errorRepository)
	})

	it('should be able to find errors by query', async () => {
		await errorRepository.create({
			unit: 'Unit',
         rotina: 'Rotina',
         modulo: 'Modulo',
         conteudo: 'Conteudo'
		})

		const { errors } = await sut.execute({
			query: {
            unit: 'Unit',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 1
		})
      
      expect(errors).toHaveLength(1)
		expect(errors).toEqual([
         expect.objectContaining({unit: 'Unit'})
      ])
	})

	it('should be able to find errors per pages', async () => {
		for (let i = 0; i<21; i++) {
			await errorRepository.create({
				unit: 'Unit',
				rotina: 'Rotina',
				modulo: 'Modulo',
				conteudo: 'Conteudo'
			})
		}

		const { errors } = await sut.execute({
			query: {
            unit: 'Unit',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 2
		})
      
      expect(errors).toHaveLength(1)
		expect(errors).toEqual([
         expect.objectContaining({unit: 'Unit'})
      ])
	})

	it('should be able to find errors between dates', async () => {
		await errorRepository.create({
			unit: 'Unit',
			rotina: 'Rotina',
			modulo: 'Modulo',
			conteudo: 'Conteudo',
			createdAt: '01-01-2020'
		})

		await errorRepository.create({
			unit: 'Unit',
			rotina: 'Rotina',
			modulo: 'Modulo',
			conteudo: 'Conteudo',
			createdAt: '01-01-2022'
		})

		const { errors } = await sut.execute({
			query: {
            unit: 'Unit',
            dataInicio: new Date('01-01-2019').toString(),
				dataFim: new Date('01-02-2020').toString()
         },
         page: 1
		})
      
      expect(errors).toHaveLength(1)
		expect(errors).toEqual([
         expect.objectContaining({
				unit: 'Unit', 
				createdAt: new Date('01-01-2020')
			})
      ])
	})
})