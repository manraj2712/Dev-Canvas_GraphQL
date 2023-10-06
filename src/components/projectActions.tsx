"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { fetchToken } from "@/lib/actions";
import { deleteUserProject } from "@/graphql/methods";
import { useRouter } from "next/navigation";
const ProjectActions = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteProject = async () => {
    try {
      setIsDeleting(true);
      const tokenObj = await fetchToken();
      if (!tokenObj) return;
      await deleteUserProject({ id: projectId, token: tokenObj.token });
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleting(false);
    }
  };
  return (
    <>
      <Link
        href={`/edit-project/${projectId}`}
        className="flexCenter edit-action_btn"
      >
        <Image src={"/pencile.svg"} width={15} height={15} alt="edit" />
      </Link>
      <button
        type="button"
        className={`flexCenter delete-action_btn ${
          isDeleting ? "bg-gray" : "bg-primary-purple"
        }`}
        onClick={handleDeleteProject}
      >
        <Image src={"/trash.svg"} width={15} height={15} alt="delete" />
      </button>
    </>
  );
};

export default ProjectActions;
