const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLInt, GraphQLNonNull,
     GraphQLSchema, GraphQLList, GraphQLString } = graphql


const type = require("../type/type");
const Author = require('../model/author')
const Book = require('../model/book')

module.exports = new GraphQLObjectType({
    name:"Mutation",
    fields: {
        addAuhtor:{
            type: type.AuthorType,
            args:{
                name: { type: new GraphQLNonNull(GraphQLString) },
                age:{ type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args){
                let author = new Author({
                    name: args.name,
                    age: args.age
                });
                return author.save()
            }
        },
        addBook:{
            type:type.BookType,
            args:{
                name:{ type: new GraphQLNonNull(GraphQLString)},
                genre:{ type: new GraphQLNonNull(GraphQLString)},
                authorid:{type: new GraphQLNonNull(GraphQLID)}
            },
            resolve(parent, args){
                let book = new Book(args);
                return book.save()
            }
        }
    }
});

