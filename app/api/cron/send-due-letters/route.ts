import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendLetterEmail } from '@/lib/brevo';

type PendingLetter = {
  id: string;
  name: string;
  email: string;
  age: number;
  delivery_option: string;
  letter_content: string;
  scheduled_delivery: string;
  created_at: string;
};

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization') ?? '';
  const secret = process.env.CRON_SECRET ?? '';

  if (authHeader !== `Bearer ${secret}`) {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  const supabaseAdmin = getSupabaseAdmin();
  const nowIso = new Date().toISOString();
  const { data, error } = await supabaseAdmin
    .from('letters')
    .select(
      'id, name, email, age, delivery_option, letter_content, scheduled_delivery, created_at'
    )
    .eq('status', 'pending')
    .lte('scheduled_delivery', nowIso)
    .order('scheduled_delivery', { ascending: true })
    .limit(50);

  if (error) {
    console.error('[Cron] failed to query pending letters', error);
    return NextResponse.json(
      { processed: 0, sent: 0, failed: 0, error: 'Unable to retrieve due letters' },
      { status: 500 }
    );
  }

  const letters = data as PendingLetter[] | null;
  if (!letters || letters.length === 0) {
    return NextResponse.json({ processed: 0, sent: 0, failed: 0 });
  }

  const results = await Promise.allSettled(
    letters.map(async (letter) => {
      try {
        await sendLetterEmail({
          to: letter.email,
          name: letter.name,
          letterContent: letter.letter_content,
          originalDate: letter.created_at,
        });

        const { error: updateError } = await supabaseAdmin
          .from('letters')
          .update({ status: 'sent', sent_at: new Date().toISOString() })
          .eq('id', letter.id);

        if (updateError) {
          throw updateError;
        }

        return 'sent' as const;
      } catch (sendError) {
        console.error(`[Cron] failed to send letter ${letter.id}`, sendError);

        await supabaseAdmin
          .from('letters')
          .update({ status: 'failed' })
          .eq('id', letter.id);

        return 'failed' as const;
      }
    })
  );

  const processed = results.length;
  const sent = results.filter(
    (result) => result.status === 'fulfilled' && result.value === 'sent'
  ).length;
  const failed = results.filter(
    (result) => result.status === 'fulfilled' && result.value === 'failed'
  ).length;

  return NextResponse.json({ processed, sent, failed });
}
