const { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'an Author type',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLString },
    }),
});

const ListAuthorType = new GraphQLList(AuthorType);
module.exports = {
    AuthorType,
    ListAuthorType,
};
