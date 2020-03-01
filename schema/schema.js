const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLSchema, GraphQLList } = graphql

const type = require("../type/type");

const Author = require('../model/author')
const Book = require('../model/book')
const Mutation = require('../mutation/mutation')



const RootQuary = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        book:{
            type: type.BookType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                console.log(args.id)
                const result = Book.findOne({_id:args.id})
                return result;
                // code to get data from databasee
            }
        },
        author:{
            type:type.AuthorType,
            args: { id: { type: GraphQLID}},
            resolve(parent, args){
                const result = Author.find({_id:args.id})
                return result;
                // code to get data from databasee
            }
        },
        books:{
            type: new GraphQLList(type.BookType),
            resolve(parent, args){
                const result = Book.find();
                return result
            }
        },
        authors:{
            type: new GraphQLList(type.AuthorType),
            resolve(parent, args){
                const result = Author.find();
                return result
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query:RootQuary,
    mutation:Mutation
})


