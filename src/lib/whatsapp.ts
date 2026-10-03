import { siteConfig } from '@/config/site';

/**
 * Generate a prefilled WhatsApp link
 */
export function whatsappLink(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encoded}`;
}

/**
 * Default prefilled messages for different contexts
 */
export const defaultWhatsAppMessages = {
  general: "Hi Waadi Media, I'd like to talk about working together on a project.",
  hero: "Hi Waadi Media, I saw your website and would like to discuss my project.",
  service: (serviceName: string) =>
    `Hi Waadi Media, I'm interested in ${serviceName}. Can we talk?`,
  package: (packageName: string) =>
    `Hi Waadi Media, I'm interested in the ${packageName} package. Can we discuss next steps?`,
  calculator: (summaryText: string) =>
    `Hi Waadi Media, I used your pricing calculator:\n\n${summaryText}\n\nCan we discuss an exact quote?`,
  project: (projectName: string) =>
    `Hi Waadi Media, I saw your work on ${projectName} and would like something similar for my business.`,
  callBackup: "Hi Waadi Media, I want to book a call with your team.",
};
