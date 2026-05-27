'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

const LetterSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid'),
  age: z
    .number()
    .min(10, 'Usia minimal 10 tahun')
    .max(25, 'Usia maksimal 25 tahun'),
  delivery_option: z.enum(['test_1min', 'test_2min', '1_year', '3_years', '5_years']),
  letter_content: z.string().min(50, 'Isi surat minimal 50 karakter'),
});

type LetterFormValues = z.infer<typeof LetterSchema>;

const deliveryLabels: Record<LetterFormValues['delivery_option'], string> = {
  test_1min: '1 menit lagi (mode testing)',
  test_2min: '2 menit lagi (mode testing)',
  '1_year': '1 tahun lagi',
  '3_years': '3 tahun lagi',
  '5_years': '5 tahun lagi',
};

function getSuccessDialogMessage(option: LetterFormValues['delivery_option']) {
  switch (option) {
    case 'test_1min':
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu dalam beberapa saat.';
    case 'test_2min':
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu dalam beberapa menit.';
    case '1_year':
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu sekitar setahun lagi. Sampai jumpa di masa depan! 🌱';
    case '3_years':
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu sekitar 3 tahun lagi. Sampai jumpa di masa depan! 🌱';
    case '5_years':
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu sekitar 5 tahun lagi. Sampai jumpa di masa depan! 🌱';
    default:
      return 'Suratmu udah aman tersimpan ✨ Akan dikirim ke email kamu sesuai jadwal yang kamu pilih.';
  }
}

export function LetterForm() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<{
    name: string;
    email: string;
    delivery_option: LetterFormValues['delivery_option'];
  } | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<LetterFormValues>({
    resolver: zodResolver(LetterSchema),
    defaultValues: {
      name: '',
      email: '',
      age: undefined as unknown as number,
      delivery_option: '1_year',
      letter_content: '',
    },
  });

  const onSubmit = async (data: LetterFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/letters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal mengirim surat');
      }
      setSuccess({
        name: data.name,
        email: data.email,
        delivery_option: data.delivery_option,
      });
      toast.success('📧 Notifikasi telah dikirim ke admin');
      reset();
    } catch (err) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-lg border border-neutral-100 p-6 sm:p-8 md:p-10 space-y-6"
        noValidate
      >
        {/* Nama */}
        <div className="space-y-2">
          <Label htmlFor="name">Nama</Label>
          <Input
            id="name"
            placeholder="Nama lengkapmu"
            aria-invalid={!!errors.name}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-xs text-primary-700">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="kamu@email.com"
            aria-invalid={!!errors.email}
            {...register('email')}
          />
          <p className="text-xs text-neutral-500">
            Surat akan dikirim ke email ini saat waktunya tiba
          </p>
          {errors.email && (
            <p className="text-xs text-primary-700">{errors.email.message}</p>
          )}
        </div>

        {/* Usia */}
        <div className="space-y-2">
          <Label htmlFor="age">Usia saat ini</Label>
          <Input
            id="age"
            type="number"
            min={10}
            max={25}
            placeholder="Contoh: 16"
            aria-invalid={!!errors.age}
            {...register('age', { valueAsNumber: true })}
          />
          {errors.age && (
            <p className="text-xs text-primary-700">{errors.age.message}</p>
          )}
        </div>

        {/* Delivery option */}
        <div className="space-y-2">
          <Label htmlFor="delivery">Kirim suratku kepada diriku</Label>
          <Controller
            control={control}
            name="delivery_option"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="delivery">
                  <SelectValue placeholder="Pilih waktu pengiriman" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="test_1min">
                    🧪 1 menit lagi (mode testing)
                  </SelectItem>
                  <SelectItem value="test_2min">
                    🧪 2 menit lagi (mode testing)
                  </SelectItem>
                  <SelectItem value="1_year">1 tahun lagi</SelectItem>
                  <SelectItem value="3_years">3 tahun lagi</SelectItem>
                  <SelectItem value="5_years">5 tahun lagi</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          <p className="text-xs text-neutral-500">
            Pengiriman dilakukan dengan upaya terbaik kami. Pastikan emailmu
            masih aktif di tahun yang dipilih.
          </p>
        </div>

        {/* Letter content */}
        <div className="space-y-2">
          <Label htmlFor="letter">Isi Surat</Label>
          <Textarea
            id="letter"
            className="min-h-[320px]"
            placeholder={`Dear me di masa depan,\n\nSemoga kamu masih ingat janji ini...`}
            aria-invalid={!!errors.letter_content}
            {...register('letter_content')}
          />
          {errors.letter_content && (
            <p className="text-xs text-primary-700">
              {errors.letter_content.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-base"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Mengirim...
            </>
          ) : (
            <>Kirim ke Masa Depan ✉️</>
          )}
        </Button>
      </form>

      {/* Success modal */}
      <Dialog
        open={!!success}
        onOpenChange={(open) => {
          if (!open) setSuccess(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <div className="relative">
                <div className="absolute inset-0 bg-primary-200 rounded-full blur-xl opacity-60 animate-sparkle" />
                <div className="relative bg-primary-100 rounded-full p-5">
                  <Sparkles className="h-8 w-8 text-primary-600" />
                </div>
              </div>
            </div>
            <DialogTitle className="text-center pt-2">
              Suratmu Telah Tersimpan ✨
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              {success && (
                <>
                  {getSuccessDialogMessage(success.delivery_option)}
                  <br />
                  <span className="text-neutral-900 font-semibold">
                    {success.email}
                  </span>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <p className="text-center text-sm italic text-neutral-500 px-2">
            Simpan momen ini. Kamu sedang membangun versi terbaik dari dirimu.
          </p>
          <Button
            className="w-full mt-2"
            size="lg"
            onClick={() => {
              setSuccess(null);
              router.push('/');
            }}
          >
            Kembali ke Beranda
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
