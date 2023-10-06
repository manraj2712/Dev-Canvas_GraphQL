import { SessionInterface, ProjectInterface } from "@/common/types";
import Modal from "@/components/modal";
import { getCurrentServerSession } from "@/lib/session";
import ProjectForm from "@/components/projectForm";
import { ProjectFormType } from "@/contants/enums";
import { getProjectDetails } from "@/graphql/methods";
const EditProject = async ({ params: { id } }: { params: { id: string } }) => {
  const session = (await getCurrentServerSession()) as SessionInterface;
  const res = (await getProjectDetails(id)) as { project?: ProjectInterface };
  return (
    <Modal>
      <h3 className="modal-head-text">Edit Project</h3>
      <ProjectForm
        type={ProjectFormType.EDIT}
        project={res.project}
      ></ProjectForm>
    </Modal>
  );
};

export default EditProject;
