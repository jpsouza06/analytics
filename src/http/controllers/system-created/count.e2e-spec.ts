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
            cidade: 'cidade',
            modulo: 'Modulo',
            codCliente: '1',
            versao: '1',
            createdAt: new Date('01-01-2022')
         }
      })

      const response = await request(app.server)
         .post('/system-started/query/count')
         .send({
            dataInicio: '2020-01-01T00:00:00'
         })

      expect(response.statusCode).toEqual(200)
   })
})