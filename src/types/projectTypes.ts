interface Project {
  project_id: string;
  projectname: string;
  description?: string;
  createddate?: Date;
}

interface ProjectModelType {
  success: boolean;
  project?: Project | null;
  message: string;
}

export type { Project, ProjectModelType };
