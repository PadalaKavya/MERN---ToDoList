const graphql = require('graphql');
const Todo  = require('../models/todo.js');

const {
   GraphQLObjectType, GraphQLString,
   GraphQLID, GraphQLInt,GraphQLSchema,
   GraphQLList,GraphQLNonNull,GraphQLBoolean
} = graphql;
//-----------------------------------------------------------------------------------------
const TodoType = new GraphQLObjectType({
   name: 'Todo',
   fields: () => ({
       id: { type: GraphQLID  },
       taskname: { type: GraphQLString },
   })
})
//-----------------------------------rootQuery-----------------------------------------------
const RootQuery = new GraphQLObjectType({
   name: 'RootQueryType',
   fields: {
       AllTodo: {
           type: TodoType,
           args: { id: { type: GraphQLID } },
           resolve(parent, args) {
               return Todo.findById(args.id);//is Task legit??
           }
       },
       AllTodos:{
           type: new GraphQLList(TodoType),
           resolve(parent, args) {
               return Todo.find({});
           }
       },
   }
});
//----------------------------------------------------------------------------------------
//-----------------------------------Mutation---------------------------------------------
//user to add and delete from database
const Mutation = new GraphQLObjectType({
   name: 'mutation',
   fields: {
       addTask: {
           type: TodoType,
           args: {
               taskname: { type: new GraphQLNonNull(GraphQLString) },
           },
           resolve(parent, args) {
               let tasktodo = new Todo({
                   taskname: args.taskname,
               });
               return tasktodo.save();
           }
       },
   }
});
module.exports = new GraphQLSchema({
   query: RootQuery,
   mutation: Mutation
});