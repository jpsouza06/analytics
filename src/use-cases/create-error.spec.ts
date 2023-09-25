import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryErrorsRepository } from '@/repositories/in-memory/in-memory-errors-repository'
import { CreateErrorUseCase } from './create-error'

let errorRepository: InMemoryErrorsRepository
let sut: CreateErrorUseCase

describe('Create Error Use Case', () => {
	beforeEach(() => {
		errorRepository = new InMemoryErrorsRepository()
		sut = new CreateErrorUseCase
      (errorRepository)
	})

	it('should be able to create a error', async () => {
		const { error } = await sut.execute({
			unit: 'Unit',
         modulo: 'Modulo',
         rotina: 'Rotina',
         conteudo: 'Conteudo'
		})
      
		expect(error.id).toEqual(expect.any(String))
	})
})