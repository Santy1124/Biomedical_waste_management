import React from "react";

import { bags } from "../data/mockData";
import { ManifestBagSelector } from "../components/ManifestBagSelector";
import { ManifestSummary } from "../components/ManifestSummary";

export function Pickup() {
  const [selectedIds, setSelectedIds] =
    React.useState<string[]>([]);

  const availableBags = bags.filter(
    (bag) =>
      bag.status === "Ready for Pickup" ||
      bag.status === "In Storage"
  );

  const selectedBags = availableBags.filter(
    (bag) =>
      selectedIds.includes(bag.id)
  );

  function toggleBag(id: string) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((x) => x !== id)
        : [...prev, id]
    );
  }

  return (
    <>
      <p className="demo-label">
        CBWTF Handover
      </p>

      <h2>Pickup Manifest Builder</h2>

      <p className="demo-description">
        Select bags for pickup and
        generate a digital manifest.
      </p>

      <div className="manifest-layout">
        <ManifestBagSelector
          bags={availableBags}
          selectedIds={selectedIds}
          toggleBag={toggleBag}
        />

        <div>
          <ManifestSummary
            bags={selectedBags}
          />

          <div className="card">
            <h3>Manifest</h3>

            <p>
              Manifest ID:
              <span>
                {" "}
                MAN-2026-001
              </span>
            </p>

            <p>
              Vehicle:
              <span>
                {" "}
                TN-01-1234
              </span>
            </p>

            <div className="manifest-actions">
              <button className="primary-btn">
                Generate Manifest
              </button>

              <button className="secondary-btn">
                Generate Receipt
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}