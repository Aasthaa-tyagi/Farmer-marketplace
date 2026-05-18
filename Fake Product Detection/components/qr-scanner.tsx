'use client';

import { useEffect, useRef, useState } from 'react';
import { Html5Qrcode } from 'html5-qrcode';
import { Camera, CameraOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface QrScannerProps {
  onScan: (result: string) => void;
  onError?: (error: string) => void;
}

export function QrScanner({ onScan, onError }: QrScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const startScanning = async () => {
    if (!containerRef.current) return;

    try {
      const scanner = new Html5Qrcode('qr-reader');
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: 'environment' },
        {
          fps: 10,
          qrbox: { width: 250, height: 250 },
        },
        (decodedText) => {
          onScan(decodedText);
          stopScanning();
        },
        () => {
          // QR code not found, continue scanning
        }
      );

      setIsScanning(true);
      setHasPermission(true);
    } catch (error) {
      setHasPermission(false);
      onError?.('Camera access denied or not available');
    }
  };

  const stopScanning = async () => {
    if (scannerRef.current?.isScanning) {
      await scannerRef.current.stop();
      setIsScanning(false);
    }
  };

  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div
          ref={containerRef}
          className="relative aspect-square w-full bg-muted"
        >
          <div id="qr-reader" className="h-full w-full" />
          
          {!isScanning && (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted">
              {hasPermission === false ? (
                <>
                  <CameraOff className="h-16 w-16 text-muted-foreground" />
                  <p className="text-center text-sm text-muted-foreground">
                    Camera access denied.<br />
                    Please enable camera permissions.
                  </p>
                </>
              ) : (
                <>
                  <Camera className="h-16 w-16 text-muted-foreground" />
                  <p className="text-center text-sm text-muted-foreground">
                    Click to start scanning
                  </p>
                </>
              )}
            </div>
          )}
        </div>

        <div className="p-4">
          {isScanning ? (
            <Button
              onClick={stopScanning}
              variant="outline"
              className="w-full"
            >
              <CameraOff className="mr-2 h-4 w-4" />
              Stop Scanning
            </Button>
          ) : (
            <Button onClick={startScanning} className="w-full">
              <Camera className="mr-2 h-4 w-4" />
              Start Camera
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
