'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { getIdeaValidation } from '@/app/actions/ai';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2, Loader2, ServerCrash, Sparkles, ThumbsDown, ThumbsUp } from 'lucide-react';
import type { IdeaValidationOutput } from '@/ai/flows/idea-validator';
import { ideaValidationSchema } from '@/lib/schemas';

export function IdeaValidatorForm() {
  const [result, setResult] = useState<IdeaValidationOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof ideaValidationSchema>>({
    resolver: zodResolver(ideaValidationSchema),
    defaultValues: {
      productIdea: '',
      targetAudience: '',
      uniqueSellingProposition: '',
    },
  });

  async function onSubmit(values: z.infer<typeof ideaValidationSchema>) {
    setIsLoading(true);
    setResult(null);
    setError(null);
    const response = await getIdeaValidation(values);
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
            name="productIdea"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product/Service Idea</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your core product or service idea. What is it, and who is it for?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="targetAudience"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Target Audience</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe your ideal customer. Be as specific as possible." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="uniqueSellingProposition"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unique Selling Proposition (USP)</FormLabel>
                <FormControl>
                  <Textarea placeholder="What makes your idea unique? Why will customers choose you over competitors?" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Validating...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Validate My Idea
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
                <CheckCircle2 className="text-primary" />
                Validation Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{result.validationSummary}</p>
            </CardContent>
          </Card>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <ThumbsUp className="text-chart-1" />
                  Strengths
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {result.strengths.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 font-headline">
                  <ThumbsDown className="text-destructive" />
                  Weaknesses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {result.weaknesses.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline">
                <Sparkles className="text-accent" />
                Suggestions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc space-y-2 pl-5">
                {result.suggestions.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
