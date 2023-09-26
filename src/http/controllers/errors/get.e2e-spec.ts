import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Get Error', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to get a errror by id', async () => {
      const error = await prisma.error.create({
         data: {
            unit: 'Unit',
            rotina: 'Rotina',
            modulo: 'Modulo',
            conteudo: 'Conteudo'
         }
      }) 

		const response = await request(app.server)
			.get(`/error/${error.id}`)
			.send()
      
		expect(response.statusCode).toEqual(200)
	})
})