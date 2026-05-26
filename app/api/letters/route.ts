import { NextResponse } from 'next/server';
import { z, ZodError } from 'zod';
import { getSupabaseAdmin } from '@/lib/supabase';
import { sendAdminNotification } from '@/lib/brevo';

const LetterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(10).max(25),
  delivery_option: z.enum(['test_1min', 'test_2min', '1_year', '3_years', '5_years']),
  letter_content: z.string().min(50),
});

type LetterPayload = z.infer<typeof LetterSchema>;

function calculateDeliveryDate(option: LetterPayload['delivery_option']): string {
  const now = new Date();

  switch (option) {
    case 'test_1min':
      now.setMinutes(now.getMinutes() + 1);
      break;
    case 'test_2min':
      now.setMinutes(now.getMinutes() + 2);
      break;
    case '1_year':
      now.setFullYear(now.getFullYear() + 1);
      break;
    case '3_years':
      now.setFullYear(now.getFullYear() + 3);
      break;
    case '5_years':
      now.setFullYear(now.getFullYear() + 5);
      break;
  }

  return now.toISOString();
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = LetterSchema.parse(body);
    const scheduledDelivery = calculateDeliveryDate(validated.delivery_option);

    const supabaseAdmin = getSupabaseAdmin();
    const { error: insertError } = await supabaseAdmin.from('letters').insert([
      {
        name: validated.name,
        email: validated.email,
        age: validated.age,
        delivery_option: validated.delivery_option,
        letter_content: validated.letter_content,
        scheduled_delivery: scheduledDelivery,
        status: 'pending',
      },
    ]);

    if (insertError) {
      console.error('[Letters API] Supabase insert failed', insertError);
      return NextResponse.json(
        { success: false, error: 'Unable to save letter at this time' },
        { status: 500 }
      );
    }

    try {
      await sendAdminNotification({
        name: validated.name,
        email: validated.email,
        age: validated.age,
        deliveryOption: validated.delivery_option,
        scheduledDelivery,
      });
    } catch (notificationError) {
      console.error('[Letters API] Admin notification failed', notificationError);
    }

    return NextResponse.json({
      success: true,
      delivery_date: scheduledDelivery,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('[Letters API] Validation failed', error.issues);
      return NextResponse.json(
        { success: false, error: 'Invalid payload' },
        { status: 400 }
      );
    }

    console.error('[Letters API] Unexpected error', error);
    return NextResponse.json(
      { success: false, error: 'Server error, please try again later' },
      { status: 500 }
    );
  }
}
