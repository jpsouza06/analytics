import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create Page View', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to create a page view', async () => {
		const response = await request(app.server)
			.post('/page-view')
			.send({
				rotina: 'Teste',
				modulo: 'Teste', 
			})
      
		expect(response.statusCode).toEqual(201)
	})
})