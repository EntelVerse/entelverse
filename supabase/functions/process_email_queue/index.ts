import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3'

// Initialize Supabase client with service role key for admin privileges
const supabaseUrl = Deno.env.get('VITE_SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('VITE_SUPABASE_SERVICE_ROLE')!;
const verifyEmailPassword = Deno.env.get('VERIFYEMAIL_PASSWORD')!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

interface EmailQueueItem {
  id: string;
  recipient: string;
  subject: string;
  body: string;
  status: 'pending' | 'sent' | 'failed';
  created_at: string;
  attempts: number;
  error?: string;
  priority: 'high' | 'normal' | 'low';
  processing_started_at?: string;
}

async function sendEmail(recipient: string, subject: string, body: string): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${verifyEmailPassword}`,
      },
      body: JSON.stringify({
        from: 'EntelVerse <noreply@entelverse.com>',
        to: recipient,
        subject: subject,
        html: body,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Email API error:', errorData);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Error sending email:', error);
    return false;
  }
}

async function processEmailQueue() {
  try {
    // Get pending emails that haven't exceeded max attempts
    const { data: emails, error: fetchError } = await supabase
      .from('email_queue')
      .select('*')
      .eq('status', 'pending')
      .is('processing_started_at', null)
      .lt('attempts', 3)
      .order('priority', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(10);

    if (fetchError) {
      console.error('Error fetching emails:', fetchError);
      return { processed: 0, success: 0, failed: 0 };
    }

    if (!emails || emails.length === 0) {
      return { processed: 0, success: 0, failed: 0 };
    }

    let successCount = 0;
    let failedCount = 0;

    for (const email of emails as EmailQueueItem[]) {
      try {
        // Mark as processing
        const { error: updateError } = await supabase
          .from('email_queue')
          .update({ 
            processing_started_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          })
          .eq('id', email.id)
          .eq('status', 'pending')
          .is('processing_started_at', null);

        if (updateError) {
          console.error(`Error marking email ${email.id} as processing:`, updateError);
          continue;
        }

        // Attempt to send email
        const success = await sendEmail(
          email.recipient,
          email.subject,
          email.body
        );

        if (success) {
          // Mark as sent
          await supabase
            .from('email_queue')
            .update({ 
              status: 'sent',
              updated_at: new Date().toISOString(),
              processing_started_at: null
            })
            .eq('id', email.id);
          successCount++;
        } else {
          // Increment attempts and mark as failed if max attempts reached
          const newAttempts = (email.attempts || 0) + 1;
          const status = newAttempts >= 3 ? 'failed' : 'pending';
          await supabase
            .from('email_queue')
            .update({ 
              status,
              attempts: newAttempts,
              error: 'Failed to send email',
              updated_at: new Date().toISOString(),
              processing_started_at: null
            })
            .eq('id', email.id);
          failedCount++;
        }
      } catch (error) {
        console.error(`Error processing email ${email.id}:`, error);
        // Reset processing status on error
        await supabase
          .from('email_queue')
          .update({ 
            processing_started_at: null,
            updated_at: new Date().toISOString(),
            error: error.message
          })
          .eq('id', email.id);
        failedCount++;
      }
    }

    return {
      processed: emails.length,
      success: successCount,
      failed: failedCount
    };
  } catch (error) {
    console.error('Error in processEmailQueue:', error);
    throw error;
  }
}

// Define CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type'
};

// Handle incoming requests with CORS support
Deno.serve(async (req) => {
  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: corsHeaders
    });
  }

  // Verify authorization
  const authHeader = req.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return new Response(JSON.stringify({ error: 'Missing or invalid authorization header' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const token = authHeader.split(' ')[1];
  if (token !== supabaseServiceKey) {
    return new Response(JSON.stringify({ error: 'Invalid authorization token' }), {
      status: 403,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
  
  try {
    if (req.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405, 
        headers: corsHeaders 
      });
    }

    const result = await processEmailQueue();
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Error processing request:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
});