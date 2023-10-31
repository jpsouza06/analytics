import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { randomUUID } from 'crypto'
import { prisma } from '@/lib/prisma'

describe('Get System Started', () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()
   })

   it('should be able to get a system started by id', async () => {
      const systemStarted = await prisma.systemStarted.create({
         data: {
            id: randomUUID(),
            estado: 'MG',
            cidade: 'cidade',
            modulo: 'Modulo',
            codCliente: '1',
            versao: '1',
         }
      })

      const response = await request(app.server)
         .get(`/system-started/${systemStarted.id}`)
         .send()

      expect(response.statusCode).toEqual(200)
   })
})