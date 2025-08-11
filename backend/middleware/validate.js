import { z } from 'zod';

const emailSchema = z.string().email('Invalid email format');
const requiredStringSchema = z.string().min(1, 'Field is required');

export const validateContact = (data) => {
  const schema = z.object({
    name: requiredStringSchema,
    email: emailSchema,
    message: requiredStringSchema,
    phone: z.string().optional(),
    subject: z.string().optional(),
  });
  return schema.safeParse(data);
};

export const validateVolunteer = (data) => {
  const schema = z.object({
    name: requiredStringSchema,
    email: emailSchema,
    phone: z.string().optional(),
    skills: z.string().optional(),
    opportunities: z.array(z.string()).optional(),
    message: z.string().optional(),
  });
  return schema.safeParse(data);
};

export const validatePartnership = (data) => {
  const schema = z.object({
    name: requiredStringSchema,
    email: emailSchema,
    phone: z.string().optional(),
    skills: z.string().optional(),
    partnershipInterests: z.array(z.string()).optional(),
    message: z.string().optional(),
  });
  return schema.safeParse(data);
};

export const validateNews = (data) => {
  const schema = z.object({
    title: requiredStringSchema,
    excerpt: requiredStringSchema,
    content: requiredStringSchema,
    date: z.string().datetime(),
    readTime: requiredStringSchema,
    category: requiredStringSchema,
    slug: requiredStringSchema,
    author: requiredStringSchema, // Added author validation
    tags: z.union([
      z.string(),
      z.array(z.string()),
      z.any().refine((val) => {
        try {
          const parsed = JSON.parse(val);
          return Array.isArray(parsed);
        } catch {
          return false;
        }
      }, 'Invalid tags format'),
    ]).optional(),
  });
  return schema.safeParse(data);
};