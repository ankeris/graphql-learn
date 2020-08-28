const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require('graphql');
const { books, authors } = require('./data');
const { ListBookType } = require('./types/book.type');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: () => ({
        books: {
            type: ListBookType,
            resolve: () => books,
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
});

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
    })
);

app.listen(5000, () => console.log('server running'));
