'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getInvestorPitch } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, Presentation, ServerCrash, Sparkles } from 'lucide-react';
import type { InvestorPitchOutput } from '@/ai/flows/investor-pitch-generator';
import { investorPitchSchema } from '@/lib/schemas';

export function PitchGeneratorForm() {
  const [result, setResult] = useState<InvestorPitchOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof investorPitchSchema>>({
    resolver: zodResolver(investorPitchSchema),
    defaultValues: {
      startupName: '',
      problem: '',
      solution: '',
      traction: '',
      roadmap: '',
    },
  });

  async function onSubmit(values: z.infer<typeof investorPitchSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getInvestorPitch(values);
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
            name="startupName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Startup Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., StartUpOps" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="problem"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Problem</FormLabel>
                <FormControl>
                  <Textarea placeholder="What problem is your startup solving?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="solution"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Solution</FormLabel>
                <FormControl>
                  <Textarea placeholder="How does your startup solve this problem?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="traction"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Traction</FormLabel>
                <FormControl>
                  <Textarea placeholder="What traction have you achieved? (e.g., users, revenue, partnerships)" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="roadmap"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Roadmap</FormLabel>
                <FormControl>
                  <Textarea placeholder="What is your future roadmap for the next 6-12 months?" {...field} />
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
                <Presentation className="mr-2 h-4 w-4" />
                Generate Pitch
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
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline">
              <Sparkles className="text-primary" />
              Generated Pitch Outline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea readOnly value={result.pitchOutline} className="min-h-[300px] font-code bg-muted/50" />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
