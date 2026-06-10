import React from "react";

import { storageZones } from "../data/mockData";
import { StorageKpis } from "../components/StorageKpis";
import { StorageZoneCard } from "../components/StorageZoneCard";
import { ZoneDetail } from "../components/ZoneDetail";

export function Storage() {
  const [selectedZone, setSelectedZone] =
    React.useState<string | null>(null);

  return (
    <>
      <p className="demo-label">
        Storage Operations Center
      </p>

      <h2>Central BMW Storage</h2>

      <p className="demo-description">
        Monitor aging, capacity, threshold
        risks, and pickup readiness.
      </p>

      <StorageKpis />

      <h3 className="subsection-title">
        Aging Board
      </h3>

      <div className="section-grid">
        {storageZones.map((zone) => (
          <StorageZoneCard
            key={zone.id}
            {...zone}
            onView={() =>
              setSelectedZone(zone.name)
            }
          />
        ))}
      </div>

      {selectedZone && (
        <ZoneDetail
          zoneName={selectedZone}
          onClose={() =>
            setSelectedZone(null)
          }
        />
      )}
    </>
  );
}