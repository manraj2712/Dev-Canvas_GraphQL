import { ProjectInterface, UserProfile } from "@/common/types";
import { getUserProjects } from "@/graphql/methods";
import Link from "next/link";
import Image from "next/image";
const RelatedProjects = async ({
  userId,
  projectId,
}: {
  userId: string;
  projectId: string;
}) => {
  const result = (await getUserProjects(userId)) as { user?: UserProfile };
  const projects = result.user?.projects.edges.filter(({ node }) => {
    return node.id !== projectId;
  });
  return (
    <section className="flex flex-col mt-32 w-full">
      <div className="flexBetween">
        <p className="text-base font-bold">More by {result?.user?.name}</p>
        <Link
          href={`/profile/${result?.user?.id}`}
          className="text-primary-purple text-base"
        >
          View Profile
        </Link>
      </div>

      <div className="related_projects-grid">
        {projects?.map(({ node }: { node: ProjectInterface }) => (
          <div
            key={node.id}
            className="flexCenter related_project-card drop-shadow-card"
          >
            <Link
              href={`/project/${node.id}`}
              className="flexCenter group relative w-full h-full"
            >
              <Image
                src={node.image}
                width={414}
                height={314}
                className="w-full h-full object-cover rounded-2xl"
                alt="Project Image"
              />
              <div className="hidden group-hover:flex related_project-card_title">
                <p className="w-full">{node.title}</p>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RelatedProjects;
