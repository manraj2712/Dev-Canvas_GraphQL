"use client";
import { ProjectFormType } from "@/contants/enums";
import Image from "next/image";
import FormFeild from "./formField";
import { categoryFilters } from "@/contants/categories";
import CustomMenu from "./customMenu";
import { useState } from "react";
import Button from "./button";
import {
  ProjectFormInput,
  ProjectInterface,
  SessionInterface,
} from "@/common/types";
import { createNewProject, editUserProject } from "@/mongodb";
import { fetchToken } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";

export default function ProjectForm({
  type,
  project,
}: {
  type: ProjectFormType;
  project?: ProjectInterface;
}) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState<ProjectFormInput>({
    image: project?.image || "",
    title: project?.title || "",
    description: project?.description || "",
    liveSiteUrl: project?.liveSiteUrl || "",
    githubUrl: project?.githubUrl || "",
    category: project?.category || "",
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const tokenObj = await fetchToken();
      const session = (await getSession()) as SessionInterface;
      if (type === ProjectFormType.CREATE && tokenObj && session) {
        await createNewProject({
          form: form,
          creatorEmail: session.user.email,
          token: tokenObj.token,
        });
      } else if (type === ProjectFormType.EDIT && tokenObj && session) {
        await editUserProject({
          form: form,
          id: project?._id as string,
          token: tokenObj.token,
        });
      }
      window.location.assign("/");
    } catch (e: any) {
      alert(e.message);
    } finally {
      setIsSubmitting(false);
    }
  };
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      handleStateChange({ value: result, fieldName: "image" });
    };
  };

  const handleStateChange = ({
    value,
    fieldName,
  }: {
    value: String;
    fieldName: string;
  }) => {
    setForm((prev) => ({
      ...prev,
      [fieldName]: value,
    }));
  };

  return (
    <form className="flexStart form" onSubmit={handleFormSubmit}>
      <div className="flexStart form_image-container">
        <label htmlFor="poster" className="flexCenter form_image-label">
          {!form.image && "Choose an image for your project"}
        </label>
        <input
          id="image"
          type="file"
          accept="image/*"
          required={type === ProjectFormType.CREATE}
          className="form_image-input"
          onChange={handleChangeImage}
        />
        {form.image && (
          <Image
            src={form.image}
            className="sm:p-10 object-contain z-20"
            alt="Project Poster"
            fill
          />
        )}
      </div>
      <FormFeild
        label="Title"
        placeholder="DevCanvas"
        error="Please enter a valid title"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "title" });
        }}
        state={form.title}
      />
      <FormFeild
        label="Description"
        placeholder="A beautiful Netflix clone using React and TailwindCSS"
        error="Please enter a valid description"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "description" });
        }}
        state={form.description}
      />
      <FormFeild
        label="Website URL"
        placeholder="https://DevCanvas.tech"
        error="Please enter a valid url"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "liveSiteUrl" });
        }}
        state={form.liveSiteUrl}
      />
      <FormFeild
        label="Github URL"
        placeholder="https://github.com/DevCanvas"
        error="Please enter a valid url"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "githubUrl" });
        }}
        state={form.githubUrl}
      />

      <CustomMenu
        label="Category"
        state={form.category}
        filters={categoryFilters}
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "category" });
        }}
      />
      <div className="w-full mt-10">
        <Button
          isSubmitting={isSubmitting}
          title={
            isSubmitting
              ? type === ProjectFormType.CREATE
                ? "Creating..."
                : "Updating..."
              : type === ProjectFormType.CREATE
              ? "Create"
              : "Update"
          }
          type="submit"
          leftIcon={isSubmitting ? "" : "/plus.svg"}
          handleClick={(e) => {
            handleFormSubmit(e);
          }}
        />
      </div>
    </form>
  );
}
