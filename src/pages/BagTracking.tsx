import React from "react";
import { BagDetail } from "../components/BagDetail";
import { BagTable } from "../components/BagTable";
import { bags as initialBags } from "../data/mockData";
import type { Bag, BagStatus } from "../types/bmw";

export function BagTracking() {
  const [bags, setBags] = React.useState<Bag[]>(initialBags);
  const [selectedBag, setSelectedBag] = React.useState<Bag | null>(null);

  function updateStatus(bagId: string, status: BagStatus) {
    const updatedBags = bags.map((bag) =>
      bag.id === bagId ? { ...bag, status } : bag
    );

    setBags(updatedBags);

    const updatedSelectedBag = updatedBags.find((bag) => bag.id === bagId) ?? null;
    setSelectedBag(updatedSelectedBag);
  }

  return (
    <>
      <p className="demo-label">Chain of custody</p>
      <h2>Bag Tracking</h2>
      <p className="demo-description">
        Move bags through the operational lifecycle and maintain custody visibility.
      </p>

      <BagTable bags={bags} onViewBag={setSelectedBag} />

      {selectedBag && (
        <BagDetail
          bag={selectedBag}
          onClose={() => setSelectedBag(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </>
  );
}