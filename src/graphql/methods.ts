import { UserProfile,CreateUserInput } from "@/common/types";
import { makeGraphQLRequest } from "./init"
import { getUserQuery } from "./queries"
import { createUserMutation } from "./mutations";


export const getUser = async (email : String)=>{
    return await makeGraphQLRequest(getUserQuery, {email});
}

export const createUser = async (newUser : CreateUserInput)=>{
    return await makeGraphQLRequest(createUserMutation,{input: newUser});
}