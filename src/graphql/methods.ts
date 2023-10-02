import { UserProfile,CreateUserInput } from "@/common/types";
import { getUserQuery } from "./queries"
import { createUserMutation } from "./mutations";

import { GraphQLClient } from "graphql-request";


const isProduction = process.env.NODE_ENV === 'production';
const endPoint = isProduction ? process.env.GRAFBASE_API_URL! : 'http://127.0.0.1:4000/graphql';
const serverUrl = isProduction ? process.env.SERVER_URL! : 'http://localhost:3000';
const client = new GraphQLClient(endPoint);
const key = isProduction ? process.env.GRAFBASE_API_KEY! : 'anykey';


export const makeGraphQLRequest = async (query: string, variables: {}) => {
    try{
        return await client.request(query, variables);
    }catch(e: any){
        throw e;
    }
};


export const getUser = async (email : String)=>{
    client.setHeader('x-api-key', key);
    return await makeGraphQLRequest(getUserQuery, {email});
}

export const createUser = async (newUser : CreateUserInput)=>{
    client.setHeader('x-api-key', key);
    return await makeGraphQLRequest(createUserMutation,{input: newUser});
}