'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IdeaValidatorForm } from '@/components/dashboard/idea-validator-form';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Users, BarChart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
} from 'recharts';

const feedbackAnalysisData = [
    { name: 'Positive', value: 15 },
    { name: 'Negative', value: 8 },
    { name: 'Working On', value: 12 },
];

const FEEDBACK_COLORS = ['hsl(var(--chart-1))', 'hsl(var(--destructive))', 'hsl(var(--chart-2))'];

export default function FeedbackPage() {
  const [internalFeedback, setInternalFeedback] = useState('');
  const { toast } = useToast();

  const handleSaveFeedback = () => {
    // In a real app, this would be saved to a database.
    // For now, we just show a toast notification to confirm.
    console.log('Internal Feedback Saved:', internalFeedback);
    toast({
      title: 'Feedback Saved',
      description: 'Your internal team feedback has been noted.',
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
        <Card>
            <CardHeader>
            <div className="flex items-center gap-2">
                <BarChart />
                <CardTitle className="font-headline">Feedback Analysis</CardTitle>
            </div>
            <CardDescription>
                A visual breakdown of feedback categories from your users and team.
            </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-center">
                <ResponsiveContainer width="100%" height={200}>
                    <PieChart>
                        <Pie data={feedbackAnalysisData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={70} paddingAngle={5}>
                            {feedbackAnalysisData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={FEEDBACK_COLORS[index % FEEDBACK_COLORS.length]} />
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
            </CardContent>
        </Card>

        <Separator />

      <Card>
        <CardHeader>
            <div className="flex items-center gap-2">
                <Users />
                <CardTitle className="font-headline">Internal Team Feedback</CardTitle>
            </div>
          <CardDescription>
            Use this space to gather and document feedback from your team members.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="internal-feedback">Jot down notes, ideas, and concerns from your team</Label>
              <Textarea
                id="internal-feedback"
                placeholder="e.g., 'Jane suggested we should focus more on B2B clients...' "
                rows={5}
                value={internalFeedback}
                onChange={(e) => setInternalFeedback(e.target.value)}
              />
            </div>
          <Button onClick={handleSaveFeedback}>Save Feedback</Button>
        </CardContent>
      </Card>

      <Separator />

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
                <MessageSquare />
                <CardTitle className="font-headline">AI Idea Validation</CardTitle>
          </div>
          <CardDescription>
            Get an unbiased, critical assessment of your startup idea from an AI-powered advisor.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <IdeaValidatorForm />
        </CardContent>
      </Card>
    </div>
  );
}
