'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getAiInsights } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Lightbulb, Loader2, ServerCrash, Sparkles } from 'lucide-react';
import type { AiBasedInsightsOutput } from '@/ai/flows/ai-based-insights';
import { aiInsightsSchema } from '@/lib/schemas';

export function AiInsightsForm() {
  const [result, setResult] = useState<AiBasedInsightsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof aiInsightsSchema>>({
    resolver: zodResolver(aiInsightsSchema),
    defaultValues: {
      startupDescription: '',
      currentProgress: '',
      industryTrends: '',
    },
  });

  async function onSubmit(values: z.infer<typeof aiInsightsSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getAiInsights(values);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(response.error || 'An unknown error occurred.');
    }
    setIsLoading(false);
  }

  return (
    <div className="space-y-8">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="startupDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your startup, its goals, and challenges..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="currentProgress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Progress</FormLabel>
                <FormControl>
                  <Textarea placeholder="Summarize your current progress and key metrics..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="industryTrends"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Trends (Optional)</FormLabel>
                <FormControl>
                  <Textarea placeholder="Any relevant industry trends or market conditions..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Get Insights
              </>
            )}
          </Button>
        </form>
      </Form>

      {error && (
        <Card className="border-destructive">
            <CardHeader className="flex flex-row items-center gap-2">
                <ServerCrash className="w-5 h-5 text-destructive" />
                <CardTitle className="text-destructive">Error</CardTitle>
            </CardHeader>
            <CardContent>
                <p>{error}</p>
            </CardContent>
        </Card>
      )}

      {result && (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Lightbulb className="text-accent" />
                AI Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {result.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="text-primary" />
                Reasoning
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.reasoning}</p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
