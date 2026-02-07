'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { IdeaValidatorForm } from '@/components/dashboard/idea-validator-form';
import { Separator } from '@/components/ui/separator';
import { MessageSquare, Users } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
