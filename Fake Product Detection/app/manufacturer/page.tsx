'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Package, Plus, LogOut, Building2, QrCode, Link2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { ProductForm } from '@/components/product-form';
import { QrCodeDisplay } from '@/components/qr-code-display';
import { Spinner } from '@/components/ui/spinner';
import type { ManufacturerSession, Product, ProductInput } from '@/lib/types';

export default function ManufacturerDashboard() {
  const router = useRouter();
  const [session, setSession] = useState<ManufacturerSession | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    // Check for session
    const storedSession = localStorage.getItem('manufacturer_session');
    if (!storedSession) {
      router.push('/manufacturer/login');
      return;
    }

    const parsedSession = JSON.parse(storedSession) as ManufacturerSession;
    setSession(parsedSession);
    fetchProducts(parsedSession.id);
  }, [router]);

  const fetchProducts = async (manufacturerId: string) => {
    try {
      const response = await fetch(`/api/products?manufacturerId=${manufacturerId}`);
      const data = await response.json();
      if (data.success) {
        setProducts(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch products');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegisterProduct = async (productData: ProductInput) => {
    if (!session) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...productData,
          manufacturerId: session.id,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setProducts((prev) => [data.data, ...prev]);
        setSelectedProduct(data.data);
      }
    } catch (error) {
      console.error('Failed to register product');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('manufacturer_session');
    router.push('/manufacturer/login');
  };

  if (isLoading || !session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 bg-muted/30 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">Manufacturer Dashboard</h1>
              <p className="mt-1 flex items-center gap-2 text-muted-foreground">
                <Building2 className="h-4 w-4" />
                {session.company}
              </p>
            </div>
            <Button variant="outline" onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Stats */}
          <div className="mb-8 grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Registered Products</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-100">
                  <QrCode className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">QR Codes Generated</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="flex items-center gap-4 p-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                  <Link2 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blockchain Records</p>
                  <p className="text-2xl font-bold">{products.length}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                My Products
              </TabsTrigger>
              <TabsTrigger value="register" className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Register New
              </TabsTrigger>
            </TabsList>

            <TabsContent value="products">
              {products.length === 0 ? (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground" />
                    <h3 className="mt-4 text-lg font-semibold">No products yet</h3>
                    <p className="mt-2 text-center text-muted-foreground">
                      Register your first product to get started with blockchain authentication.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">Registered Products</h2>
                    <div className="space-y-3">
                      {products.map((product) => (
                        <Card
                          key={product.id}
                          className={`cursor-pointer transition-colors hover:bg-muted/50 ${
                            selectedProduct?.id === product.id ? 'ring-2 ring-primary' : ''
                          }`}
                          onClick={() => setSelectedProduct(product)}
                        >
                          <CardContent className="flex items-center justify-between p-4">
                            <div className="min-w-0 flex-1">
                              <h3 className="truncate font-medium">{product.name}</h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                SKU: {product.sku}
                              </p>
                              <div className="mt-2 flex items-center gap-2">
                                <Badge variant="secondary">{product.category}</Badge>
                                <span className="text-xs text-muted-foreground">
                                  Block #{product.blockIndex}
                                </span>
                              </div>
                            </div>
                            <QrCode className="h-8 w-8 shrink-0 text-muted-foreground" />
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h2 className="text-lg font-semibold">QR Code Preview</h2>
                    {selectedProduct ? (
                      <div className="space-y-4">
                        <QrCodeDisplay
                          value={selectedProduct.id}
                          productName={selectedProduct.name}
                        />
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Blockchain Info</CardTitle>
                          </CardHeader>
                          <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Product ID:</span>
                              <span className="font-mono text-xs">{selectedProduct.id.slice(0, 16)}...</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-muted-foreground">Block Index:</span>
                              <span>#{selectedProduct.blockIndex}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Block Hash:</span>
                              <p className="mt-1 break-all font-mono text-xs">
                                {selectedProduct.blockHash}
                              </p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    ) : (
                      <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                          <QrCode className="h-12 w-12 text-muted-foreground" />
                          <p className="mt-4 text-center text-muted-foreground">
                            Select a product to view its QR code
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>
                </div>
              )}
            </TabsContent>

            <TabsContent value="register">
              <div className="grid gap-6 lg:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Register New Product</CardTitle>
                    <CardDescription>
                      Add a product to the blockchain for authentication
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProductForm
                      onSubmit={handleRegisterProduct}
                      isLoading={isSubmitting}
                    />
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h2 className="text-lg font-semibold">Recently Registered</h2>
                  {selectedProduct ? (
                    <QrCodeDisplay
                      value={selectedProduct.id}
                      productName={selectedProduct.name}
                    />
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Plus className="h-12 w-12 text-muted-foreground" />
                        <p className="mt-4 text-center text-muted-foreground">
                          Register a product to generate its QR code
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            </TabsContent>
          </Tabs>

          {/* View blockchain link */}
          <div className="mt-8 text-center">
            <Button variant="ghost" asChild>
              <Link href="/explorer">
                <Link2 className="mr-2 h-4 w-4" />
                View All Blockchain Records
              </Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
