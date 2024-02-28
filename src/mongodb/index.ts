// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     avatarUrl: { type: String },
//     description: { type: String },
//     githubUrl: { type: String },
//     linkedinUrl: { type: String },
//     projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }],
//   });

//   // create a project schema
//   const projectSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     description: { type: String, required: true },
//     image: { type: String, required: true },
//     liveSiteUrl: { type: String, required: true },
//     githubUrl: { type: String, required: true },
//     category: { type: String, required: true },
//     createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//   });

// router.post("/user", createUser);
// router.post("/project", createProject);
// router.get("/projects", fetchAllProjects);
// router.get("/project/:id", getProjectDetails);
// router.get("/user/:id/projects", getUserProjects);
// router.delete("/project/:id", deleteUserProject);
// router.put("/project/:id", editUserProject);

// create user function
// export const createUser = BigPromise(async (req, res, next) => {
//     const { name, email, avatarUrl, description, githubUrl, linkedinUrl } =
//       req.body;
//     const user = new User({
//       name,
//       email,
//       avatarUrl,
//       description,
//       githubUrl,
//       linkedinUrl,
//     });
//     await user.save();
//     res.status(201).json(user);
//   });

//   // create project function
//   export const createProject = BigPromise(async (req, res, next) => {
//     const {
//       title,
//       description,
//       image,
//       liveSiteUrl,
//       githubUrl,
//       category,
//       createdBy,
//     } = req.body;
//     const project = new Project({
//       title,
//       description,
//       image,
//       liveSiteUrl,
//       githubUrl,
//       category,
//       createdBy,
//     });
//     await project.save();
//     res.status(201).json(project);
//   });

//   // fetch all projects function
//   export const fetchAllProjects = BigPromise(async (req, res, next) => {
//     const projects = await Project.find();
//     res.status(200).json(projects);
//   });

//   // fetch project details function
//   export const getProjectDetails = BigPromise(async (req, res, next) => {
//     const { id } = req.params;
//     const project = await Project.findById(id);
//     res.status(200).json(project);
//   });

//   // fetch user projects function
//   export const getUserProjects = BigPromise(async (req, res, next) => {
//     const { id } = req.params;
//     const projects = await Project.find({ createdBy: id });
//     res.status(200).json(projects);
//   });

//   // delete user project function
//   export const deleteUserProject = BigPromise(async (req, res, next) => {
//     const { id } = req.params;
//     await Project.findByIdAndDelete(id);
//     res.status(204).json();
//   });

//   // edit user project function
//   export const editUserProject = BigPromise(async (req, res, next) => {
//     const { id } = req.params;
//     const updatedProject = await Project.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     res.status(200).json(updatedProject);
//   });

import { ProjectFormInput } from "@/common/types";
import { uploadImage } from "@/lib/actions";
import Axios from "axios";
const API_URL = "http://localhost:8080/api/dev-canvas";

export const createNewProject = async ({
  form,
  creatorEmail,
  token,
}: {
  form: ProjectFormInput;
  creatorEmail: string;
  token: string;
}) => {
  const imageObj = await uploadImage(form.image);

  if (imageObj) {
    const variables = {
      ...form,
      image: imageObj.url,
      createdBy: creatorEmail,
    };

    const res = await Axios.post(`${API_URL}/project`, variables, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
};

export const fetchAllProjects = async ({
  category,
  endCursor,
}: {
  category?: string;
  endCursor?: string;
}) => {
  const query = category ? `?category=${category}` : "";
  const res = await Axios.get(`${API_URL}/projects${query}`);
  return res.data;
};

export const getProjectDetails = async (id: string) => {
  const res = await Axios.get(`${API_URL}/project/${id}`);
  return res.data;
};

export const getUserProjects = async (id: string) => {
  const res = await Axios.get(`${API_URL}/user/${id}/projects`);
  return res.data;
};

export const deleteUserProject = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  const res = await Axios.delete(`${API_URL}/project/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
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
  const imageObj = await uploadImage(form.image);

  if (imageObj) {
    const variables = {
      ...form,
      image: imageObj.url,
    };
    const res = await Axios.put(`${API_URL}/project/${id}`, variables, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data;
  }
};

export const createUser = async ({
  name,
  email,
  avatarUrl,
  description,
  githubUrl,
  linkedinUrl,
}: {
  name: string;
  email: string;
  avatarUrl: string;
  description?: string;
  githubUrl?: string;
  linkedinUrl?: string;
}) => {
  const variables = {
    name,
    email,
    avatarUrl,
    description,
    githubUrl,
    linkedinUrl,
  };
  const res = await Axios.post(`${API_URL}/user`, variables);
  return res.data;
};

export const getUser = async (email: string) => {
  // send email in params like this /user/:email
  const res = await Axios.get(`${API_URL}/user/${email}`);
  return res.data;
};
