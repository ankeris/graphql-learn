const express = require('express');
const app = express();
const { graphqlHTTP } = require('express-graphql');
const { GraphQLSchema, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLNonNull } = require('graphql');
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

const RootMutationType = new GraphQLObjectType({
    name: 'mutation',
    description: 'make mutations here',
    fields: () => ({
        addBook: {
            type: BookType,
            args: {
                name: {
                    type: GraphQLNonNull(GraphQLString),
                },
                authorId: {
                    type: GraphQLNonNull(GraphQLInt),
                },
            },
            resolve: async (_, { name, authorId }) => {
                const book = { id: books.length + 1, name, authorId };
                books.push(book);
                return await delay(500, book);
            },
        },
    }),
});

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
});

app.use(
    '/graphql',
    graphqlHTTP({
        graphiql: true,
        schema,
    })
);

app.listen(5000, () => console.log('server running'));
