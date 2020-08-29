const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const { books } = require('../data');
const { delay } = require('../utils');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'an Author type',
    fields: () => {
        const { BookType } = require('./index');
        return {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            books: {
                type: new GraphQLList(BookType),
                resolve: async (root) =>
                    await delay(
                        500,
                        books.filter((x) => x.authorId === root.id)
                    ),
            },
        };
    },
});

const ListAuthorType = new GraphQLList(AuthorType);

module.exports.AuthorType = AuthorType;
module.exports.ListAuthorType = ListAuthorType;
