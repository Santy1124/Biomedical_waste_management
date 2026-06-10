import { bagTimeline } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";
import { StatusBadge } from "./StatusBadge";

type Props = {
  bag: Bag;
  onClose: () => void;
  onUpdateStatus: (bagId: string, status: BagStatus) => void;
};

const nextActionMap: Record<BagStatus, { label: string; next: BagStatus } | null> = {
  Created: { label: "Collect Bag", next: "Collected" },
  Collected: { label: "Move to Storage", next: "In Storage" },
  "In Storage": { label: "Mark Ready for Pickup", next: "Ready for Pickup" },
  "Ready for Pickup": { label: "Start Transit", next: "In Transit" },
  "In Transit": { label: "Mark Treated", next: "Treated" },
  Treated: null,
  Disputed: null,
};

export function BagDetail({ bag, onClose, onUpdateStatus }: Props) {
  const nextAction = nextActionMap[bag.status];

  return (
    <div className="detail-panel">
      <div className="detail-header">
        <div>
          <p className="demo-label">Bag Detail</p>
          <h3>{bag.id}</h3>
        </div>

        <button className="secondary-btn" onClick={onClose}>
          Close
        </button>
      </div>

      <div className="workflow-strip">
        {["Created", "Collected", "In Storage", "Ready for Pickup", "In Transit", "Treated"].map(
          (step) => (
            <div
              key={step}
              className={`workflow-step ${bag.status === step ? "active" : ""}`}
            >
              {step}
            </div>
          )
        )}
      </div>

      <div className="detail-actions">
        {nextAction ? (
          <button
            className="primary-btn"
            onClick={() => onUpdateStatus(bag.id, nextAction.next)}
          >
            {nextAction.label}
          </button>
        ) : (
          <button className="secondary-btn" disabled>
            No Next Action
          </button>
        )}

        <button
          className="secondary-btn danger-outline"
          onClick={() => onUpdateStatus(bag.id, "Disputed")}
        >
          Mark Disputed
        </button>
      </div>

      <div className="detail-grid">
        <p>Category: <span>{bag.category}</span></p>
        <p>Department: <span>{bag.department}</span></p>
        <p>Status: <StatusBadge value={bag.status} /></p>
        <p>Risk: <StatusBadge value={bag.risk} /></p>
        <p>Weight: <span>{bag.weight}</span></p>
        <p>Location: <span>{bag.currentLocation}</span></p>
      </div>

      <h4>Custody Timeline</h4>

      <div className="timeline">
        {bagTimeline.map((event) => (
          <div className="timeline-item" key={event.title}>
            <div className="timeline-dot" />
            <div>
              <h5>{event.title}</h5>
              <p>{event.time} · {event.owner}</p>
              <small>{event.note}</small>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}