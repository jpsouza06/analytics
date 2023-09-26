import { beforeEach, describe, expect, it } from 'vitest'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { GetPageViewUseCase } from './get-page-view'
import { InMemoryPageViewsRepository } from '@/repositories/in-memory/in-memory-page-views-repositoty'

let pageViewRepository: InMemoryPageViewsRepository
let sut: GetPageViewUseCase

describe('Get Page View Use Case', () => {
	beforeEach(() => {
		pageViewRepository = new InMemoryPageViewsRepository()
		sut = new GetPageViewUseCase(pageViewRepository)
	})

	it('should be able to get a page view by id', async () => {
		const {id} = await pageViewRepository.create({
         id: 'pageviewid',
         rotina: 'Rotina',
         modulo: 'Modulo'
		})
      console.log(id)
		const { pageView } = await sut.execute({
			pageViewId: 'pageviewid'
		})
      
		expect(pageView.id).toEqual('pageviewid')
	})

	it('should not be able to get a page view with wrong id', async () => {
		await expect(() => sut.execute({
			pageViewId: 'error-01'
		})).rejects.toBeInstanceOf(ResourceNotFoundError)
	})
})