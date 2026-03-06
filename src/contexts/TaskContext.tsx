'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { z } from 'zod';
import { taskSchema as baseTaskSchema } from '@/lib/schemas';

// Using a more specific type for tasks within the context
type Task = z.infer<typeof baseTaskSchema> & {
  id: string;
  createdAt: Date;
};

type TaskColumn = {
  title: string;
  tasks: Task[];
};

type TasksContextType = {
  columns: TaskColumn[];
  addTask: (task: z.infer<typeof baseTaskSchema>) => void;
  moveTask: (taskId: string, currentStatus: string, newStatus: string) => void;
  removeTask: (taskId: string, status: string) => void;
};

// Getting dates for the last 6 months to make the chart look good
const getPastDate = (months: number) => {
    const date = new Date();
    date.setMonth(date.getMonth() - months);
    return date;
}

const initialTaskColumns: TaskColumn[] = [
  {
    title: 'To Do',
    tasks: [
      { id: 'task-1', title: 'Design new landing page', tag: 'Design', status: 'To Do', createdAt: getPastDate(0) },
      { id: 'task-2', title: 'Develop user authentication', tag: 'Dev', status: 'To Do', createdAt: getPastDate(0) },
    ],
  },
  {
    title: 'In Progress',
    tasks: [
      { id: 'task-4', title: 'Refactor dashboard components', tag: 'Dev', status: 'In Progress', createdAt: getPastDate(1) },
      { id: 'task-5', title: 'Create pitch deck v2', tag: 'Milestone', status: 'In Progress', createdAt: getPastDate(1) },
    ],
  },
  {
    title: 'Done',
    tasks: [
      { id: 'task-6', title: 'Set up CI/CD pipeline', tag: 'DevOps', status: 'Done', createdAt: getPastDate(5) },
      { id: 'task-7', title: 'Onboard new marketing intern', tag: 'HR', status: 'Done', createdAt: getPastDate(4) },
      { id: 'task-8', title: 'Analyze competitor pricing', tag: 'Research', status: 'Done', createdAt: getPastDate(3) },
      { id: 'task-9', title: 'Initial user testing', tag: 'Milestone', status: 'Done', createdAt: getPastDate(2) },
      { id: 'task-10', title: 'Launch MVP', tag: 'Milestone', status: 'Done', createdAt: getPastDate(1) },
    ],
  },
];


const TasksContext = createContext<TasksContextType | undefined>(undefined);

export function TasksProvider({ children }: { children: ReactNode }) {
  const [columns, setColumns] = useState<TaskColumn[]>(initialTaskColumns);

  const addTask = (task: z.infer<typeof baseTaskSchema>) => {
    const newTaskId = `task-${Date.now()}`;
    const newTask: Task = { ...task, id: newTaskId, createdAt: new Date() };

    setColumns((prevColumns) =>
      prevColumns.map((column) => {
        if (column.title === task.status) {
          return {
            ...column,
            tasks: [...column.tasks, newTask],
          };
        }
        return column;
      })
    );
  };

  const moveTask = (taskId: string, currentStatus: string, newStatus: string) => {
    if (currentStatus === newStatus) return;

    let taskToMove: Task | undefined;

    // Find and remove task from current column
    const newColumns = columns.map(column => {
        if (column.title === currentStatus) {
            taskToMove = column.tasks.find(task => task.id === taskId);
            return {
                ...column,
                tasks: column.tasks.filter(task => task.id !== taskId)
            };
        }
        return column;
    });

    if (taskToMove) {
        // Add task to new column
        const finalColumns = newColumns.map(column => {
            if (column.title === newStatus) {
                // Important: update task's status property
                return {
                    ...column,
                    tasks: [...column.tasks, { ...taskToMove!, status: newStatus }]
                };
            }
            return column;
        });
        setColumns(finalColumns);
    }
  };
  
  const removeTask = (taskId: string, status: string) => {
      setColumns(prev => prev.map(column => {
          if (column.title === status) {
              return {
                  ...column,
                  tasks: column.tasks.filter(task => task.id !== taskId)
              };
          }
          return column;
      }))
  }

  return (
    <TasksContext.Provider value={{ columns, addTask, moveTask, removeTask }}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasks() {
  const context = useContext(TasksContext);
  if (context === undefined) {
    throw new Error('useTasks must be used within a TasksProvider');
  }
  return context;
}
