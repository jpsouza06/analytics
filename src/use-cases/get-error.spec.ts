import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryErrorsRepository } from '@/repositories/in-memory/in-memory-errors-repository'
import { GetErrorUseCase } from './get-error'

let errorRepository: InMemoryErrorsRepository
let sut: GetErrorUseCase

describe('Get Error Use Case', () => {
	beforeEach(() => {
		errorRepository = new InMemoryErrorsRepository()
		sut = new GetErrorUseCase(errorRepository)
	})

	it('should be able to get a error by id', async () => {
		const errorCreated = await errorRepository.create({
			unit: 'Unit',
         rotina: 'Rotina',
         modulo: 'Modulo',
         conteudo: 'Conteudo'
		})

		const { error } = await sut.execute({
			errorId: errorCreated.id
		})
      
		expect(error.id).toEqual(errorCreated.id)
	})

	it('should not be able to get a error with wrong id', async () => {
		await expect(() => sut.execute({
			errorId: 'error-01'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})