import QRCode from "qrcode";
import React from "react";

type Props = {
  bagId: string;
  category: string;
  department: string;
  weight: string;
};

export function QrLabel({ bagId, category, department, weight }: Props) {
  const [qrUrl, setQrUrl] = React.useState("");

  React.useEffect(() => {
    QRCode.toDataURL(bagId, {
      width: 180,
      margin: 2,
    }).then(setQrUrl);
  }, [bagId]);

  return (
    <div className="qr-label">
      {qrUrl ? <img src={qrUrl} alt={`QR for ${bagId}`} /> : <div />}

      <div className="qr-label-info">
        <h3>{bagId}</h3>
        <p>Category: <span>{category}</span></p>
        <p>Department: <span>{department}</span></p>
        <p>Weight: <span>{weight || "Pending"}</span></p>
        <p>Status: <span>Created</span></p>
      </div>
    </div>
  );
}