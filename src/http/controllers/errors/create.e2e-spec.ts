import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Error', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to create a error', async () => {
		const response = await request(app.server)
			.post('/error')
			.send({
				unit: 'Unit',
				rotina: 'Teste',
				modulo: 'Teste', 
				filial: 'Teste',
				conteudo: 'Conteudo' 
			})

		expect(response.statusCode).toEqual(201)
	})
})