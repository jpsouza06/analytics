import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { prisma } from '@/lib/prisma'

describe('Find System Started', () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()
   })

   it('should be able to find a system started by query', async () => {
      await prisma.systemStarted.create({
         data: {
            estado: 'MG',
            modulo: 'Modulo1',
            filial: 'Filial',
            createdAt: new Date('01-01-2022')
         }
      })

      const response = await request(app.server)
         .post('/system-started/query/1')
         .send({
            rotina: 'Rotina',
            dataInicio: '2020-01-01'
         })

      expect(response.statusCode).toEqual(200)
   })
})