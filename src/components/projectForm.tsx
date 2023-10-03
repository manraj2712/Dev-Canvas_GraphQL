"use client";
import { ProjectFormType } from "@/contants/enums";
import Image from "next/image";
import FormFeild from "./formField";
import { categoryFilters } from "@/contants/categories";
import CustomMenu from "./customMenu";
import { useState } from "react";

export default function ProjectForm({ type }: { type: ProjectFormType }) {
  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {};
  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.includes("image")) {
      return alert("Please upload an image file");
    }

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
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
  const [form, setForm] = useState({
    image: "",
    title: "",
    description: "",
    liveUrl: "",
    githubUrl: "",
    category: "",
  });
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
        placeholder="CodeStreax"
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
        placeholder="https://codestreax.tech"
        error="Please enter a valid url"
        setState={(value: string) => {
          handleStateChange({ value: value, fieldName: "liveUrl" });
        }}
        state={form.liveUrl}
      />
      <FormFeild
        label="Github URL"
        placeholder="https://github.com/CodeStreax"
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

      <button
        type="submit"
        className="flexCenter form_submit-btn"
        disabled={type === ProjectFormType.CREATE}
      >
        Create Project
      </button>
    </form>
  );
}
