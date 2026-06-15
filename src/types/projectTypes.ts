interface Project {
  project_id: string;
  projectname: string;
  description?: string;
  createddate?: Date;
}

interface ProjectModelType {
  success: boolean;
  message: string;
  project?: Project | null;
  project_id?: number | string;
  files?: object[];
  projectfilekey?: string;
  projectfile?: object[];
  status?: string;
  jobs?: object[];
}

export interface fileType {
  projectfileid: number;
  name: string;
  size: number;
  type: string;
  fileData: unknown;
  uploadedDate: string;
}

export type { Project, ProjectModelType };
