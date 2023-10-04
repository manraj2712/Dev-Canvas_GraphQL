export const createUserMutation = `
    mutation CreateUser($input: UserCreateInput!){
        userCreate(input: $input) {
            user {
              name
              email
              avatarUrl
              githubUrl
              description
              linkedinUrl
              id
            }
        }
    }
`;


export const createProjectMutation = `
    mutation CreateProject($input: ProjectCreateInput!){
        projectCreate(input: $input) {
            project {
              title
              description
              createdBy {
                email
                name
              }
              id
            }
        }
    }
`;