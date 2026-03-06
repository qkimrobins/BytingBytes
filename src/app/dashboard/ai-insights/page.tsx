import { AiInsightsForm } from '@/components/dashboard/ai-insights-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

export default function AiInsightsPage() {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline">AI-Powered Insights</CardTitle>
          <CardDescription>
            Leverage AI to get smart suggestions for tasks, milestones, and growth opportunities based on your startup's data.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <AiInsightsForm />
        </CardContent>
      </Card>
    </div>
  );
}
