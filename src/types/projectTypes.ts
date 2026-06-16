interface Project {
  project_id: string;
  projectname: string;
  description?: string;
  createddate?: Date;
  projectFiles?: number;
  projectJobs?: number;
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
  filePath?: string;
  fileName?: string;
}

export interface fileType {
  projectfileid: number;
  name: string;
  size: number;
  type: string;
  fileData: unknown;
  uploadedDate: string;
}

export interface ProjectFile {
  projectfileid: number;
  projectfilename: string;
  projectfilekey: string;
  size: number;
  mimetype?: string;
  uploadedDate?: string;
}

export interface ProjectJob {
  jobid: number;
  zipname: string;
  status: string;
  progress: number;
  uploadedDate?: string;
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
}

export interface UploadedFile {
  fileId: number;
  name: string;
  size: number;
  type: string;
  cdt: string;
  project_id?: string;
}

export type { Project, ProjectModelType };
