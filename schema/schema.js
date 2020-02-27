const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLList } = graphql

const type = require("../type/type");

const  books  = require('../data/books')
const authors = require('../data/authers')
const Mutation = require('../mutation/mutation')



const RootQuary = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type: type.BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                const result = books.find((obj) => obj.id == args.id);
                return result;
                // code to get data from databasee
            }
        },
        author:{
            type:type.AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                const result = authors.find((obj) => obj.id == args.id);
                return result;
                // code to get data from databasee
            }
        },
        books:{
            type: new GraphQLList(type.BookType),
            resolve(parent, args){
                return books
            }
        },
        authors:{
            type: new GraphQLList(type.AuthorType),
            resolve(parent, args){
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuary,
    mutation:Mutation
})


// book(id:"2"){
//     name
//     genre
// }