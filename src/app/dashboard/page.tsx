'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';
import { ListChecks, Target, Users, IndianRupee } from 'lucide-react';
import { useTasks } from '@/contexts/TaskContext';
import { useTeam } from '@/contexts/TeamContext';

const staticKpiData = [
  {
    title: 'Funding Goal',
    value: '₹500,000',
    progress: 45,
    icon: IndianRupee,
    change: '+15% this month',
  },
];

const fundingData = [
    { month: 'Jan', raised: 50000, fall: 10000 },
    { month: 'Feb', raised: 65000, fall: 5000 },
    { month: 'Mar', raised: 90000, fall: 0 },
    { month: 'Apr', raised: 80000, fall: 10000 },
    { month: 'May', raised: 120000, fall: 0 },
    { month: 'Jun', raised: 225000, fall: 0 },
];

const formatYAxis = (tick: number) => `₹${tick / 1000}k`;

const CustomFundingTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const currentData = payload[0].payload;
    const currentIndex = fundingData.findIndex((d) => d.month === label);
    const prevData = currentIndex > 0 ? fundingData[currentIndex - 1] : null;
    
    let changePercent = 0;
    if (prevData && prevData.raised > 0) {
      const change = currentData.raised - prevData.raised;
      changePercent = (change / prevData.raised) * 100;
    }

    return (
      <div className="p-3 bg-card text-card-foreground border rounded-lg shadow-lg">
        <p className="font-bold mb-2">{label}</p>
        {payload.map((pld: any) => (
          <div key={pld.name} className="flex items-center text-sm mb-1">
            <div style={{width: '10px', height: '10px', borderRadius: '2px', backgroundColor: pld.color, marginRight: '8px'}}></div>
            <span className="mr-2">{pld.name}:</span>
            <span className="font-semibold">{formatYAxis(pld.value)}</span>
          </div>
        ))}
        {currentIndex > 0 && (
           <p className={`text-xs mt-2 font-medium ${changePercent >= 0 ? 'text-chart-1' : 'text-destructive'}`}>
              {changePercent >= 0 ? '+' : ''}{changePercent.toFixed(1)}% vs. previous month
           </p>
        )}
      </div>
    );
  }
  return null;
};


export default function DashboardPage() {
  const { columns } = useTasks();
  const { teamMembers } = useTeam();

  const allTasks = columns.flatMap((col) => col.tasks);
  const doneTasks = columns.find((c) => c.title === 'Done')?.tasks || [];
  const activeTasksCount =
    columns.find((c) => c.title === 'In Progress')?.tasks.length || 0;
  const todoTasksCount =
    columns.find((c) => c.title === 'To Do')?.tasks.length || 0;
  const openTasksCount = activeTasksCount + todoTasksCount;

  const milestones = allTasks.filter((t) => t.tag === 'Milestone');
  const milestonesHit = doneTasks.filter((t) => t.tag === 'Milestone').length;

  const kpiData = [
    staticKpiData[0], // Funding
    {
      title: 'Active Tasks',
      value: openTasksCount.toString(),
      progress:
        allTasks.length > 0 ? (doneTasks.length / allTasks.length) * 100 : 0,
      icon: ListChecks,
      change: `${doneTasks.length} tasks completed`,
    },
    {
      title: 'Milestones Hit',
      value: `${milestonesHit} / ${milestones.length}`,
      progress:
        milestones.length > 0 ? (milestonesHit / milestones.length) * 100 : 0,
      icon: Target,
      change: `${
        milestones.length > 0
          ? Math.round((milestonesHit / milestones.length) * 100)
          : 0
      }% of milestones hit`,
    },
    {
      title: 'Team Members',
      value: teamMembers.length.toString(),
      progress: 100, // This could be based on a hiring goal
      icon: Users,
      change: `+1 new member`, // This is static for now
    },
  ];

  const taskStatusData = [
    { name: 'To Do', value: todoTasksCount },
    { name: 'In Progress', value: activeTasksCount },
    { name: 'Done', value: doneTasks.length },
  ];
  
  const milestoneProgressData = [
    { name: 'Hit', value: milestonesHit },
    { name: 'Pending', value: milestones.length - milestonesHit },
  ];

  const TASK_COLORS = ['hsl(var(--chart-3))', 'hsl(var(--chart-2))', 'hsl(var(--chart-1))'];
  const MILESTONE_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--chart-5))'];


  return (
    <div className="grid gap-4 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <Card key={kpi.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
              <kpi.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{kpi.value}</div>
              <p className="text-xs text-muted-foreground">{kpi.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="lg:col-span-4">
          <CardHeader>
            <CardTitle className="font-headline">Funding</CardTitle>
            <CardDescription>
                Monthly funding progress.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={fundingData}>
                    <defs>
                        <linearGradient id="colorRaise" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorFall" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--destructive))" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="hsl(var(--destructive))" stopOpacity={0}/>
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="month" />
                    <YAxis tickFormatter={formatYAxis} />
                    <Tooltip content={<CustomFundingTooltip />} />
                    <Legend />
                    <Area type="monotone" dataKey="raised" stroke="hsl(var(--primary))" fillOpacity={1} fill="url(#colorRaise)" name="Raised"/>
                    <Area type="monotone" dataKey="fall" stroke="hsl(var(--destructive))" fillOpacity={1} fill="url(#colorFall)" name="Fall" />
                </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card className="lg:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline">Progress Overview</CardTitle>
            <CardDescription>
                Live snapshot of tasks and milestones.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col items-center">
                <h3 className="text-md font-medium mb-2">Tasks</h3>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie data={taskStatusData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={2}>
                            {taskStatusData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={TASK_COLORS[index % TASK_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                         <Legend iconSize={10} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
            <div className="flex flex-col items-center">
                <h3 className="text-md font-medium mb-2">Milestones</h3>
                <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                        <Pie data={milestoneProgressData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={2}>
                             {milestoneProgressData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={MILESTONE_COLORS[index % MILESTONE_COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip
                            contentStyle={{
                                background: 'hsl(var(--background))',
                                border: '1px solid hsl(var(--border))',
                                borderRadius: 'var(--radius)',
                            }}
                        />
                        <Legend iconSize={10}/>
                    </PieChart>
                </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
