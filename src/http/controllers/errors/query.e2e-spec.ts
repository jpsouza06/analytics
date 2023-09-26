import request from 'supertest'
import {app} from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Find Errors', () => {
	beforeAll(async () => {
		await app.ready()
	})

	afterAll(async () => {
		await app.close()   
	})
   
	it('should be able to find a error by query', async () => {
		const error = await prisma.error.create({
         data: {
            unit: 'Unit',
            rotina: 'Rotina',
            modulo: 'Modulo',
            conteudo: 'Conteudo',
				createdAt: new Date('01-01-2022')
         }
      }) 

		const response = await request(app.server)
			.post('/error/query/1')
			.send({
				unit: 'Unit',
				dataInicio: '01-01-2020'
         })

		expect(response.statusCode).toEqual(200)
	})
})