'use client';

import { useState } from 'react';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlusCircle, MoreHorizontal } from 'lucide-react';
import { AddTaskDialog } from '@/components/dashboard/add-task-dialog';
import { taskSchema } from '@/lib/schemas';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useTasks } from '@/contexts/TaskContext';

const tagColors: { [key: string]: string } = {
  Design: 'bg-blue-100 text-blue-800',
  Dev: 'bg-green-100 text-green-800',
  Marketing: 'bg-purple-100 text-purple-800',
  BizDev: 'bg-yellow-100 text-yellow-800',
  DevOps: 'bg-red-100 text-red-800',
  HR: 'bg-indigo-100 text-indigo-800',
  Research: 'bg-pink-100 text-pink-800',
  Milestone: 'bg-amber-100 text-amber-800',
};

export default function TasksPage() {
  const { columns, addTask, moveTask, removeTask } = useTasks();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [defaultStatus, setDefaultStatus] = useState('To Do');

  const handleAddTask = (task: z.infer<typeof taskSchema>) => {
    addTask(task);
  };

  const openDialog = (status?: string) => {
    setDefaultStatus(status || 'To Do');
    setIsDialogOpen(true);
  };
  
  const handleRemoveTask = (taskId: string, status: string) => {
    removeTask(taskId, status);
  };

  return (
    <>
      <AddTaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onAddTask={handleAddTask}
        defaultStatus={defaultStatus}
      />
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold font-headline">Task Board</h1>
          <Button onClick={() => openDialog()}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Task
          </Button>
        </div>
        <div className="grid md:grid-cols-3 gap-6 items-start">
          {columns.map((column) => (
            <Card key={column.title} className="bg-muted/50">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">{column.title}</CardTitle>
                <Badge variant="secondary">{column.tasks.length}</Badge>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                {column.tasks.map((task) => (
                  <Card key={task.id} className="bg-background">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start">
                        <p className="font-semibold">{task.title}</p>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-6 w-6">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent>
                            {columns
                              .filter((c) => c.title !== column.title)
                              .map((destColumn) => (
                                <DropdownMenuItem
                                  key={destColumn.title}
                                  onClick={() =>
                                    moveTask(task.id, column.title, destColumn.title)
                                  }
                                >
                                  Move to {destColumn.title}
                                </DropdownMenuItem>
                              ))}
                              <DropdownMenuItem className="text-destructive" onClick={() => handleRemoveTask(task.id, column.title)}>
                                  Remove
                              </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                      <Badge className={`mt-2 font-normal ${tagColors[task.tag] || 'bg-gray-100 text-gray-800'}`}>{task.tag}</Badge>
                    </CardContent>
                  </Card>
                ))}
                <Button variant="outline" className="w-full mt-2" onClick={() => openDialog(column.title)}>
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Card
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}
