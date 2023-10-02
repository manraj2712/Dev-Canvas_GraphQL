import { GraphQLClient } from "graphql-request";


const isProduction = process.env.NODE_ENV === 'production';
const endPoint = isProduction ? process.env.GRAFBASE_API_URL! : 'http://127.0.0.1:4000/graphql';
const key = isProduction ? process.env.GRAFBASE_API_KEY! : 'anykey';
const serverUrl = isProduction ? process.env.SERVER_URL! : 'http://localhost:3000';
const client = new GraphQLClient(endPoint);

client.setHeader('x-api-key', key);


export const makeGraphQLRequest = async (query: string, variables: {}) => {
    try{
        return await client.request(query, variables);
    }catch(e: any){
        throw e;
    }
};