import { z } from 'zod';

export const indianPhoneRegex = /^(?:\+91|91)?[6-9]\d{9}$/;

export const budgetOptions = [
  'Under ₹10,000',
  '₹10,000 to ₹25,000',
  '₹25,000 to ₹60,000',
  '₹60,000+',
  'Not sure',
] as const;

export const contactFormSchema = z.object({
  name: z.string().trim().min(1, 'Enter your name'),
  phone: z.string().trim().regex(indianPhoneRegex, 'Enter a 10-digit phone number'),
  email: z.string().trim().email('Enter a valid email').optional().or(z.literal('')),
  services: z.array(z.string()),
  budget: z.string(),
  message: z
    .string()
    .trim()
    .min(10, 'Tell us a little about your business (at least 10 characters)')
    .max(2000, 'Message cannot exceed 2000 characters'),
  honeypot: z.string().max(0, 'Spam detected'),
  loadTimestamp: z.number().optional(),
  sourcePage: z.string().optional(),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
