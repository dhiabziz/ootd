# OOTD — Our Own Tomorrow Dreams

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyour-username%2Footd)

Platform digital edukasi pernikahan dini untuk remaja Indonesia (usia 12–18 tahun). Dibangun dengan Next.js 14 App Router, TypeScript, Tailwind CSS, dan shadcn/ui.

> _"Platform digital untuk membantu remaja Indonesia memahami kesiapan sebelum melangkah — karena masa depan tidak bisa diulang."_

---

## ✨ Fitur

### Halaman Landing (`/`)
- **Hero** editorial-modern dengan headline besar "Iya, aku mau."
- **Legal Guide** — Statistik pernikahan dini di Indonesia (UNICEF, BPS), bar chart top 5 provinsi, dan timeline regulasi (UU 1/1974 → UU 16/2019 → era pandemi).
- **Yakin Siap Nikah?** — Accordion 6 aspek kesiapan (usia, fisik, mental, finansial, sosial, perencanaan keluarga) berdasarkan rekomendasi BKKBN.
- **Behind the Aesthetic Marriage** — Dampak personal & sosial pernikahan dini, dengan sumber jurnal & UNICEF.
- **Start From Yourself** — Dua CTA ke fitur interaktif.

### Halaman `/dear-future-fit`
Time capsule simbolis. Form lengkap (nama, email, usia, jadwal pengiriman 2 menit / 1 / 3 / 5 tahun, isi surat 50+ karakter) dengan validasi Zod, success dialog animatif, dan mock API.

### Halaman `/fitting-room`
Konsultasi anonim. Form (umur, jenis kelamin, telepon, pendidikan, topik opsional) → success dialog → buka WhatsApp dengan pesan terformat ke `+62 896-1660-2357`.

---

## 🛠 Tech Stack

| Layer | Tools |
| --- | --- |
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS 3 + custom design tokens |
| UI Primitives | Radix UI + shadcn/ui patterns |
| Forms | react-hook-form + Zod resolver |
| Animations | Framer Motion (subtle fade-in-up on scroll) |
| Notifications | Sonner toast |
| Icons | lucide-react |
| Font | Plus Jakarta Sans (via `next/font`) |

---

## 🎨 Design System

**Palette** — Monochromatic pink + warm cream neutrals.

```ts
primary: 50 → 900   // #FDF2F4 → #4A222C (main: 500/600)
neutral: 50 → 900   // #FBF8F4 cream → #2D2D2D charcoal
```

**Typography** — Single family (Plus Jakarta Sans), hierarchy via weight/size/tracking. Base 16px mobile, 18px desktop, line-height 1.7.

**Spacing** — Container max 1200px, py-20–32 between sections, generous whitespace.

**Motion** — `framer-motion` fade-in-up (0.5s ease, once), bouncing scroll indicator. No parallax, no flashy effects.

---

## 🚀 Local Setup

### Prerequisites
- Node.js 18.17+ (atau 20+)
- pnpm (rekomendasi), npm, atau yarn

### Install & Run

```bash
# Clone repo
git clone <your-repo-url>
cd ootd

# Install dependencies
pnpm install
# atau: npm install

# Start dev server
pnpm dev
# atau: npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

### Build untuk Production

```bash
pnpm build
pnpm start
```

---

## ☁️ Deploy ke Vercel

### One-click deploy
Klik badge "Deploy with Vercel" di atas — Vercel akan auto-detect Next.js dan build otomatis. Tidak butuh konfigurasi tambahan.

### Manual via CLI

```bash
npm install -g vercel
vercel
```

### Manual via Dashboard
1. Push repo ke GitHub/GitLab/Bitbucket.
2. Buka [vercel.com/new](https://vercel.com/new).
3. Import repo → Framework auto-detect sebagai "Next.js" → klik **Deploy**.
4. Selesai. Tidak ada env variable yang wajib untuk versi mock.

---

## 📂 Struktur Folder

```
app/
├── api/
│   ├── letters/route.ts          # POST mock surat masa depan
│   └── fitting-room/route.ts     # POST mock konsultasi
├── dear-future-fit/page.tsx      # Halaman form surat
├── fitting-room/page.tsx         # Halaman form konsultasi
├── layout.tsx                    # Root layout + font + metadata
├── page.tsx                      # Landing (compose 5 sections)
└── globals.css                   # Tailwind directives + base styles

components/
├── ui/                           # Primitives (button, input, accordion, dialog, ...)
├── layout/                       # Header (sticky + drawer), Footer
├── sections/                     # 5 sections halaman landing
├── forms/                        # LetterForm, FittingRoomForm (RHF + Zod)
└── fade-in.tsx                   # Reusable framer-motion wrapper

lib/
└── utils.ts                      # cn() helper (clsx + tailwind-merge)

public/
└── favicon.svg                   # Favicon "O" pink-600

