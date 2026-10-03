export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  business: string;
  role?: string;
  projectSlug?: string;
};

/**
 * Hard Rule 1: Never invent facts or testimonials.
 * Real testimonials will be added here once provided by the owner.
 * If empty, testimonials sections on pages will automatically hide themselves.
 */
export const testimonialsData: Testimonial[] = [];
