'use client';

import { CheckCircle2, XCircle, Package, Building2, Calendar, Hash, Clock, LinkIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { VerificationResult as VerificationResultType } from '@/lib/types';

interface VerificationResultProps {
  result: VerificationResultType;
}

export function VerificationResult({ result }: VerificationResultProps) {
  const { isAuthentic, product, block, chainValid, message, verifiedAt } = result;

  return (
    <div className="space-y-4">
      {/* Main status card */}
      <Card className={isAuthentic ? 'border-emerald-500/50 bg-emerald-50/50' : 'border-destructive/50 bg-destructive/5'}>
        <CardContent className="flex items-center gap-4 p-6">
          {isAuthentic ? (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
              <CheckCircle2 className="h-10 w-10 text-emerald-600" />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <XCircle className="h-10 w-10 text-destructive" />
            </div>
          )}
          <div className="flex-1">
            <h3 className={`text-xl font-semibold ${isAuthentic ? 'text-emerald-700' : 'text-destructive'}`}>
              {isAuthentic ? 'Authentic Product' : 'Verification Failed'}
            </h3>
            <p className="text-sm text-muted-foreground">{message}</p>
          </div>
        </CardContent>
      </Card>

      {/* Product details */}
      {product && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Package className="h-5 w-5" />
              Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Product Name</p>
              <p className="font-medium">{product.name}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">SKU</p>
              <p className="font-mono text-sm">{product.sku}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Category</p>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Batch Number</p>
              <p className="font-mono text-sm">{product.batchNumber}</p>
            </div>
            <div className="sm:col-span-2">
              <p className="text-sm font-medium text-muted-foreground">Description</p>
              <p className="text-sm">{product.description}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Manufacturer info */}
      {product && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Building2 className="h-5 w-5" />
              Manufacturer
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Company</p>
              <p className="font-medium">{product.manufacturerName}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Manufacturing Date</p>
              <p>{new Date(product.manufacturingDate).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-muted-foreground">Registered On</p>
              <p>{new Date(product.createdAt).toLocaleDateString()}</p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Blockchain verification */}
      {block && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LinkIcon className="h-5 w-5" />
              Blockchain Record
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={chainValid ? 'default' : 'destructive'}>
                {chainValid ? 'Chain Valid' : 'Chain Compromised'}
              </Badge>
            </div>
            
            <div className="grid gap-4">
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Hash className="h-3 w-3" /> Block Index
                </p>
                <p className="font-mono text-sm">#{block.index}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Hash className="h-3 w-3" /> Block Hash
                </p>
                <p className="break-all font-mono text-xs">{block.hash}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <LinkIcon className="h-3 w-3" /> Previous Hash
                </p>
                <p className="break-all font-mono text-xs">{block.previousHash}</p>
              </div>
              <div>
                <p className="flex items-center gap-1 text-sm font-medium text-muted-foreground">
                  <Clock className="h-3 w-3" /> Block Timestamp
                </p>
                <p className="text-sm">{new Date(block.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Verification timestamp */}
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <Calendar className="h-4 w-4" />
        Verified at {new Date(verifiedAt).toLocaleString()}
      </div>
    </div>
  );
}
