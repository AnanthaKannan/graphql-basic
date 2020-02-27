const graphql = require('graphql');
const { GraphQLObjectType, GraphQLID, GraphQLList,
    GraphQLString, GraphQLInt } = graphql
const authors = require('../data/authers');
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
                const result = books.filter(obj => obj.authorid == parent.id);
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
        auther:{
            type:AuthorType,
            resolve(parent, args){
                const result = authors.find((obj) => obj.id == parent.id);
                return result;
            }
        }
    })
});


module.exports = {
    BookType,
    AuthorType
}