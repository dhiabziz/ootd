import { NextResponse } from 'next/server';
import { z } from 'zod';

const ConsultSchema = z.object({
  umur: z.number().min(12).max(25),
  jenis_kelamin: z.enum(['Perempuan', 'Laki-laki']),
  nomor_telepon: z.string().min(10),
  pendidikan: z.enum(['SD', 'SMP', 'SMA/SMK', 'Lainnya']),
  topik: z.string().optional(),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = ConsultSchema.parse(body);

    // MOCK: log payload
    console.log('New consultation request:', {
      ...validated,
      submitted_at: new Date().toISOString(),
    });
    console.log(
      'Admin notification would be sent to: nabilajasmine6426@gmail.com'
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Invalid payload' },
      { status: 400 }
    );
  }
}
