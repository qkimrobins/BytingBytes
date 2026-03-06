'use server';
/**
 * @fileOverview This file contains the AI-Based Insights flow, which provides smart suggestions for tasks,
 * milestones, or growth opportunities to founders, leveraging AI-driven insights.
 *
 * @exports aiBasedInsights - An async function to generate AI-driven insights.
 * @exports AiBasedInsightsInput - The input type for the aiBasedInsights function.
 * @exports AiBasedInsightsOutput - The output type for the aiBasedInsights function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AiBasedInsightsInputSchema = z.object({
  startupDescription: z
    .string()
    .describe('A detailed description of the startup, its goals, and current challenges.'),
  currentProgress: z
    .string()
    .describe('A summary of the startup\'s current progress and key metrics.'),
  industryTrends: z
    .string()
    .optional()
    .describe('Optional: Information about relevant industry trends and market conditions.'),
});
export type AiBasedInsightsInput = z.infer<typeof AiBasedInsightsInputSchema>;

const AiBasedInsightsOutputSchema = z.object({
  suggestions: z
    .array(z.string())
    .describe('A list of AI-driven suggestions for tasks, milestones, or growth opportunities.'),
  reasoning: z
    .string()
    .describe('The AI\'s reasoning behind the provided suggestions.'),
});
export type AiBasedInsightsOutput = z.infer<typeof AiBasedInsightsOutputSchema>;

export async function aiBasedInsights(input: AiBasedInsightsInput): Promise<AiBasedInsightsOutput> {
  return aiBasedInsightsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiBasedInsightsPrompt',
  input: {schema: AiBasedInsightsInputSchema},
  output: {schema: AiBasedInsightsOutputSchema},
  prompt: `You are an AI assistant providing strategic advice to startup founders.

  Based on the following information, provide a list of actionable suggestions to the founder.
  Focus on tasks, milestones, and growth opportunities that can help the startup succeed.

  Startup Description: {{{startupDescription}}}
  Current Progress: {{{currentProgress}}}
  Industry Trends: {{{industryTrends}}}

  Format your output as a list of suggestions, followed by a brief explanation of your reasoning.
  `, config: {
    safetySettings: [
      {
        category: 'HARM_CATEGORY_HATE_SPEECH',
        threshold: 'BLOCK_ONLY_HIGH',
      },
      {
        category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
        threshold: 'BLOCK_NONE',
      },
      {
        category: 'HARM_CATEGORY_HARASSMENT',
        threshold: 'BLOCK_MEDIUM_AND_ABOVE',
      },
      {
        category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
        threshold: 'BLOCK_LOW_AND_ABOVE',
      },
    ],
  },
});

const aiBasedInsightsFlow = ai.defineFlow(
  {
    name: 'aiBasedInsightsFlow',
    inputSchema: AiBasedInsightsInputSchema,
    outputSchema: AiBasedInsightsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
