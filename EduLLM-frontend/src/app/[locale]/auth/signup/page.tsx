import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GraduationCap, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SignUpForm } from '@/components/auth/SignUpForm';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignUp' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SignUpPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('SignUp');
  const tNav = await getTranslations('nav');

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Navigation */}
      <nav className="border-b border-slate-800/50 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3 rtl:flex-row-reverse">
              <Link href={`/${locale}`}>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-slate-400 hover:text-white transition-colors"
                >
                  <ArrowLeft className="h-4 w-4 ltr:mr-2 rtl:ml-2" />
                  {tNav('back')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Logo */}
            <div className="mx-auto h-16 w-16 rounded-2xl flex items-center justify-center mb-8 overflow-hidden">
              <img 
                src="/imgs/1750783385632jx2g3bb3.webp" 
                alt="AI Student Space Logo"
                className="w-full h-auto"
              />
            </div>
            {/* Title with gradient text */}
            <h2 className="text-4xl font-bold text-white mb-2">
              {t('title')}
            </h2>
            <p className="text-slate-400 text-lg">
              {t('subtitle')}
            </p>
          </div>
          
          {/* Form container with app-consistent styling */}
          <div className="bg-slate-900/30 border border-slate-800/50 rounded-2xl p-8">
            <SignUpForm />
          </div>
        </div>
      </div>
    </div>
  );
}
