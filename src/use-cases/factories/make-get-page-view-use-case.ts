import { PrismaErrorsRepository } from '@/repositories/prisma/prisma-errors-repository'
import { PrismaPageViewsRepository } from '@/repositories/prisma/prisma-page-views-repository'
import { GetPageViewUseCase } from '../get-page-view'

export function makeGetPageViewUseCase() {
	const pageViewRepository = new PrismaPageViewsRepository()
	const pageViewUseCase = new GetPageViewUseCase(pageViewRepository)

	return pageViewUseCase
}