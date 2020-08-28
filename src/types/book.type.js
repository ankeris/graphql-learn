const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'a book type',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
        authorId: { type: GraphQLString },
    }),
});

const ListBookType = new GraphQLList(BookType);
module.exports = {
    BookType,
    ListBookType,
};
