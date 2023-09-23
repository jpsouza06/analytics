import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'

describe('Find Pages View', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to get a page view by query', async () => {
      const id = randomUUID()
      await prisma.pageView.createMany({
         data: [
            {
               id: randomUUID(),
               rotina: 'Rotina 1',
               modulo: 'Modulo 1',
               filial: 'Filial'
            },
            {
               id: randomUUID(),
               rotina: 'Rotina 1',
               modulo: 'Modulo 1',
               filial: 'Filial'
            },
            {
               id: id,
               rotina: 'Rotina 2',
               modulo: 'Modulo 2',
               filial: 'Filial'
            },
         ]     
      }) 

		const response = await request(app.server)
			.post('/page-view/query')
			.send({
            rotina: 'Rotina 2',
            modulo: 'Modulo 2'
         })
      console.log(response.body.pagesView)
		expect(response.statusCode).toEqual(200)
      expect(response.body.pagesView).toHaveLength(1)
      expect(response.body.pagesView).toEqual([
         expect.objectContaining({
            id: id,
            rotina: 'Rotina 2',
            modulo: 'Modulo',
            filial: 'Filial'
         })
      ])
	})
})