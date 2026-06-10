type Props = {
  name: string;
  bags: number;
  oldestHours: number;
  capacity: number;
  onView: () => void;
};

export function StorageZoneCard({
  name,
  bags,
  oldestHours,
  capacity,
  onView,
}: Props) {
  const progress = Math.min((oldestHours / 48) * 100, 100);

  const risk =
    oldestHours >= 48
      ? "BREACHED"
      : oldestHours >= 42
      ? "CRITICAL"
      : oldestHours >= 36
      ? "WARNING"
      : "SAFE";

  return (
    <div className="card">
      <h3>{name}</h3>

      <p>
        <span>{bags}</span> bags
      </p>

      <p>
        Oldest Bag: <span>{oldestHours}h</span>
      </p>

      <p>
        Capacity: <span>{capacity}%</span>
      </p>

      <div className="aging-bar">
        <div
          className={`aging-fill risk-${risk.toLowerCase()}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      <p>
        Risk: <span>{risk}</span>
      </p>

      <p>
        Remaining: <span>{Math.max(48 - oldestHours, 0)}h</span>
      </p>

      <div className="zone-actions">
        <button className="primary-btn">
          Request Pickup
        </button>

        <button
          className="secondary-btn"
          onClick={onView}
        >
          View Zone
        </button>
      </div>
    </div>
  );
}