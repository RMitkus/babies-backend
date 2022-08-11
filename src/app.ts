import { ApolloServer } from 'apollo-server-express'
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
	res.json({
		hello: 'Babies backend server, hello stranger!'
	})
})
// graphql server

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

async function startServer () {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers
	})

	await apolloServer.start()
	apolloServer.applyMiddleware({
		app
	})
}

startServer()

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
	console.log(`Server is listening on port http://localhost:${PORT}`)
})
