import { PrismaErrorsRepository } from '@/repositories/prisma/prisma-errors-repository'
import { GetErrorUseCase } from '../get-error'

export function makeGetErrorUseCase() {
	const errorsRepository = new PrismaErrorsRepository()
	const getErrorUseCase = new GetErrorUseCase(errorsRepository)

	return getErrorUseCase
}