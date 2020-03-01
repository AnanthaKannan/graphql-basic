const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList,
    GraphQLString, GraphQLInt } = graphql;
const Author = require('../model/author')
const Book = require('../model/book')
// const books = require('../data/books')


const AuthorType = new GraphQLObjectType({
    name:"Author",
    fields:() =>({
        id:{type: GraphQLID},
        name:{ type: GraphQLString },
        age:{ type: GraphQLInt},
        books:{
            type: new GraphQLList(BookType),
            resolve(parent, args){
                const result = Book.find({authorid:parent.id})
                return result;
            }
        }
    })
})

const BookType = new GraphQLObjectType({
    name:"Books",
    fields:() =>({
        id:{ type: GraphQLID },
        name:{ type: GraphQLString },
        genre:{ type: GraphQLString},
        authorid:{ type:GraphQLID },
        auther:{
            type:AuthorType,
            resolve(parent, args){
                console.log('parent_id', parent.authorid)
                const result = Author.findOne({_id:parent.authorid})
                return result;
            }
        }
    })
});


module.exports = {
    BookType,
    AuthorType
}