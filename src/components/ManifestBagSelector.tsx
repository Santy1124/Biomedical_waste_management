import type { Bag } from "../types/bmw";

type Props = {
  bags: Bag[];
  selectedIds: string[];
  toggleBag: (id: string) => void;
};

export function ManifestBagSelector({
  bags,
  selectedIds,
  toggleBag,
}: Props) {
  return (
    <div className="card">
      <h3>Available Bags</h3>

      <div className="manifest-list">
        {bags.map((bag) => (
          <div
            key={bag.id}
            className={`manifest-item ${
              selectedIds.includes(bag.id)
                ? "manifest-selected"
                : ""
            }`}
            onClick={() => toggleBag(bag.id)}
          >
            <strong>{bag.id}</strong>

            <small>
              {bag.category} · {bag.department}
            </small>

            <small>{bag.weight}</small>
          </div>
        ))}
      </div>
    </div>
  );
}