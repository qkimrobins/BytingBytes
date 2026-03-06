'use server';

/**
 * @fileOverview Investor Pitch Generator AI agent.
 *
 * - generateInvestorPitch - A function that handles the investor pitch generation process.
 * - InvestorPitchInput - The input type for the generateInvestorPitch function.
 * - InvestorPitchOutput - The return type for the generateInvestorPitch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const InvestorPitchInputSchema = z.object({
  startupName: z.string().describe('The name of the startup.'),
  problem: z.string().describe('The problem the startup is solving.'),
  solution: z.string().describe('The solution the startup offers.'),
  traction: z.string().describe('The traction the startup has achieved so far.'),
  roadmap: z.string().describe('The future roadmap of the startup.'),
});
export type InvestorPitchInput = z.infer<typeof InvestorPitchInputSchema>;

const InvestorPitchOutputSchema = z.object({
  pitchOutline: z.string().describe('The generated investor pitch outline.'),
});
export type InvestorPitchOutput = z.infer<typeof InvestorPitchOutputSchema>;

export async function generateInvestorPitch(input: InvestorPitchInput): Promise<InvestorPitchOutput> {
  return investorPitchGeneratorFlow(input);
}

const prompt = ai.definePrompt({
  name: 'investorPitchGeneratorPrompt',
  input: {schema: InvestorPitchInputSchema},
  output: {schema: InvestorPitchOutputSchema},
  prompt: `You are an expert in creating investor pitch outlines.

  Based on the following startup data, generate a compelling investor pitch outline.

  Startup Name: {{{startupName}}}
  Problem: {{{problem}}}
  Solution: {{{solution}}}
  Traction: {{{traction}}}
  Roadmap: {{{roadmap}}}
  `,
});

const investorPitchGeneratorFlow = ai.defineFlow(
  {
    name: 'investorPitchGeneratorFlow',
    inputSchema: InvestorPitchInputSchema,
    outputSchema: InvestorPitchOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
