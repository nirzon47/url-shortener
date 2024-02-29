import express from 'express'
import logger from './middlewares/logger.js'
import { nanoid } from 'nanoid'
import fs from 'fs'
import cors from 'cors'
import isURL from 'validator/lib/isURL.js'

const PORT = process.env.PORT || 6969

const app = express()

// Middleware for logging
app.use(logger)
// Middleware for reading json from req body
app.use(express.json())
app.use(cors())

app.get('/:ID', (req, res) => {
	// Gets the dynamic ID
	const ID = req.params.ID

	// Reads links.json and stores it as an object
	const links = JSON.parse(fs.readFileSync('links.json').toString())

	// Finds the ID in the object
	const link = links[ID]

	// Redirects to the URL if the ID is found
	if (link) {
		res.redirect(link)
	} else {
		res.status(404).send('Link not found')
	}
})

app.post('/shortenURL', (req, res) => {
	// Gets the URL from request body
	const URL = req.body[0].URL

	if (!isURL(URL)) {
		res.status(400).send('Invalid URL')
	}

	if (!isURL(URL)) {
		res.status(400).send('Invalid URL')
	}

	console.log(URL)
	// Generates an ID
	let id = nanoid(5)

	// Reads links.json and stores it as on object
	const links = JSON.parse(fs.readFileSync('links.json').toString())

	// Checks if the ID is already used or not
	while (links[id]) {
		id = nanoid(5)
	}

	// Adds a new ID and URL to the object
	links[id] = URL

	// Writes the object to links.json
	fs.writeFileSync('links.json', JSON.stringify(links))

	// Sends the ID
	res.send(id)
})

app.listen(PORT, () => {
	console.log(`Starting server on port ${PORT}`)
})
