import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
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
			cidade: 'Cidade',
			modulo: 'Modulo',
			codCliente: 'Conteudo',
			versao: '1'
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