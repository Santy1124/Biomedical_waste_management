import { Html5Qrcode } from "html5-qrcode";
import React from "react";

type Props = {
  onScan: (decodedText: string) => void;
};

const scannerId = "bmw-real-qr-reader";

export function RealQrScanner({ onScan }: Props) {
  const scannerRef = React.useRef<Html5Qrcode | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const [message, setMessage] = React.useState("Camera scanner is stopped.");

  async function startScanner() {
    try {
      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        {
          fps: 10,
          qrbox: { width: 240, height: 240 },
        },
        async (decodedText) => {
          onScan(decodedText);
          setMessage(`Scanned: ${decodedText}`);
          await stopScanner();
        },
        () => {
          // Ignore frame scan failures.
        }
      );

      setIsScanning(true);
      setMessage("Scanner running. Point camera at bag QR.");
    } catch (error) {
      setMessage("Could not start camera. Use manual scan fallback.");
      console.error(error);
    }
  }

  async function stopScanner() {
    try {
      if (scannerRef.current?.isScanning) {
        await scannerRef.current.stop();
        await scannerRef.current.clear();
      }
    } catch (error) {
      console.error(error);
    } finally {
      scannerRef.current = null;
      setIsScanning(false);
    }
  }

  React.useEffect(() => {
    return () => {
      if (scannerRef.current?.isScanning) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  return (
    <div className="real-scanner-card">
      <div id={scannerId} className="real-scanner-box" />

      <p className="scanner-message">{message}</p>

      <div className="detail-actions">
        {!isScanning ? (
          <button className="primary-btn" onClick={startScanner}>
            Open Camera Scanner
          </button>
        ) : (
          <button className="secondary-btn" onClick={stopScanner}>
            Stop Scanner
          </button>
        )}
      </div>
    </div>
  );
}