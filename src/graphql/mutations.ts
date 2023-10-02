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
