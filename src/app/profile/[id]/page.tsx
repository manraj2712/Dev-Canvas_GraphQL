import { ProjectInterface, UserProfile } from "@/common/types";
import Button from "@/components/button";
import ProjectCard from "@/components/projectCard";
import { getUserProjects } from "@/mongodb";
import Image from "next/image";
import Link from "next/link";
type Props = {
  params: {
    id: string;
  };
};
const ProfilePage = async ({ params }: Props) => {
  const result = (await getUserProjects(params.id)) as ProjectInterface[];

  if (!result) {
    return <p className="no-result-text">Failed to fetch user info</p>;
  }
  return (
    <section className="flexCenter flex-col max-w-10xl w-full mx-auto paddings mb-10 mt-5">
      <section className="flexBetween max-lg:flex-col gap-10 w-full">
        <div className="flex items-start flex-col w-full">
          <Image
            src={result[0]?.createdBy?.avatarUrl}
            width={100}
            height={100}
            className="rounded-full"
            alt="user image"
          />
          <p className="text-4xl font-bold mt-10">
            {" "}
            {result[0].createdBy.name}
          </p>
          <p className="md:text-5xl text-3xl font-extrabold md:mt-10 mt-5 max-w-lg">
            {"I’m Software Engineer 👋"}
          </p>

          <div className="flex mt-8 gap-5 w-full flex-wrap">
            <Button
              title="Follow"
              leftIcon="/plus-round.svg"
              bgColor="bg-light-white-400 !w-max"
              textColor="text-black-100"
            />
            <Link href={`mailto:${result[0].createdBy.email}`}>
              <Button title="Hire Me" leftIcon="/email.svg" />
            </Link>
          </div>
        </div>

        {result.length > 0 ? (
          <Image
            src={result[0].image}
            alt="project image"
            width={739}
            height={554}
            className="rounded-xl object-contain"
          />
        ) : (
          <Image
            src="/profile-post.png"
            width={739}
            height={554}
            alt="project image"
            className="rounded-xl"
          />
        )}
      </section>

      <section className="flexStart flex-col lg:mt-28 mt-16 w-full">
        <p className="w-full text-left text-lg font-semibold">Recent Work</p>

        <div className="profile_projects">
          {result?.map((project: ProjectInterface) => (
            <ProjectCard
              key={project._id}
              category={project.category}
              createdBy={project.createdBy}
              description={project.description}
              githubUrl={project.githubUrl}
              _id={project._id}
              image={project.image}
              liveSiteUrl={project.liveSiteUrl}
              title={project.title}
            />
          ))}
        </div>
      </section>
    </section>
  );
};

export default ProfilePage;
