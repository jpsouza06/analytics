import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Find Pages View', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to find a page view by query', async () => {
		const pageView = await prisma.pageView.create({
			data: {
				rotina: 'Teste',
				modulo: 'Teste',
				codCliente: '1',
				createdAt: new Date('01-01-2022')
			}
		})

		const response = await request(app.server)
			.post('/page-view/query/1')
			.send({
				rotina: 'Rotina',
				dataInicio: '2020-01-01'
			})

		expect(response.statusCode).toEqual(200)
	})
})