const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { authors } = require('../data');
const { delay } = require('../utils');

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'a book type',
    fields: () => {
        const { AuthorType } = require('./index');
        return {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            authorId: { type: GraphQLNonNull(GraphQLString) },
            metaDescription: { type: GraphQLNonNull(GraphQLString), resolve: () => 'This is always a book' },
            author: {
                type: AuthorType,
                resolve: async (book) =>
                    await delay(
                        500,
                        authors.find((x) => x.id === book.authorId)
                    ),
            },
        };
    },
});

const ListBookType = new GraphQLList(BookType);

module.exports.BookType = BookType;
module.exports.ListBookType = ListBookType;
