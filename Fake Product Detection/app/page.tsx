import Link from 'next/link';
import { Shield, QrCode, Link2, CheckCircle2, ArrowRight, Building2, Users, Package, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';

const steps = [
  {
    icon: QrCode,
    title: 'Scan QR Code',
    description: 'Use your smartphone to scan the QR code on the product packaging.',
  },
  {
    icon: Link2,
    title: 'Blockchain Verification',
    description: 'Our system checks the product against the immutable blockchain ledger.',
  },
  {
    icon: CheckCircle2,
    title: 'Get Results',
    description: 'Instantly know if your product is authentic or potentially counterfeit.',
  },
];

const features = [
  {
    icon: Lock,
    title: 'Immutable Records',
    description: 'Every product registration is permanently stored on the blockchain, preventing tampering.',
  },
  {
    icon: Package,
    title: 'Real-time Verification',
    description: 'Instantly verify any product authenticity with a simple QR code scan.',
  },
  {
    icon: Building2,
    title: 'Manufacturer Dashboard',
    description: 'Easy-to-use interface for manufacturers to register and manage their products.',
  },
  {
    icon: Users,
    title: 'Consumer Protection',
    description: 'Empower consumers to make informed purchasing decisions.',
  },
];

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 via-background to-background">
          <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
            <div className="mx-auto max-w-3xl text-center">
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-1.5 text-sm">
                <Shield className="h-4 w-4 text-primary" />
                <span>Blockchain-Powered Authentication</span>
              </div>
              
              <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Fake Product Detection Using{' '}
                <span className="text-primary">QR</span>
              </h1>
              
              <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
                AuthGuard uses blockchain technology and QR codes to provide tamper-proof product authentication. 
                Verify authenticity instantly and protect your brand integrity.
              </p>

              <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/verify">
                    <QrCode className="mr-2 h-5 w-5" />
                    Verify a Product
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/manufacturer/register">
                    <Building2 className="mr-2 h-5 w-5" />
                    Register as Manufacturer
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Decorative gradient blob */}
          <div className="absolute -top-40 left-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-3xl" />
        </section>

        {/* How it Works */}
        <section className="border-y border-border bg-muted/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">How It Works</h2>
              <p className="mt-4 text-muted-foreground">
                Verify product authenticity in three simple steps
              </p>
            </div>

            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {steps.map((step, index) => (
                <div key={step.title} className="relative">
                  <div className="flex flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full -translate-x-1/2 bg-border md:block" style={{ display: index === 2 ? 'none' : undefined }} />
                    <span className="mt-4 text-sm font-medium text-muted-foreground">Step {index + 1}</span>
                    <h3 className="mt-2 text-xl font-semibold">{step.title}</h3>
                    <p className="mt-2 text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Why Choose AuthGuard?</h2>
              <p className="mt-4 text-muted-foreground">
                Cutting-edge technology to protect brands and consumers
              </p>
            </div>

            <div className="mt-16 grid gap-6 md:grid-cols-2">
              {features.map((feature) => (
                <Card key={feature.title} className="border-border/50">
                  <CardHeader>
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                      <feature.icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="mt-4">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-base">{feature.description}</CardDescription>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="border-t border-border bg-muted/30 py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight">Ready to Get Started?</h2>
              <p className="mt-4 text-muted-foreground">
                Join thousands of manufacturers protecting their products with blockchain technology.
              </p>
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Button size="lg" asChild>
                  <Link href="/manufacturer/register">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="ghost" asChild>
                  <Link href="/explorer">
                    Explore Blockchain
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
