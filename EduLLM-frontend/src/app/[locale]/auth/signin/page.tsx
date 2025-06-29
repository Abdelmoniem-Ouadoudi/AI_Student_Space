import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { GraduationCap } from 'lucide-react';
import { SignInForm } from '@/components/auth/SignInForm';

type Props = {
  readonly params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SignIn' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default async function SignInPage() {
  const t = await getTranslations('SignIn');
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-background">
      <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            {/* Logo */}
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-8 rounded-2xl overflow-hidden">
              <img 
                src="/imgs/1750783385632jx2g3bb3.webp" 
                alt="AI Student Space Logo"
                className="w-full h-auto"
              />
            </div>
            {/* Title with gradient text */}
            <h2 className="mb-2 text-4xl font-bold text-foreground">
              {t('title')}
            </h2>
            <p className="text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
          </div>
          
          {/* Form container with app-consistent styling */}
          <div className="p-8 border bg-slate-900/30 border-slate-800/50 rounded-2xl">
            <SignInForm />
          </div>
        </div>
      </div>
    </div>
  );
}
