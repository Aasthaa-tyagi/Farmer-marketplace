'use client';

import { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QrCodeDisplayProps {
  value: string;
  productName?: string;
  size?: number;
}

export function QrCodeDisplay({ value, productName, size = 200 }: QrCodeDisplayProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [dataUrl, setDataUrl] = useState<string>('');

  useEffect(() => {
    if (canvasRef.current && value) {
      QRCode.toCanvas(
        canvasRef.current,
        value,
        {
          width: size,
          margin: 2,
          color: {
            dark: '#000000',
            light: '#ffffff',
          },
        },
        (error) => {
          if (error) console.error(error);
        }
      );

      QRCode.toDataURL(value, { width: size * 2, margin: 2 }).then(setDataUrl);
    }
  }, [value, size]);

  const handleDownload = () => {
    if (!dataUrl) return;
    
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = productName 
      ? `qr-${productName.toLowerCase().replace(/\s+/g, '-')}.png`
      : 'qr-code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardContent className="flex flex-col items-center gap-4 p-6">
        <div className="rounded-lg bg-white p-4">
          <canvas ref={canvasRef} />
        </div>
        
        <p className="max-w-[200px] break-all text-center text-xs text-muted-foreground">
          {value}
        </p>

        <Button variant="outline" size="sm" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download QR Code
        </Button>
      </CardContent>
    </Card>
  );
}
