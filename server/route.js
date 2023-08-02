import * as Path from 'node:path'
import express from 'express'
import fs from 'node:fs/promises'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id
    const puppies = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))
    console.log(puppies)
    let puppy = puppies.puppies.find((element) => element.id == id) 
    console.log(puppy)
    res.render('details', puppy) 
  } catch (err) {
    console.error(err.message)
  }
})

router.get('/:id/edit', async (req, res) => {
  try {
    const puppies = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))
    let id = req.params.id
    let puppy = puppies.puppies.find((element) => element.id == id)
    res.render('edit', puppy)
  } catch (err) {
    console.error(err.message)
  }
})

router.post('/:id/edit', async (req, res) => {
  try {
    let id = req.params.id
    const puppies = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))

    puppies.puppies.map((puppy) => {
      if (puppy.id === Number(id)) {
        (puppy.name = req.body.name)
        (puppy.breed = req.body.breed)
        puppy.owner = req.body.owner
      }
    })

    console.log(puppies)

    const newFileContents = JSON.stringify(puppies, null, 2)
    fs.writeFile(Path.resolve('server/data/data.json'), newFileContents)

    res.redirect(`/puppies/${id}`)
  } catch (err) {
    console.error(err.message)
  }
})

export default router
