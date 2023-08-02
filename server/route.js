import * as Path from 'node:path'
import express from 'express'
import fs from 'node:fs/promises'

const router = express.Router()

router.get('/:id', async (req, res) => {
  try {
    let id = req.params.id
    const puppies = await fs // not sure how to get only id puppy out of using readFile?
      // puppies variable is array
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))
    // so have my puppy array that is all readable from parse
    console.log(puppies)
    let puppy = puppies.puppies.find((element) => element.id == id) // best guess I have at getting chosen puppy from puppies array
    console.log(puppy)
    res.render('details', puppy) // not sure how to do this/how to incorperate the details hbs into what I'm rendering?
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
    // const updatedPuppy = {
    //   id: req.params.id,
    //   name: req.body.name,
    //   breed: req.body.breed,
    //   owner: req.body.owner,
    // }

    const puppies = await fs
      .readFile(Path.resolve('server/data/data.json'), 'utf-8')
      .then((data) => JSON.parse(data))

     puppies.puppies.map((puppy) => {
      if (puppy.id === Number (id)) {
        puppy.name = req.body.name, 
        puppy.breed = req.body.breed
        puppy.owner = req.body.owner
      }
    })
    // so for every puppy want to check if puppy.id === id
    // map over puppies
    // in that check if the puppies.id is the same as above let id
    // so if ids match then have name = req.body.name

    console.log(puppies)

    const newFileContents = JSON.stringify(puppies, null, 2)
    fs.writeFile(Path.resolve('server/data/data.json'), newFileContents)

    res.redirect(`/puppies/${id}`) // yikes help
  } catch (err) {
    console.error(err.message)
  }
})

export default router
