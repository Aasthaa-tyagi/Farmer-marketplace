'use client';

import { Hash, ArrowRight, Clock, Package } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Block } from '@/lib/types';

interface BlockchainVisualizerProps {
  blocks: Block[];
  isValid: boolean;
}

export function BlockchainVisualizer({ blocks, isValid }: BlockchainVisualizerProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Badge variant={isValid ? 'default' : 'destructive'} className="text-sm">
          {isValid ? 'Chain Valid' : 'Chain Compromised'}
        </Badge>
        <span className="text-sm text-muted-foreground">
          {blocks.length} blocks
        </span>
      </div>

      <div className="flex flex-col gap-4">
        {blocks.map((block, index) => (
          <div key={block.hash} className="flex items-start gap-4">
            <div className="flex flex-col items-center">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${
                block.index === 0 ? 'bg-primary text-primary-foreground' : 'bg-muted'
              }`}>
                {block.index}
              </div>
              {index < blocks.length - 1 && (
                <div className="my-2 h-8 w-0.5 bg-border" />
              )}
            </div>

            <Card className="flex-1">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-between text-base">
                  <span className="flex items-center gap-2">
                    {block.index === 0 ? (
                      <Badge variant="outline">Genesis Block</Badge>
                    ) : (
                      <span className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {block.data.productName}
                      </span>
                    )}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {new Date(block.timestamp).toLocaleString()}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid gap-2">
                  <div>
                    <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <Hash className="h-3 w-3" /> Hash
                    </p>
                    <p className="break-all font-mono text-xs">{block.hash}</p>
                  </div>
                  <div>
                    <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                      <ArrowRight className="h-3 w-3" /> Previous Hash
                    </p>
                    <p className="break-all font-mono text-xs">{block.previousHash}</p>
                  </div>
                </div>

                {block.index > 0 && (
                  <div className="rounded-md bg-muted/50 p-3">
                    <div className="grid gap-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">SKU:</span>
                        <span className="font-mono">{block.data.sku}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Manufacturer:</span>
                        <span>{block.data.manufacturerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Action:</span>
                        <Badge variant="outline" className="text-xs">
                          {block.data.action}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span>Nonce: {block.nonce}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
