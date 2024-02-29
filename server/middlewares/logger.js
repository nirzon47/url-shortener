import { Router } from 'express'
import morgan from 'morgan'
import fs from 'fs'

const accessLogStream = fs.createWriteStream('server.log', {
	flags: 'a',
})

const logger = Router()

logger.use(morgan('combined', { stream: accessLogStream }))
logger.use(morgan(':method | Endpoint - :url | :date[web] | :response-time ms'))

export default logger
