import { PrismaErrorsRepository } from '@/repositories/prisma/prisma-errors-repository'
import { CreateErrorUseCase } from '../../create-error'

export function makeCreateErrorUseCase() {
	const errorsRepository = new PrismaErrorsRepository()
	const createErrorUseCase = new CreateErrorUseCase(errorsRepository)

	return createErrorUseCase
}