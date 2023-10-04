import {
  UserProfile,
  CreateUserInput,
  ProjectForm,
  ProjectInterface,
} from "@/common/types";
import {
  getProjectByIdQuery,
  getProjectsQuery,
  getUserQuery,
  getProjectsOfUserQuery,
} from "./queries";
import { createProjectMutation, createUserMutation } from "./mutations";

import { GraphQLClient } from "graphql-request";
import { uploadImage } from "@/lib/actions";

const isProduction = process.env.NODE_ENV === "production";
const apiUrl = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_URL || ""
  : "http://127.0.0.1:4000/graphql";
const apiKey = isProduction
  ? process.env.NEXT_PUBLIC_GRAFBASE_API_KEY || ""
  : "letmein";
const serverUrl = isProduction
  ? process.env.NEXT_PUBLIC_SERVER_URL
  : "http://localhost:3000";

const client = new GraphQLClient(apiUrl);

export const makeGraphQLRequest = async (query: string, variables: {}) => {
  try {
    return await client.request(query, variables);
  } catch (e: any) {
    throw e;
  }
};

export const getUser = async (email: String) => {
  client.setHeader("x-api-key", apiKey);
  return await makeGraphQLRequest(getUserQuery, { email });
};

export const createUser = async (newUser: CreateUserInput) => {
  client.setHeader("x-api-key", apiKey);
  return await makeGraphQLRequest(createUserMutation, { input: newUser });
};

export const createNewProject = async ({
  form,
  creatorId,
  token,
}: {
  form: ProjectForm;
  creatorId: string;
  token: string;
}) => {
  const imageObj = await uploadImage(form.image);

  if (imageObj) {
    client.setHeader("Authorization", `Bearer ${token}`);
    const variables = {
      input: {
        ...form,
        image: imageObj.url,
        createdBy: {
          link: creatorId,
        },
      },
    };
    return await makeGraphQLRequest(createProjectMutation, variables);
  }
};

export const fetchAllProjects = async ({
  category,
  endCursor,
}: {
  category?: string;
  endCursor?: string;
}) => {
  client.setHeader("x-api-key", apiKey);
  const variables = {
    category,
    endCursor,
  };
  return await makeGraphQLRequest(getProjectsQuery, variables);
};

export const getProjectDetails = async (id: string) => {
  client.setHeader("x-api-key", apiKey);
  return await makeGraphQLRequest(getProjectByIdQuery, { id });
};
export const getUserProjects = async (id: string, last?: number) => {
  client.setHeader("x-api-key", apiKey);
  return await makeGraphQLRequest(getProjectsOfUserQuery, { id, last });
};
