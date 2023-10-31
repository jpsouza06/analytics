import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPageViewsRepository } from '@/repositories/in-memory/in-memory-page-views-repositoty'
import { CreatePageViewUseCase } from './create-page-view'

let pageViewRepository: InMemoryPageViewsRepository
let sut: CreatePageViewUseCase

describe('Create Page View Use Case', () => {
	beforeEach(() => {
		pageViewRepository = new InMemoryPageViewsRepository()
		sut = new CreatePageViewUseCase(pageViewRepository)
	})

	it('should be able to create a page view', async () => {
		const { pageView } = await sut.execute({
			modulo: 'Modulo',
			rotina: 'Rotina',
			codCliente: '1'
		})

		expect(pageView.id).toEqual(expect.any(String))
	})
})