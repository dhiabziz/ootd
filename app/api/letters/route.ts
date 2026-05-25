import { NextResponse } from 'next/server';
import { z } from 'zod';

const LetterSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().min(10).max(25),
  delivery_option: z.enum(['test_2min', '1_year', '3_years', '5_years']),
  letter_content: z.string().min(50),
});

function calculateDeliveryDate(option: string): string {
  const now = new Date();
  switch (option) {
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

    // MOCK: log payload (replace with Supabase insert + Resend email in production)
    console.log('[MOCK] New letter submission:', {
      ...validated,
      submitted_at: new Date().toISOString(),
      scheduled_delivery: calculateDeliveryDate(validated.delivery_option),
    });

    // MOCK: simulate admin notification email
    console.log(
      '[MOCK] Admin notification would be sent to: nabilajasmine6426@gmail.com'
    );

    return NextResponse.json({
      success: true,
      message: 'Letter saved successfully',
      delivery_date: calculateDeliveryDate(validated.delivery_option),
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }
}
