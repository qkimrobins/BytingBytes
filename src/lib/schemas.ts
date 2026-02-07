import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

export const signupSchema = z
  .object({
    fullName: z.string().min(1, { message: 'Full name is required.' }),
    email: z.string().email({ message: 'Please enter a valid email.' }),
    password: z.string().min(8, { message: 'Password must be at least 8 characters long.' }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match.",
    path: ['confirmPassword'],
  });

export const aiInsightsSchema = z.object({
    startupDescription: z.string().min(10, { message: 'Please provide a more detailed description.' }),
    currentProgress: z.string().min(10, { message: 'Please provide more details on your progress.' }),
    industryTrends: z.string().optional(),
});

export const investorPitchSchema = z.object({
    startupName: z.string().min(1, { message: 'Startup name is required.' }),
    problem: z.string().min(10, { message: 'Please describe the problem in more detail.' }),
    solution: z.string().min(10, { message: 'Please describe your solution in more detail.' }),
    traction: z.string().min(10, { message: 'Please provide more details on your traction.' }),
    roadmap: z.string().min(10, { message: 'Please provide more details on your roadmap.' }),
});

export const taskSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  tag: z.string().min(1, { message: 'Tag is required.' }),
  status: z.string().min(1, { message: 'Status is required.' }),
});

export const editProfileSchema = z.object({
  fullName: z.string().min(1, { message: 'Full name is required.' }),
});

export const ideaValidationSchema = z.object({
  productIdea: z.string().min(20, { message: 'Please provide a more detailed product idea.' }),
  targetAudience: z.string().min(10, { message: 'Please describe your target audience.' }),
  uniqueSellingProposition: z.string().min(10, { message: 'What is your unique selling proposition?' }),
});