tailwind.config.ts                # Custom tokens (primary/neutral palette)
```

---

## 🔌 Roadmap: Plug Real Backend

API routes saat ini berupa **mock** — payload divalidasi via Zod lalu `console.log`-ed. Untuk produksi nyata:

### 1. Persistensi data → **Supabase**
```bash
pnpm add @supabase/supabase-js
```
Di `app/api/letters/route.ts`, ganti `console.log` dengan:
```ts
import { createClient } from '@supabase/supabase-js';
const supabase = createClient(
  process.env.SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

await supabase.from('letters').insert({
  ...validated,
  scheduled_delivery: calculateDeliveryDate(validated.delivery_option),
});
```

Tabel `letters` dan `fitting_room_requests` perlu dibuat manual di Supabase dashboard.

### 2. Pengiriman email → **Gmail SMTP via Nodemailer**
```bash
pnpm add nodemailer
```
```ts
import { createTransport } from 'nodemailer';

const transporter = createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER!,
    pass: process.env.GMAIL_APP_PASSWORD!,
  },
});

await transporter.sendMail({
  from: `"${process.env.MAIL_SENDER_NAME!}" <${process.env.GMAIL_USER!}>`,
  to: 'nabilajasmine6426@gmail.com',
  subject: '📩 [OOTD] Surat baru dari Dear Future Fit',
  html: `<p>Nama: ${validated.name}</p>...`,
});
```

### 3. Penjadwalan pengiriman surat → **Cron eksternal**
Buat endpoint `/api/cron/send-due-letters` yang query Supabase untuk `scheduled_delivery <= now()` dan kirim via Gmail SMTP.
> Untuk setup manual, gunakan layanan cron eksternal seperti cron-job.org dan panggil endpoint tersebut sekali sehari.

### 4. Env vars yang dibutuhkan
```env
SUPABASE_URL=...
SUPABASE_SERVICE_ROLE_KEY=...
GMAIL_USER=ootdproject123@gmail.com
GMAIL_APP_PASSWORD=...
MAIL_SENDER_NAME=OOTD Project
ADMIN_EMAIL=...
CRON_SECRET=...
```

---

## Backend Wiring (Production Mode)

Fitur `Dear Future Fit` sekarang sudah wired ke backend nyata:
- data surat disimpan di tabel Supabase `letters`
- notifikasi admin dikirim lewat Gmail SMTP via Nodemailer
- pengiriman surat terjadwal diproses melalui cron endpoint `/api/cron/send-due-letters`

### Env vars di Vercel dashboard
Tambahkan semua variabel ini ke project Vercel kamu:
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GMAIL_USER`
- `GMAIL_APP_PASSWORD`
- `MAIL_SENDER_NAME`
- `ADMIN_EMAIL`
- `CRON_SECRET`

### Test cron endpoint manual
Jalankan cek manual dengan curl:
```bash
curl -H "Authorization: Bearer $CRON_SECRET" https://your-domain.vercel.app/api/cron/send-due-letters
```

### Catatan Email
- Gmail SMTP menggunakan App Password atau akun yang sudah diizinkan untuk login SMTP.
- Limit Gmail biasa sekitar 500 email/hari; kalau mau scale ke atas itu, migrasi ke provider email dedicated.
- Pastikan `GMAIL_USER` sudah valid dan `GMAIL_APP_PASSWORD` sudah aktif di akun Google kamu.
- Cron job sebaiknya diatur manual lewat layanan eksternal seperti cron-job.org.

---

## 📚 Sumber Data

Semua data statistik dilengkapi link sumber:
- **UNICEF Indonesia** — Perkawinan Anak Factsheet 2020, Child Marriage Report 2020
- **BPS Susenas 2025** — Proporsi perempuan 20-24 menikah <18 tahun per provinsi
- **MPR RI** — Statistik global pernikahan anak
- **BKKBN** — Rekomendasi kesiapan menikah (Instagram resmi)
- **UU No. 1/1974** & **UU No. 16/2019** — peraturan.bpk.go.id
- **DP3AK Jawa Timur** — data dispensasi pernikahan dini
- **PUSKAPA UI** — Seri belajar ratifikasi konvensi hak anak
- **Anisa et al. (2023)** — Universitas Muhammadiyah Sumatera Barat
- **Kemenpppa** — 30 tahun ratifikasi Konvensi Hak Anak

---

## 🔒 Privasi & Keamanan

- Form Fitting Room dirancang **anonim** — identitas dilindungi.
- Nomor telepon hanya digunakan untuk verifikasi awal sebelum konsultasi WhatsApp.
- Tidak ada tracking pixel pihak ketiga.
- Cookie? Hanya yang strictly necessary (Next.js).

---

## 📄 Lisensi

Dibuat untuk tujuan edukasi remaja Indonesia.
© 2025 OOTD - Our Own Tomorrow Dreams.

---

## 📧 Kontak

**Email:** [nabilajasmine6426@gmail.com](mailto:nabilajasmine6426@gmail.com)
**WhatsApp Fitting Room:** +62 896-1660-2357
