import { PrismaPageViewsRepository } from '@/repositories/prisma/prisma-page-views-repository'
import { FindPageViewByQueryUseCase } from '../../find-page-view-by-query'

export function makeFindPageViewByQueryUseCase() {
	const pageViewRepository = new PrismaPageViewsRepository()
	const pageViewByQueryUseCase = new FindPageViewByQueryUseCase(pageViewRepository)

	return pageViewByQueryUseCase
}