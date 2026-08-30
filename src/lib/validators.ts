import { z } from 'zod';

export const AnalyzeRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter a URL')
    .url('Please enter a valid URL')
    .refine((val) => {
      try {
        const parsed = new URL(val);
        return ['http:', 'https:'].includes(parsed.protocol);
      } catch {
        return false;
      }
    }, 'Only HTTP and HTTPS URLs are supported'),
});

export const DownloadRequestSchema = z.object({
  url: z
    .string()
    .trim()
    .min(1, 'Please enter a URL')
    .url('Please enter a valid URL'),
  format: z.enum(['mp4', 'mp3']),
  quality: z
    .string()
    .min(1, 'Quality must be specified'),
});

export type AnalyzeRequestInput = z.infer<typeof AnalyzeRequestSchema>;
export type DownloadRequestInput = z.infer<typeof DownloadRequestSchema>;
