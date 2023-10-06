import {
  UserProfile,
  CreateUserInput,
  ProjectInterface,
  ProjectFormInput,
} from "@/common/types";
import {
  getProjectByIdQuery,
  getProjectsQuery,
  getUserQuery,
  getProjectsOfUserQuery,
} from "./queries";
import {
  createProjectMutation,
  createUserMutation,
  deleteProjectMutation,
  updateProjectMutation,
} from "./mutations";

import { GraphQLClient } from "graphql-request";
import { isBase64DataURL, uploadImage } from "@/lib/actions";

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
  form: ProjectFormInput;
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
export const deleteUserProject = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  client.setHeader("Authorization", `Bearer ${token}`);
  return await makeGraphQLRequest(deleteProjectMutation, { id });
};
export const editUserProject = async ({
  id,
  token,
  form,
}: {
  id: string;
  token: string;
  form: ProjectFormInput;
}) => {
  let updatedForm = { ...form };

  const isUploadingNewImage = isBase64DataURL(form.image);
  if (isUploadingNewImage) {
    const imageObj = await uploadImage(form.image);
    if (imageObj) {
      updatedForm.image = imageObj.url;
    }
  }

  const variables = {
    id,
    input: updatedForm,
  };
  client.setHeader("Authorization", `Bearer ${token}`);
  return await makeGraphQLRequest(updateProjectMutation, variables);
};
