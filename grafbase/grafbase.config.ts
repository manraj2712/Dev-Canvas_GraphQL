import { g, auth, config } from '@grafbase/sdk'

const User = g.model('User', {
  name: g.string().length({min: 3, max: 20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({min: 10, max: 1000}).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional(),
});

const Project = g.model('Project', {
  name: g.string().length({min: 3, max: 20}),
  description: g.string().length({min: 10, max: 1000}),
  image: g.url(),
  category: g.string().search(),
  createdBy: g.relation(()=>User),
});


export default config({
  schema: g
  // Integrate Auth
  // https://grafbase.com/docs/auth
  // auth: {
  //   providers: [authProvider],
  //   rules: (rules) => {
  //     rules.private()
  //   }
  // }
})
