import { g, auth, config } from '@grafbase/sdk'

// @ts-ignore
const User = g.model('User', {
  name: g.string().length({min: 3, max: 20}),
  email: g.string().unique(),
  avatarUrl: g.url(),
  description: g.string().length({min: 10, max: 1000}).optional(),
  githubUrl: g.url().optional(),
  linkedinUrl: g.url().optional(),
  projects: g.relation(()=>Project).list().optional(),
}).auth((rules)=>{
  rules.public().read(),
  rules.private().update().delete()
});

// @ts-ignore
const Project = g.model('Project', {
  name: g.string().length({min: 3, max: 20}),
  description: g.string().length({min: 10, max: 1000}),
  image: g.url(),
  category: g.string().default('other'),
  createdBy: g.relation(()=>User),
}).auth((rules)=>{
  rules.public().read()
});

const jwt = auth.JWT({
  issuer: "grafbase",
  secret: g.env("NEXTAUTH_SECRET")
})

export default config({
  schema: g,
  auth: {
    providers: [jwt],
    rules: (rules) => rules.private()
  }
})
