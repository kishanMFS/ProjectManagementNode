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
                (project_name, project_description) 
        VALUES  ($1, $2)
                RETURNING *
    `,
    [projectData.projectname, projectData.description],
  );
  console.log(projectData);
  if (createdProject) {
    result.success = true;
    result.project = {
      project_id: createdProject.project_id,
      projectname: createdProject.project_name,
      description: createdProject.project_description,
      createddate: createdProject.cdt,
    };
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
    `   SELECT  p.project_id,
                p.project_name as projectName,
                p.project_description as description,
                TO_CHAR(p.cdt, 'DD/MM/YYYY') as createdDate,
                (SELECT count(pf.projectfileid)
				        FROM    tbl_projectsFiles pf 
				        WHERE   pf.project_ID = p.project_id
				        ) AS projectFiles,
                0 AS projectJobs
        FROM    tbl_projects p
        WHERE   1=1
                AND p.is_deleted = false
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

  db.query(
    `   
      UPDATE  tbl_projects
      SET     projectName = $1
              AND project_description = $2
    `,
    [projectData.projectName, projectData.description],
  );

  result.success = true;
  result.message = 'project updated successfully';

  return result;
};

const deleteProject = async (projectID: string) => {
  const result = {
    success: false,
    message: '',
  };

  db.oneOrNone(
    `
      UPDATE  tbl_projects
      SET     is_deleted = true
      WHERE   1=1
              AND project_id = $1
    `,
    [projectID],
  );

  result.success = true;
  result.message = 'Project deleted successfully';

  return result;
};

export { createProject, getProjects, getProjectById, updateProject, deleteProject };
