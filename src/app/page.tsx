import { ProjectInterface } from "@/common/types";
import Categories from "@/components/categories";
import Pagination from "@/components/pagination";
import ProjectCard from "@/components/projectCard";
import { fetchAllProjects } from "@/graphql/methods";

type ProjectSearch = {
  projectSearch: {
    edges: {
      node: ProjectInterface;
    }[];
    pageInfo: {
      hasNextPage: boolean;
      hasPreviousPage: boolean;
      startCursor: string;
      endCursor: string;
    };
  };
};

export default async function Home({
  searchParams: { category, endCursor },
}: {
  searchParams: { category?: string, endCursor?: string };
}) {
  const data = (await fetchAllProjects({ category,endCursor })) as ProjectSearch;
  const projectsToDisplay = data?.projectSearch?.edges;
  const pagination = data?.projectSearch?.pageInfo;
  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        <Categories />
        <p className="no-result-test test-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <div>
      <section className="flex-start flex-col paddings mb-16">
        <Categories />
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => {
            return <ProjectCard {...node} key={node.id} />;
          })}
        </section>
        <Pagination
          startCursor={pagination?.startCursor}
          endCursor={pagination?.endCursor}
          hasNextPage={pagination?.hasNextPage}
          hasPreviousPage={pagination?.hasPreviousPage}
        />
      </section>
    </div>
  );
}
