import http from 'k6/http'
import { describe, expect } from 'https://jslib.k6.io/k6chaijs/4.3.4.3/index.js';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js"
import { textSummary } from "https://jslib.k6.io/k6-summary/0.0.1/index.js"

export const options = {
   stages: [
      { duration: '2m', target:    1 }, // below normal load
      { duration: '5m', target:    1 },
      { duration: '2m', target:   40 }, // normal load
      { duration: '5m', target:   40 },
      { duration: '2m', target:   80 }, // around the breaking point
      { duration: '5m', target:   80 },
      { duration: '2m', target:  100 }, // beyond the breaking point
      { duration: '5m', target:  100 },
      { duration: '10m', target:   0 }, // scale down. Recovery stage.
  ],
}
const url = 'http://192.168.3.242:30002'
export default function () {
   describe('Error', () => {
      const data = JSON.stringify({
         unit: "Unit",
         rotina: "Rotina",
         modulo: "Modulo",
         conteudo: "Conteudo"
      });

      let response = http.post(`${url}/error`, data, {
         headers: { 'Content-Type': 'application/json' }
      })

      expect(response.status, 'response status').to.equal(201)
      expect(response).to.have.validJsonBody()
   })

   describe('System-Started', () => {
      const data = JSON.stringify({
         filial: "filial",
         modulo: "Modulo",
         estado: "MG",
      })

      let response = http.post(`${url}/system-started`, data, {
         headers: { 'Content-Type': 'application/json' }
      })

      expect(response.status, 'response status').to.equal(201)
      expect(response).to.have.validJsonBody()
   })

   describe('Page-view', () => {
      const data = JSON.stringify({
         rotina: "Rotina",
         modulo: "Modulo",
      })

      let response = http.post(`${url}/page-view`, data, {
         headers: { 'Content-Type': 'application/json' }
      })

      expect(response.status, 'response status').to.equal(201)
      expect(response).to.have.validJsonBody()
   })

}

export const handleSummary = (data) => {
   return {
      "stress_test.html": htmlReport(data),
      stdout: textSummary(data, { indent: " ", enableColors: true }),
   }
}