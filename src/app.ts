import { config } from 'dotenv'
import express, {
	Application, Request, Response
} from 'express'
import morgan from 'morgan'

import graphqlServer from './server/graphql/graphql'

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
	res.json({
		hello: 'Babies backend server, hello stranger!'
	})
})
// types query/mutation/subscription
const typeDefs = `
    type Query {
        totalPosts: Int!
    }
`

// resolvers
const resolvers = {
	Query: {
		totalPosts: () => 42
	}
}

graphqlServer(app, {
	typeDefs,
	resolvers
})
const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
	console.log(`Server is listening on port http://localhost:${PORT}`)
})
