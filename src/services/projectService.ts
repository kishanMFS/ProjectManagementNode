const projects = [
  {
    id: '1',
    name: 'Project Alpha',
    description: 'Description for Project Alpha',
  },
  {
    id: '2',
    name: 'Project Beta',
    description: 'Description for Project Beta',
  },
];

export const createProject = async (projectData: any) => {
  const newProject = { id: (projects.length + 1).toString(), ...projectData };
  projects.push(newProject);
  return newProject;
};

export const getProjects = async () => {
  return projects;
};

export const getProjectById = async (id: string) => {
  return projects.find((project) => project.id === id);
};

export const updateProject = async (id: string, projectData: any) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return null;
  projects[projectIndex] = { ...projects[projectIndex], ...projectData };
  return projects[projectIndex];
};

export const deleteProject = async (id: string) => {
  const projectIndex = projects.findIndex((project) => project.id === id);
  if (projectIndex === -1) return null;
  const deletedProject = projects.splice(projectIndex, 1);
  return deletedProject[0];
};
