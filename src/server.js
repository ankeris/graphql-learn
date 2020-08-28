const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { books, authors } = require('./data');

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: 'HelloWorld',
        fields: () => ({
            message: { type: GraphQLString, resolve: () => 'Hello world' },
        }),
    }),
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
});
app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
    })
);

app.listen(5000, () => console.log('server running'));
