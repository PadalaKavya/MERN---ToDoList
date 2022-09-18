import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const todoSchema = new Schema({
    //pass object to describe datatypes 
    title:{
        type:String,
        required:true
    },
    detail:String,
    date:Date
    
},{timestamps:true})

const Todo = mongoose.model('todo',todoSchema)
export default Todo;