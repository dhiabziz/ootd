import Link from 'next/link';
import { Mail } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary-50 border-t border-primary-100">
      <div className="container mx-auto py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Col 1: Logo + tagline */}
          <div className="space-y-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-extrabold tracking-tight text-neutral-900">
                OOTD
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] font-medium text-neutral-500">
                Our Own Tomorrow Dreams
              </span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed max-w-sm">
              Platform digital untuk membantu remaja Indonesia memahami kesiapan
              sebelum melangkah — karena masa depan tidak bisa diulang.
            </p>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-primary-700">
              Quick Links
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  Beranda
                </Link>
              </li>
              <li>
                <Link
                  href="/dear-future-fit"
                  className="text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  Dear Future Fit
                </Link>
              </li>
              <li>
                <Link
                  href="/fitting-room"
                  className="text-sm text-neutral-700 hover:text-primary-700 transition-colors"
                >
                  Fitting Room
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact */}
          <div className="space-y-4">
            <h3 className="text-xs uppercase tracking-[0.18em] font-semibold text-primary-700">
              Kontak
            </h3>
            <a
              href="mailto:nabilajasmine6426@gmail.com"
              className="inline-flex items-center gap-2 text-sm text-neutral-700 hover:text-primary-700 transition-colors group"
            >
              <Mail className="h-4 w-4 text-primary-600 group-hover:scale-110 transition-transform" />
              nabilajasmine6426@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-primary-100">
          <p className="text-xs text-neutral-500 text-center">
            © 2025 OOTD - Our Own Tomorrow Dreams. Dibuat untuk edukasi remaja Indonesia.
          </p>
        </div>
      </div>
    </footer>
  );
}
