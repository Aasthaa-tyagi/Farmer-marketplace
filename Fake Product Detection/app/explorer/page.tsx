'use client';

import { useEffect, useState } from 'react';
import { RefreshCw, Link2, Shield, Package, Boxes } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { BlockchainVisualizer } from '@/components/blockchain-visualizer';
import { Spinner } from '@/components/ui/spinner';
import type { Block } from '@/lib/types';

interface BlockchainState {
  chain: Block[];
  length: number;
  isValid: boolean;
  difficulty: number;
}

export default function ExplorerPage() {
  const [blockchain, setBlockchain] = useState<BlockchainState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchBlockchain = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const response = await fetch('/api/blockchain');
      const data = await response.json();
      if (data.success) {
        setBlockchain(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch blockchain');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBlockchain();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex flex-1 items-center justify-center">
          <Spinner className="h-8 w-8" />
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Blockchain Explorer</h1>
              <p className="mt-2 text-muted-foreground">
                View the complete product authentication ledger
              </p>
            </div>
            <Button
              variant="outline"
              onClick={() => fetchBlockchain(true)}
              disabled={isRefreshing}
            >
              {isRefreshing ? (
                <Spinner className="mr-2" />
              ) : (
                <RefreshCw className="mr-2 h-4 w-4" />
              )}
              Refresh
            </Button>
          </div>

          {/* Stats Cards */}
          {blockchain && (
            <div className="mb-8 grid gap-4 sm:grid-cols-4">
              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <Boxes className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Total Blocks</p>
                    <p className="text-xl font-bold">{blockchain.length}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
                    <Shield className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Chain Status</p>
                    <Badge variant={blockchain.isValid ? 'default' : 'destructive'} className="mt-1">
                      {blockchain.isValid ? 'Valid' : 'Invalid'}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                    <Link2 className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Difficulty</p>
                    <p className="text-xl font-bold">{blockchain.difficulty}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
                    <Package className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Products</p>
                    <p className="text-xl font-bold">{Math.max(0, blockchain.length - 1)}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Blockchain Info Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5" />
                About This Blockchain
              </CardTitle>
              <CardDescription>
                Understanding how our product authentication works
              </CardDescription>
            </CardHeader>
            <CardContent className="prose prose-sm max-w-none text-muted-foreground">
              <p>
                This is a <strong>simulated blockchain</strong> designed to demonstrate product authentication concepts. 
                Each product registered by a manufacturer creates a new block in the chain, containing:
              </p>
              <ul className="mt-2 space-y-1">
                <li><strong>Hash:</strong> A unique SHA-256 fingerprint of the block data</li>
                <li><strong>Previous Hash:</strong> Links to the previous block, creating the chain</li>
                <li><strong>Nonce:</strong> Proof-of-work value used in mining</li>
                <li><strong>Product Data:</strong> Name, SKU, manufacturer info, and timestamp</li>
              </ul>
              <p className="mt-4">
                The chain is validated by verifying that each block&apos;s hash is correctly computed 
                and links to the previous block&apos;s hash. Any tampering would break the chain.
              </p>
            </CardContent>
          </Card>

          {/* Blockchain Visualizer */}
          {blockchain && (
            <BlockchainVisualizer
              blocks={blockchain.chain}
              isValid={blockchain.isValid}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
