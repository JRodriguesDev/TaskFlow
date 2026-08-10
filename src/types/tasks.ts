export type TaskCardProps = {
  id: string;
  title: string;
  description?: string | null;
  dueDate: Date;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  completedAt?: Date | null;
  createdAt: Date;
};

export type TaskDialogProps = Pick<
  TaskCardProps,
  'id' | 'title' | 'description' | 'status' | 'priority' | 'dueDate'
>;

export type TaskSchedule = Pick<
  TaskCardProps,
  'id' | 'title' | 'description' | 'status' | 'priority'
>;

export type TaskSearchParams = {
  search?: string;
  status?: 'TODO' | 'IN_PROGRESS' | 'DONE';
  priority?: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate?: 'today' | 'tomorrow' | '3' | '7' | '30' | 'overdue' | 'none';
};

export type TaskResponse = {
  success: boolean;
  tasks?: TaskCardProps[];
  message?: string;
};

export type TodayTaskReponse = {
  success: boolean;
  progress?: {
    total: number;
    completed: number;
    percentage: number;
  };
  message?: string;
};

export type SummaryTaskResponse = {
  success: boolean;
  summaryTasks?: {
    total: number;
    done: number;
    inProgress: number;
    todo: number;
  };
  message?: string;
};

export type taskScheduleResponse = {
  success: boolean;
  tasks?: {
    todayTasks: TaskSchedule[];
    tomorrowTasks: TaskSchedule[];
    overdueTasks: TaskSchedule[];
  };
  message?: string;
};
