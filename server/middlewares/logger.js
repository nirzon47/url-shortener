import { Router } from 'express'
import morgan from 'morgan'
import fs from 'fs'

const accessLogStream = fs.createWriteStream('server.log', {
	flags: 'a',
})

const logger = Router()

logger.use(morgan('combined', { stream: accessLogStream }))

export default logger
