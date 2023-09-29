import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { InMemoryErrorsRepository } from '@/repositories/in-memory/in-memory-errors-repository'
import { GetErrorUseCase } from './get-error'
import { GetSystemStartedUseCase } from './get-system-started'
import { InMemorySystemStartedRepository } from '@/repositories/in-memory/in-memory-system-started-repository'

let systemStartedRepository: InMemorySystemStartedRepository
let sut: GetSystemStartedUseCase

describe('Get System Started Use Case', () => {
	beforeEach(() => {
		systemStartedRepository = new InMemorySystemStartedRepository()
		sut = new GetSystemStartedUseCase(systemStartedRepository)
	})

	it('should be able to get a system started by id', async () => {
		const systemStartedCreated = await systemStartedRepository.create({
			estado: 'MG',
			modulo: 'Modulo',
			filial: 'Conteudo'
		})

		const { systemStarted } = await sut.execute({
			systemStartedId: systemStartedCreated.id
		})

		expect(systemStarted.id).toEqual(systemStartedCreated.id)
	})

	it('should not be able to get a system started with wrong id', async () => {
		await expect(() => sut.execute({
			systemStartedId: 'wrong-id'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})