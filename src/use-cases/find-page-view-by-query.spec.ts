import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryPageViewsRepository } from '@/repositories/in-memory/in-memory-page-views-repositoty'
import { FindPageViewByQueryUseCase } from './find-page-view-by-query'

let pageViewRepository: InMemoryPageViewsRepository
let sut: FindPageViewByQueryUseCase

describe('Find Page View Use Case', () => {
	beforeEach(() => {
		pageViewRepository = new InMemoryPageViewsRepository()
		sut = new FindPageViewByQueryUseCase(pageViewRepository)
	})

	it('should be able to find page view by query', async () => {
		await pageViewRepository.create({
         rotina: 'Rotina',
         modulo: 'Modulo',
		})

		const { pageViews } = await sut.execute({
			query: {
            rotina: 'Rotina',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 1
		})
      
      expect(pageViews).toHaveLength(1)
		expect(pageViews).toEqual([
         expect.objectContaining({rotina: 'Rotina'})
      ])
	})

	it('should be able to find page views per pages', async () => {
		for (let i = 0; i<21; i++) {
			await pageViewRepository.create({
				rotina: 'Rotina',
				modulo: 'Modulo',
			})
		}

		const { pageViews } = await sut.execute({
			query: {
            rotina: 'Rotina',
            dataInicio: new Date('01-01-2000').toString()
         },
         page: 2
		})
      
      expect(pageViews).toHaveLength(1)
		expect(pageViews).toEqual([
         expect.objectContaining({rotina: 'Rotina'})
      ])
	})

	it('should be able to find page views between dates', async () => {
		await pageViewRepository.create({
			rotina: 'Rotina',
			modulo: 'Modulo',
			createdAt: '01-01-2020'
		})

		await pageViewRepository.create({
			rotina: 'Rotina',
			modulo: 'Modulo',
			createdAt: '01-01-2022'
		})

		const { pageViews } = await sut.execute({
			query: {
            rotina: 'Rotina',
            dataInicio: new Date('01-01-2019').toString(),
				dataFim: new Date('01-02-2020').toString()
         },
         page: 1
		})
      
      expect(pageViews).toHaveLength(1)
		expect(pageViews).toEqual([
         expect.objectContaining({
				rotina: 'Rotina',
				createdAt: new Date('01-01-2020')
			})
      ])
	})
})