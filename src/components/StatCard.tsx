type Props = {
  title: string;
  value: string;
  note: string;
  danger?: boolean;
};

export function StatCard({ title, value, note, danger = false }: Props) {
  return (
    <div className={`featured-card ${danger ? "danger-card" : ""}`}>
      <span className="demo-label">{title}</span>
      <h3>{value}</h3>
      <p>{note}</p>
    </div>
  );
}