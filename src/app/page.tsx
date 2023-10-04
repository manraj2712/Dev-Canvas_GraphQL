import { ProjectInterface } from "@/common/types";
import ProjectCard from "@/components/projectCard";
import { fetchAllProjects } from "@/graphql/methods";

type ProjectSearch = {
  projectCollection: {
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

export default async function Home() {
  const data = (await fetchAllProjects({})) as ProjectSearch;
  const projectsToDisplay = data?.projectCollection?.edges;

  if (projectsToDisplay.length === 0) {
    return (
      <section className="flexStart flex-col paddings">
        Categories
        <p className="no-result-test test-center">
          No projects found, go create some first
        </p>
      </section>
    );
  }
  return (
    <div>
      <section className="flex-start flex-col paddings mb-16">
        <h1>Categories</h1>
        <section className="projects-grid">
          {projectsToDisplay.map(({ node }: { node: ProjectInterface }) => {
            return <ProjectCard {...node} key={node.id}/>;
          })}
        </section>
        <h1>Load More</h1>
      </section>
    </div>
  );
}
