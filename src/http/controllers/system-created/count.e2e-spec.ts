import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Get System Started Count', () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()
   })

   it('should be able to get system started count by query', async () => {
      await prisma.systemStarted.create({
         data: {
            estado: 'MG',
            modulo: 'Modulo',
            filial: 'Filial',
            createdAt: new Date('01-01-2022')
         }
      })

      const response = await request(app.server)
         .post('/system-started/query/count')
         .send({
            dataInicio: '01-01-2020'
         })

      expect(response.statusCode).toEqual(200)
   })
})