import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find Errors', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to find a error by query', async () => {
      await request(app.server)
			.post('/error')
			.send({
				unit: 'Unit 1',
				rotina: 'Rotina 2',
				modulo: 'Modulo 2', 
				filial: 'Filial',
				conteudo: 'Conteudo' 
			})

		const response = await request(app.server)
			.post('/error/query')
			.send({
				unit: 'Unit 1',
				rotina: 'Rotina 2',
				modulo: 'Modulo 2', 
         })

		expect(response.statusCode).toEqual(200)
	})
})