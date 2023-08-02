import * as fs from 'node:fs/promises'
import { test, expect, vi } from 'vitest'
import request from 'supertest'

import server from './server.js'
import { render } from '../test-utils.js'

// THIS IS ALL COPY AND PASTED FROM GERARDS IN CLASS CODE NOT MY OWN WORK //

vi.mock('node:fs/promises')

test('GET / shows a list of puppies', async () => {
  vi.mocked(fs.readFile).mockResolvedValue(
    JSON.stringify({
      puppies: [
        {
          id: 3,
          name: 'Magnum',
          owner: 'Michael',
          image: '/images/puppy3.jpg',
          breed: 'Rottweiler',
        },
      ],
    })
  )

  const res = await request(server).get('/') // requesting that the server sends us the / page (or home page)
  const screen = render(res) // creating variable called screen which is just the res variable rendered 

  const fidoImage = screen.getByAltText('Magnum')
  expect(fidoImage).toMatchInlineSnapshot(`
    <img
      alt="Magnum"
      class="img-circle"
      src="/images/puppy3.jpg"
    />
  `)
})

// test("GET / fails if the file won't load", async () => {
//   vi.mocked(fs.readFile).mockRejectedValue(
//     new Error('Sorry this module is fake')
//   )
//   const res = await request(server).get('/')
//   expect(res.statusCode).toBe(500)
// })
