const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const app = express();
const { GraphQLSchema, GraphQLObjectType, GraphQLString } = require("graphql");

const schema = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "HelloWorld",
        fields: () => ({
            message: { type: GraphQLString, resolve: () => "Hello world" },
        }),
    }),
});
app.use(
    "/graphql",
    graphqlHTTP({
        graphiql: true,
        schema,
    })
);

app.listen(5000, () => console.log("server running"));
