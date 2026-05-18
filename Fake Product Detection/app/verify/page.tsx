'use client';

import { useState } from 'react';
import { Search, QrCode, Keyboard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { QrScanner } from '@/components/qr-scanner';
import { VerificationResult } from '@/components/verification-result';
import { Spinner } from '@/components/ui/spinner';
import type { VerificationResult as VerificationResultType } from '@/lib/types';

export default function VerifyPage() {
  const [productId, setProductId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VerificationResultType | null>(null);
  const [error, setError] = useState<string | null>(null);

  const verifyProduct = async (id: string) => {
    if (!id.trim()) {
      setError('Please enter a product ID');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId: id.trim() }),
      });

      const data = await response.json();

      if (data.success) {
        setResult(data.data);
      } else {
        setError(data.error || 'Verification failed');
      }
    } catch (err) {
      setError('Failed to verify product. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    verifyProduct(productId);
  };

  const handleQrScan = (scannedValue: string) => {
    setProductId(scannedValue);
    verifyProduct(scannedValue);
  };

  const resetVerification = () => {
    setProductId('');
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold tracking-tight">Verify Product</h1>
            <p className="mt-2 text-muted-foreground">
              Scan a QR code or enter the product ID to verify authenticity
            </p>
          </div>

          {result ? (
            <div className="space-y-6">
              <VerificationResult result={result} />
              <div className="flex justify-center">
                <Button variant="outline" onClick={resetVerification}>
                  Verify Another Product
                </Button>
              </div>
            </div>
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Product Verification</CardTitle>
                <CardDescription>
                  Choose your preferred method to verify the product
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="scan" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="scan" className="flex items-center gap-2">
                      <QrCode className="h-4 w-4" />
                      Scan QR Code
                    </TabsTrigger>
                    <TabsTrigger value="manual" className="flex items-center gap-2">
                      <Keyboard className="h-4 w-4" />
                      Enter ID
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="scan" className="mt-6">
                    <QrScanner 
                      onScan={handleQrScan}
                      onError={(err) => setError(err)}
                    />
                  </TabsContent>

                  <TabsContent value="manual" className="mt-6">
                    <form onSubmit={handleManualSubmit} className="space-y-4">
                      <div>
                        <label htmlFor="productId" className="mb-2 block text-sm font-medium">
                          Product ID
                        </label>
                        <div className="flex gap-2">
                          <Input
                            id="productId"
                            value={productId}
                            onChange={(e) => setProductId(e.target.value)}
                            placeholder="Enter the product ID or UUID"
                            className="flex-1"
                          />
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                              <Spinner />
                            ) : (
                              <Search className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        The product ID is usually found on the product packaging or in the QR code data.
                      </p>
                    </form>
                  </TabsContent>
                </Tabs>

                {isLoading && (
                  <div className="mt-6 flex items-center justify-center gap-2 text-muted-foreground">
                    <Spinner />
                    <span>Verifying on blockchain...</span>
                  </div>
                )}

                {error && (
                  <div className="mt-6 rounded-lg bg-destructive/10 p-4 text-center text-sm text-destructive">
                    {error}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Demo hint */}
          <div className="mt-8 rounded-lg border border-dashed border-border bg-muted/30 p-4 text-center text-sm text-muted-foreground">
            <p className="font-medium">Demo Mode</p>
            <p className="mt-1">
              Try verifying with one of the pre-registered product IDs from the{' '}
              <a href="/explorer" className="underline hover:text-foreground">
                blockchain explorer
              </a>
              .
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
