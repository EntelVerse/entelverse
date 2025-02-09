// /src/lib/email.ts
import { supabase } from './supabase';

interface EmailOptions {
  recipient: string;
  subject: string;
  body: string;
  priority?: 'high' | 'normal' | 'low';
}

interface ProcessingResult {
  processed: number;
  success: number;
  failed: number;
}

/**
 * Queues an email to be sent by the background worker.
 */
export async function queueEmail({ recipient, subject, body, priority = 'normal' }: EmailOptions) {
  try {
    const { data, error } = await supabase
      .from('email_queue')
      .insert([
        {
          recipient,
          subject,
          body,
          priority,
          status: 'pending',
          attempts: 0
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('Failed to queue email:', error);
      return null;
    }
    return data;
  } catch (error) {
    console.error('Failed to queue email:', error);
    return null;
  }
}

/**
 * Triggers the email queue processing by calling the Supabase Edge Function.
 */
export async function processEmailQueue(): Promise<ProcessingResult | null> {
  try {
    // Get the function URL from environment variable
    const functionUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/process_email_queue`;
    
    // Get the service role key for processing
    const serviceRoleKey = import.meta.env.VITE_SUPABASE_SERVICE_ROLE;
    
    if (!serviceRoleKey) {
      throw new Error('Service role key not found');
    }

    const response = await fetch(functionUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${serviceRoleKey}`
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to process email queue: ${errorText}`);
    }

    const result = await response.json();
    return result as ProcessingResult;
  } catch (error) {
    console.error('Error triggering email queue processing:', error);
    return null;
  }
}

/**
 * Queues an email and immediately triggers processing.
 */
export async function queueAndProcessEmail(options: EmailOptions) {
  try {
    // First, queue the email
    const queuedEmail = await queueEmail(options);
    if (!queuedEmail) {
      throw new Error('Failed to queue email');
    }

    // Then trigger processing with retries
    let attempts = 0;
    const maxAttempts = 3;
    let processingResult = null;

    while (attempts < maxAttempts) {
      try {
        processingResult = await processEmailQueue();
        if (processingResult) break;
      } catch (error) {
        console.warn(`Processing attempt ${attempts + 1} failed:`, error);
      }
      attempts++;
      if (attempts < maxAttempts) {
        await new Promise(resolve => setTimeout(resolve, 1000 * attempts)); // Exponential backoff
      }
    }

    return {
      queued: true,
      emailId: queuedEmail.id,
      processingResult,
      attempts
    };
  } catch (error) {
    console.error('Error in queueAndProcessEmail:', error);
    return {
      queued: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      attempts: 0
    };
  }
}