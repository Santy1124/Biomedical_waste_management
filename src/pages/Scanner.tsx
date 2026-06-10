import { Html5Qrcode } from "html5-qrcode";
import React from "react";
import { StatusBadge } from "../components/StatusBadge";
import { bags as initialBags } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";

const scannerId = "qr-reader";

const nextActionMap: Record<BagStatus, { label: string; next: BagStatus } | null> = {
  Created: { label: "Collect Bag", next: "Collected" },
  Collected: { label: "Move to Storage", next: "In Storage" },
  "In Storage": { label: "Mark Ready for Pickup", next: "Ready for Pickup" },
  "Ready for Pickup": { label: "Start Transit", next: "In Transit" },
  "In Transit": { label: "Mark Treated", next: "Treated" },
  Treated: null,
  Disputed: null,
};

export function Scanner() {
  const [bags, setBags] = React.useState<Bag[]>(initialBags);
  const [scanInput, setScanInput] = React.useState("BMW-YEL-001");
  const [scannedBag, setScannedBag] = React.useState<Bag | null>(initialBags[0]);
  const [scanError, setScanError] = React.useState("");
  const [recentScans, setRecentScans] = React.useState<string[]>(["BMW-YEL-001"]);
  const [isScanning, setIsScanning] = React.useState(false);

  const scannerRef = React.useRef<Html5Qrcode | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  function runScan(value: string) {
    const found = bags.find(
      (bag) => bag.id.toLowerCase() === value.trim().toLowerCase()
    );

    if (!found) {
      setScannedBag(null);
      setScanError(`No matching bag found for "${value}".`);
      return;
    }

    setScanInput(found.id);
    setScanError("");
    setScannedBag(found);
    setRecentScans((prev) => [found.id, ...prev.filter((id) => id !== found.id)].slice(0, 5));
  }

  async function startCameraScanner() {
    try {
      setScanError("");

      const scanner = new Html5Qrcode(scannerId);
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: { width: 250, height: 250 } },
        async (decodedText) => {
          runScan(decodedText);
          await stopCameraScanner();
        },
        () => {}
      );

      setIsScanning(true);
    } catch (error) {
      console.error(error);
      setScanError("Could not open camera. Use HTTPS/Vercel or manual entry.");
    }
  }

  async function stopCameraScanner() {
    try {
      if (scannerRef.current) {
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

  async function uploadQrImage(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setScanError("");

      const scanner = new Html5Qrcode(scannerId);
      const decodedText = await scanner.scanFile(file, true);
      runScan(decodedText);
      await scanner.clear();
    } catch (error) {
      console.error(error);
      setScanError("Could not read QR from image.");
    }
  }

  function scanBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    runScan(scanInput);
  }

  function updateStatus(status: BagStatus) {
    if (!scannedBag) return;

    const updatedBags = bags.map((bag) =>
      bag.id === scannedBag.id ? { ...bag, status } : bag
    );

    setBags(updatedBags);
    setScannedBag(updatedBags.find((bag) => bag.id === scannedBag.id) ?? null);
  }

  React.useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(() => {});
      }
    };
  }, []);

  const nextAction = scannedBag ? nextActionMap[scannedBag.status] : null;

  return (
    <>
      <p className="demo-label">QR workflow</p>
      <h2>Scanner</h2>

      <p className="demo-description">
        Scan QR using camera, upload QR image, or enter bag ID manually.
      </p>

      <div className="scanner-modern-layout">
        <div className="scanner-options">
          <div className="card">
            <h3>Scan Options</h3>

            <div id={scannerId} className="real-scanner-box" />

            {!isScanning ? (
              <button className="primary-btn full-btn" onClick={startCameraScanner}>
                Open Camera Scanner
              </button>
            ) : (
              <button className="secondary-btn full-btn" onClick={stopCameraScanner}>
                Stop Camera
              </button>
            )}

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              hidden
              onChange={uploadQrImage}
            />

            <button
              className="secondary-btn full-btn"
              onClick={() => fileInputRef.current?.click()}
            >
              Upload QR Image
            </button>

            <form onSubmit={scanBag} className="scan-form">
              <label>Manual Bag ID</label>
              <input
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="BMW-YEL-001"
              />
              <button className="primary-btn">Scan Bag</button>
            </form>

            {scanError && <p className="error-text">{scanError}</p>}
          </div>

          <div className="card">
            <h3>Recent Scans</h3>
            <div className="recent-scan-list">
              {recentScans.map((id) => (
                <button key={id} className="recent-scan" onClick={() => runScan(id)}>
                  {id}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="card scan-result-card">
          <h3>Scan Result</h3>

          {scannedBag && (
            <>
              <div className="scan-result-header">
                <div>
                  <p className="demo-label">Bag Found</p>
                  <h3>{scannedBag.id}</h3>
                </div>
                <StatusBadge value={scannedBag.status} />
              </div>

              <div className="scan-result-grid">
                <p>Category: <span>{scannedBag.category}</span></p>
                <p>Department: <span>{scannedBag.department}</span></p>
                <p>Age: <span>{scannedBag.age}</span></p>
                <p>Weight: <span>{scannedBag.weight}</span></p>
                <p>Location: <span>{scannedBag.currentLocation}</span></p>
                <p>Risk: <StatusBadge value={scannedBag.risk} /></p>
              </div>

              <div className="detail-actions">
                {nextAction ? (
                  <button className="primary-btn" onClick={() => updateStatus(nextAction.next)}>
                    {nextAction.label}
                  </button>
                ) : (
                  <button className="secondary-btn" disabled>No Next Action</button>
                )}

                <button className="secondary-btn danger-outline" onClick={() => updateStatus("Disputed")}>
                  Mark Disputed
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}