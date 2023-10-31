import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Create System Started', () => {
   beforeAll(async () => {
      await app.ready()
   })

   afterAll(async () => {
      await app.close()
   })

   it('should be able to create a system started', async () => {
      const response = await request(app.server)
         .post('/system-started')
         .send({
            estado: 'MG',
            cidade: 'cidade',
            modulo: 'Teste',
            codCliente: '1',
            versao: '1'
         })

      expect(response.statusCode).toEqual(201)
   })
})