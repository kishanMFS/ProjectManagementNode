import db from '@/utils/db.js';
import type { Project } from '@/types/projectTypes.js';
// import { User } from '@/types/authServiceTypes.js';

const createProject = async (projectData: Project) => {
  const result = {
    success: false,
    project: null as Project | null,
    message: '',
  };
  const createdProject = await db.oneOrNone(
    `   INSERT 
        INTO    tbl_projects 
                (name, description) 
        VALUES  ($1, $2)
                RETURNING *
    `,
    [projectData.name, projectData.description],
  );

  if (createdProject) {
    result.success = true;
    result.message = 'Project created successfully';
  }

  return result;
};

const getProjects = async () => {
  const result = {
    success: false,
    projects: [] as Project[],
    message: '',
  };
  const projects = await db.manyOrNone<Project>(
    `   SELECT  * 
        FROM    tbl_projects 
        WHERE   1=1
                AND is_deleted = false
    `,
  );
  if (projects) {
    result.success = true;
    result.message = 'Projects fetched successfully';
    result.projects = projects;
  }
  return result;
};

const getProjectById = async (id: string) => {
  const result = {
    success: false,
    project: null as Project | null,
    message: '',
  };

  const project = await db.oneOrNone<Project>(
    `   SELECT  * 
        FROM    tbl_projects 
        WHERE   1=1
                AND id = $1
                AND is_active = true
                AND is_deleted = false
    `,
    [id],
  );

  if (project) {
    result.success = true;
    result.message = 'Project fetched successfully';
    result.project = project;
  }

  return result;
};

const updateProject = (id: string, projectData: Project) => {
  const result = {
    success: false,
    project: null as Project | null,
    message: '',
  };

  const updatedProject = db.query(
    `   
            UPDATE  tbl_projects
            SET     projectName = $1
                    AND project_description = $2
        `,
    [projectData.name, projectData.description],
  );
  if (updatedProject) {
    result.success = true;
    result.message = 'project updated successfully';
  }

  return result;
};

const deleteProject = async (id: string) => {
  const result = {
    success: false,
    message: '',
  };

  const deletedProject = db.oneOrNone(
    `
            UPDATE  tbl_projects
            SET     is_deleted = true
            WHERE   1=1
                    AND id = $1
        `,
    [id],
  );

  if (deletedProject) {
    result.success = true;
    result.message = 'Project deleted successfully';
  }

  return result;
};

export { createProject, getProjects, getProjectById, updateProject, deleteProject };
