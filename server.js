import express from 'express';
import {ApolloServer,gql} from 'apollo-server-express';
import typeDefs from './typedef.js';
import resolvers from './resolvers.js'
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

async function initServer(){
  const app = express()
  app.use(cors());
  dotenv.config();
  const apolloServer = new ApolloServer({
    typeDefs,resolvers
  })
  await apolloServer.start();
  apolloServer.applyMiddleware({ app })
  app.use((req,res)=>{
    res.send("Server started successfully")
  })
  const PORT = process.env.PORT || 5000;
  try{
    await mongoose.connect(process.env.mongodb);
    console.log('connected to the mongodb at port {$PORT}')

  }catch(error){
    console.log(error);
  }
  app.listen(PORT,()=>
  console.log('express server is running on the  port {$PORT}'))
}

initServer()