import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'

describe('Get Page View', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()
	})

	it('should be able to get a page view by id', async () => {
		const pageView = await prisma.pageView.create({
			data: {
				id: randomUUID(),
				rotina: 'Teste',
				modulo: 'Teste',
				codCliente: '1'
			}
		})

		const response = await request(app.server)
			.get(`/page-view/${pageView.id}`)
			.send()

		expect(response.statusCode).toEqual(200)
	})
})