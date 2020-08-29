const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt } = require('graphql');
const { books, authors } = require('./data');
const { ListBookType, ListAuthorType, BookType, AuthorType } = require('./types');
const { delay } = require('./utils');

const RootQueryType = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'Root Query',
    fields: () => ({
        book: {
            type: BookType,
            args: {
                id: {
                    type: GraphQLInt,
                },
            },
            resolve: async (_, args) =>
                await delay(
                    500,
                    books.find((x) => x.id === args.id)
                ),
        },
        books: {
            type: ListBookType,
            resolve: async () => await delay(500, books),
        },
        author: {
            type: AuthorType,
            args: {
                id: {
                    type: GraphQLInt,
                },
            },
            resolve: async (_, { id }) =>
                await delay(
                    500,
                    authors.find((x) => x.id === id)
                ),
        },
        authors: {
            type: ListAuthorType,
            resolve: async () => await delay(500, authors),
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
