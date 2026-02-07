'use server';
/**
 * @fileOverview An AI flow to validate a startup idea.
 *
 * - validateIdea - A function that validates a startup idea and provides feedback.
 * - IdeaValidationInput - The input type for the validateIdea function.
 * - IdeaValidationOutput - The output type for the validateIdea function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const IdeaValidationInputSchema = z.object({
  productIdea: z.string().describe('A detailed description of the product or service idea.'),
  targetAudience: z.string().describe('Who are the intended users or customers?'),
  uniqueSellingProposition: z.string().describe('What makes this idea unique or better than existing solutions?'),
});
export type IdeaValidationInput = z.infer<typeof IdeaValidationInputSchema>;

const IdeaValidationOutputSchema = z.object({
  validationSummary: z.string().describe('A concise summary of the AI\'s validation, including a general verdict (e.g., "Promising", "Needs Refinement", "High-Risk").'),
  strengths: z.array(z.string()).describe('A list of potential strengths of the idea.'),
  weaknesses: z.array(z.string()).describe('A list of potential weaknesses or risks associated with the idea.'),
  suggestions: z.array(z.string()).describe('A list of actionable suggestions for improvement or next steps.'),
});
export type IdeaValidationOutput = z.infer<typeof IdeaValidationOutputSchema>;

export async function validateIdea(input: IdeaValidationInput): Promise<IdeaValidationOutput> {
  return ideaValidatorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'ideaValidatorPrompt',
  input: {schema: IdeaValidationInputSchema},
  output: {schema: IdeaValidationOutputSchema},
  prompt: `You are an experienced startup advisor and venture capitalist. Your task is to provide a candid, constructive validation of a new startup idea.

  Analyze the provided information and generate a detailed assessment. Be realistic and critical, but also constructive.

  Startup Idea Details:
  - Product/Service Idea: {{{productIdea}}}
  - Target Audience: {{{targetAudience}}}
  - Unique Selling Proposition: {{{uniqueSellingProposition}}}

  Your assessment should include:
  1.  A clear summary of your validation with a concluding verdict.
  2.  A bulleted list of the idea's key strengths.
  3.  A bulleted list of the idea's most significant weaknesses and potential risks.
  4.  A bulleted list of concrete, actionable suggestions for the founder to improve the idea or to validate it further.
  `,
});

const ideaValidatorFlow = ai.defineFlow(
  {
    name: 'ideaValidatorFlow',
    inputSchema: IdeaValidationInputSchema,
    outputSchema: IdeaValidationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
