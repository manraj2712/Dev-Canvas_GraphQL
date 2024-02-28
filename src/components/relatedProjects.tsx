import { ProjectInterface, UserProfile } from "@/common/types";
import { getUserProjects } from "@/mongodb";
import Link from "next/link";
import Image from "next/image";
const RelatedProjects = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const result = (await getUserProjects(userId)) as ProjectInterface[];
  const projects = result;
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">
          More by {result[0]?.createdBy?.name}
        </p>
        <Link
          href={`/profile/${result[0]?.createdBy?._id}`}
          className="text-primary-purple text-base"
        >
          View Profile
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects?.map((project: ProjectInterface) => (
          <div
            key={project._id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link
              href={`/project/${project._id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={project.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="Project Image"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{project.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
