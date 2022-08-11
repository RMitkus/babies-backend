import { config } from 'dotenv'
import express, {
	Application, Request, Response
} from 'express'
import morgan from 'morgan'

config()

const app: Application = express()

app.use(morgan('dev'))
app.use(express.json({
	limit: '50mb'
}))
app.use(express.urlencoded({
	limit: '50mb',
	extended: true
}))

app.get('/', (req: Request, res: Response) => {
	res.send('Babies backend server, hello stranger!')
})

app.get('/name', (req: Request, res: Response) => {
	res.json({
		myName: 'rytis'
	})
})

app.get('/names', (req: Request, res: Response) => {
	res.json({
		myName: 'rytis',
		minde: 'pinde'
	})
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is listening on port http://localhost:${PORT}`)
})
