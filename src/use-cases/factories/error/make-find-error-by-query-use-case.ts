import { PrismaErrorsRepository } from '@/repositories/prisma/prisma-errors-repository'
import { FindErrorByQueryUseCase } from '../../find-error-by-query'

export function makeFindErrorByQueryUseCase() {
	const errorsRepository = new PrismaErrorsRepository()
	const findErrorByQueryUseCase = new FindErrorByQueryUseCase(errorsRepository)

	return findErrorByQueryUseCase
}