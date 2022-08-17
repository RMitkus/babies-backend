import {
	ApolloServer, Config, ExpressContext
} from 'apollo-server-express'
import { Application } from 'express'

export default async (app: Application, {
	typeDefs,
	resolvers
}: {
    typeDefs: string,
    resolvers: object
}) => {
	const apolloServer = new ApolloServer({
		typeDefs,
		resolvers
	} as Config<ExpressContext>)

	await apolloServer.start()
	apolloServer.applyMiddleware({
		app
	})
}
