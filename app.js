const express = require("express");
const expressHttp = require('express-graphql')
const schema = require("./schema/schema");
const mongoose = require('mongoose');

const app = express();

mongoose.connect("mongodb://localhost:27017/testt");
mongoose.connection.once('opne', () =>{
    console.log(`data base connected`)
})

app.use('/graphql', expressHttp({
    schema,
    graphiql:true
}))

app.listen(4000, () =>{
    console.log(`Server running 4000 \n http://localhost:4000/graphql`)
})