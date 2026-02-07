// @ts-nocheck
'use server';

import {
  aiBasedInsights,
  type AiBasedInsightsInput,
} from '@/ai/flows/ai-based-insights';
import {
  generateInvestorPitch,
  type InvestorPitchInput,
} from '@/ai/flows/investor-pitch-generator';
import {
  validateIdea,
  type IdeaValidationInput,
} from '@/ai/flows/idea-validator';

export async function getAiInsights(input: AiBasedInsightsInput) {
  try {
    const result = await aiBasedInsights(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate AI insights.' };
  }
}

export async function getInvestorPitch(input: InvestorPitchInput) {
  try {
    const result = await generateInvestorPitch(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to generate investor pitch.' };
  }
}

export async function getIdeaValidation(input: IdeaValidationInput) {
  try {
    const result = await validateIdea(input);
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return { success: false, error: 'Failed to get AI validation.' };
  }
}
