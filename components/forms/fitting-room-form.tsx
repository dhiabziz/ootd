'use client';

import * as React from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
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

const ConsultSchema = z.object({
  umur: z
    .number()
    .min(12, 'Umur minimal 12 tahun')
    .max(25, 'Umur maksimal 25 tahun'),
  jenis_kelamin: z.enum(['Perempuan', 'Laki-laki'] as const),
  nomor_telepon: z.string().min(10, 'Nomor telepon minimal 10 digit'),
  pendidikan: z.enum(['SD', 'SMP', 'SMA/SMK', 'Lainnya'] as const),
  topik: z.string().optional(),
});

type ConsultFormValues = z.infer<typeof ConsultSchema>;

const WHATSAPP_NUMBER = '6289616602357';

export function FittingRoomForm() {
  const [submitting, setSubmitting] = React.useState(false);
  const [success, setSuccess] = React.useState<ConsultFormValues | null>(null);

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<ConsultFormValues>({
    resolver: zodResolver(ConsultSchema),
    defaultValues: {
      umur: undefined as unknown as number,
      jenis_kelamin: undefined,
      nomor_telepon: '',
      pendidikan: undefined,
      topik: '',
    },
  });

  const onSubmit = async (data: ConsultFormValues) => {
    setSubmitting(true);
    try {
      const res = await fetch('/api/fitting-room', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        throw new Error(json.error || 'Gagal mengirim data');
      }
      setSuccess(data);
      toast.success('📧 Notifikasi telah dikirim ke admin (mock)');
      reset();
    } catch (err) {
      toast.error('Terjadi kesalahan. Silakan coba lagi.');
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    if (!success) return;
    const message = `Halo OOTD, saya ingin konsultasi via Fitting Room.\n\nUmur: ${success.umur}\nJenis Kelamin: ${success.jenis_kelamin}\nPendidikan: ${success.pendidikan}\nTopik: ${success.topik || '(tidak diisi)'}`;
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
    setSuccess(null);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-3xl shadow-lg border border-neutral-100 p-6 sm:p-8 md:p-10 space-y-6"
        noValidate
      >
        {/* Umur */}
        <div className="space-y-2">
          <Label htmlFor="umur">Umur</Label>
          <Input
            id="umur"
            type="number"
            min={12}
            max={25}
            placeholder="Contoh: 15"
            aria-invalid={!!errors.umur}
            {...register('umur', { valueAsNumber: true })}
          />
          {errors.umur && (
            <p className="text-xs text-primary-700">{errors.umur.message}</p>
          )}
        </div>

        {/* Jenis Kelamin */}
        <div className="space-y-3">
          <Label>Jenis Kelamin</Label>
          <Controller
            control={control}
            name="jenis_kelamin"
            render={({ field }) => (
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                className="grid grid-cols-2 gap-3"
              >
                {(['Perempuan', 'Laki-laki'] as const).map((value) => {
                  const id = `jk-${value.toLowerCase()}`;
                  const checked = field.value === value;
                  return (
                    <label
                      key={value}
                      htmlFor={id}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                        checked
                          ? 'border-primary-500 bg-primary-50'
                          : 'border-neutral-200 hover:border-primary-300 hover:bg-primary-50/50'
                      }`}
                    >
                      <RadioGroupItem value={value} id={id} />
                      <span className="text-sm font-medium text-neutral-900">
                        {value}
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>
            )}
          />
          {errors.jenis_kelamin && (
            <p className="text-xs text-primary-700">
              {errors.jenis_kelamin.message}
            </p>
          )}
        </div>

        {/* Nomor Telepon */}
        <div className="space-y-2">
          <Label htmlFor="phone">Nomor Telepon</Label>
          <Input
            id="phone"
            type="tel"
            placeholder="08xxxxxxxxxx"
            aria-invalid={!!errors.nomor_telepon}
            {...register('nomor_telepon')}
          />
          <p className="text-xs text-neutral-500">
            Untuk verifikasi awal sebelum diskusi
          </p>
          {errors.nomor_telepon && (
            <p className="text-xs text-primary-700">
              {errors.nomor_telepon.message}
            </p>
          )}
        </div>

        {/* Pendidikan */}
        <div className="space-y-2">
          <Label htmlFor="pendidikan">Pendidikan Terakhir</Label>
          <Controller
            control={control}
            name="pendidikan"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger id="pendidikan">
                  <SelectValue placeholder="Pilih pendidikan terakhir" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="SD">SD</SelectItem>
                  <SelectItem value="SMP">SMP</SelectItem>
                  <SelectItem value="SMA/SMK">SMA/SMK</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.pendidikan && (
            <p className="text-xs text-primary-700">
              {errors.pendidikan.message}
            </p>
          )}
        </div>

        {/* Topik */}
        <div className="space-y-2">
          <Label htmlFor="topik">
            Topik yang ingin dibicarakan{' '}
            <span className="text-neutral-500 font-normal">(opsional)</span>
          </Label>
          <Textarea
            id="topik"
            placeholder="Ceritakan singkat apa yang ingin kamu bagikan..."
            {...register('topik')}
          />
        </div>

        <Button
          type="submit"
          size="lg"
          className="w-full h-14 text-base"
          disabled={submitting}
        >
          {submitting ? (
            <>
              <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              Memproses...
            </>
          ) : (
            <>Lanjut ke WhatsApp →</>
          )}
        </Button>
      </form>

      <Dialog
        open={!!success}
        onOpenChange={(open) => {
          if (!open) setSuccess(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <div className="flex justify-center mb-2">
              <div className="bg-primary-100 rounded-full p-5">
                <CheckCircle2 className="h-9 w-9 text-primary-600" />
              </div>
            </div>
            <DialogTitle className="text-center pt-2">
              Data Tersimpan ✓
            </DialogTitle>
            <DialogDescription className="text-center pt-2">
              Terima kasih sudah percaya pada kami. Klik tombol di bawah untuk
              melanjutkan percakapan via WhatsApp.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-2 mt-2">
            <Button size="lg" onClick={openWhatsApp}>
              Buka WhatsApp →
            </Button>
            <Button
              variant="ghost"
              size="lg"
              onClick={() => setSuccess(null)}
            >
              Batal
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
