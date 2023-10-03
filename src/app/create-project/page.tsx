import Modal from "@/components/modal";
import ProjectForm from "@/components/projectForm";
import { ProjectFormType } from "@/contants/enums";
export default function CreateProject() {
  return (
    <Modal>
      <h3 className="modal-head-text">Create a New Project</h3>
      <ProjectForm type={ProjectFormType.CREATE}/>
    </Modal>
  );
}
