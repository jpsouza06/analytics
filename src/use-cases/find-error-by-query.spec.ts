import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
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
            dataInicio: String(new Date())
         },
         page: 1
		})
      
      expect(errors).toHaveLength(1)
		expect(errors).toEqual([
         expect.objectContaining({unit: 'Unit'})
      ])
	})
})