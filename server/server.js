import * as Path from 'node:path'
// import * as URL from 'node:url'

import express from 'express'
import hbs from 'express-handlebars'
import fs from 'node:fs/promises'

const server = express()

// Server configuration
const publicFolder = Path.resolve('public')
server.use(express.static(publicFolder))
server.use(express.urlencoded({ extended: false }))

// Handlebars configuration
server.engine('hbs', hbs.engine({ extname: 'hbs' }))
server.set('view engine', 'hbs')
server.set('views', Path.resolve('server/views'))

// Your routes/router(s) should go here

// server.get('/', (req, res) => {
//   res.send('Pupparazzi')
// })

server.get('/', async (req, res) => {
  try {
    const puppies = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))
    console.log(puppies)
    res.render('home', puppies)
  } catch (err) {
    console.error(err.message)
  }
})

export default server
