interface Project {
  id: string;
  name: string;
  description?: string;
}

interface ProjectModelType {
  success: boolean;
  project: Project | null;
  message: string;
}

export type { Project, ProjectModelType };
