const graphql = require('graphql');

const { GraphQLObjectType, GraphQLID, GraphQLInt,
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
                name: { type:GraphQLString },
                age:{ type:GraphQLInt }
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
                name:{ type: GraphQLString},
                genre:{ type: GraphQLString},
                authorid:{type: GraphQLID}
            },
            resolve(parent, args){
                let book = new Book(args);
                return book.save()
            }
        }
    }
});

