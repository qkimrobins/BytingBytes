import type { ReactNode } from 'react';
import Image from 'next/image';
import { Logo } from '@/components/logo';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function AuthLayout({ children }: { children: ReactNode }) {
    const loginImage = PlaceHolderImages.find(img => img.id === 'login-illustration');

    return (
        <div className="flex min-h-screen w-full bg-background">
            <div className="hidden lg:flex lg:w-1/2 flex-col items-center justify-center bg-primary/5 p-8 text-center relative">
                <div className="absolute top-8 left-8">
                    <Logo />
                </div>
                {loginImage && (
                    <div className="my-8">
                        <Image
                            src={loginImage.imageUrl}
                            alt={loginImage.description}
                            width={500}
                            height={500}
                            className="rounded-xl object-cover shadow-2xl"
                            data-ai-hint={loginImage.imageHint}
                        />
                    </div>
                )}
                <div className="mt-4">
                    <h2 className="font-headline text-3xl font-bold text-foreground">Your Startup's Command Center</h2>
                    <p className="mt-2 text-muted-foreground">Manage, validate, and scale with precision.</p>
                </div>
            </div>
            <div className="flex w-full lg:w-1/2 items-center justify-center p-4">
                <div className="w-full max-w-md">
                    {children}
                </div>
            </div>
        </div>
    );
}
