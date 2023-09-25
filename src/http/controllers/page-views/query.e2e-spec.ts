import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Find Pages View', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to find a page view by query', async () => {
      const pageView = await request(app.server)
			.post('/page-view')
			.send({
				rotina: 'Rotina 2',
				modulo: 'Modulo 2', 
				filial: 'Filial', 
			})

		const response = await request(app.server)
			.post('/page-view/query')
			.send({
            filial: 'Filial',
         })
      console.log(response.body.pagesView)
		expect(response.statusCode).toEqual(200)
	})
})