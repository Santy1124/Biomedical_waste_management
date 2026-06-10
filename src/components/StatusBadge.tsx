export function StatusBadge({ value }: { value: string }) {
  const danger = ["High", "Breach", "Disputed", "CAPA Pending"].includes(value);

  return <span className={`badge ${danger ? "badge-danger" : ""}`}>{value}</span>;
}