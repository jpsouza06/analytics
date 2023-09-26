import { PrismaPageViewsRepository } from '@/repositories/prisma/prisma-page-views-repository'
import { CreatePageViewUseCase } from '../create-page-view'

export function makeCreatePageViewUseCase() {
	const pageViewsRepository = new PrismaPageViewsRepository()
	const createPageViewUseCase = new CreatePageViewUseCase(pageViewsRepository)

	return createPageViewUseCase
}