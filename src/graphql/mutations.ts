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

export const deleteProjectMutation = `
  mutation DeleteProject($id: ID!) {
    projectDelete(by: { id: $id }) {
      deletedId
    }
  }
`;

export const updateProjectMutation = `
	mutation UpdateProject($id: ID!, $input: ProjectUpdateInput!) {
		projectUpdate(by: { id: $id }, input: $input) {
			project {
				id
				title
				description
        category
        image
        liveSiteUrl
        githubUrl
				createdBy {
					email
					name
				}
			}
		}
	}
`;
