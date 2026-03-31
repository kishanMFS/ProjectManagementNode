interface Project {
  id: string;
  name: string;
  description?: string;
  startDate: Date;
  endDate: Date;
  status: 'Not Started' | 'In Progress' | 'Completed';
  teamMembers: string[]; // Array of user IDs
}

export type { Project };
