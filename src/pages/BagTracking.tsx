import React from "react";
import { BagDetail } from "../components/BagDetail";
import { BagTable } from "../components/BagTable";
import { useBagStore } from "../store/bagStore";
import type { Bag, BagStatus } from "../types/bmw";

export function BagTracking() {
  const bags = useBagStore((state) => state.bags);
  const updateBagStatus = useBagStore((state) => state.updateBagStatus);

  const [selectedBagId, setSelectedBagId] = React.useState<string | null>(null);

  const selectedBag = selectedBagId
    ? bags.find((bag) => bag.id === selectedBagId) ?? null
    : null;

  function updateStatus(bagId: string, status: BagStatus) {
    updateBagStatus(bagId, status);
  }

  function viewBag(bag: Bag) {
    setSelectedBagId(bag.id);
  }

  return (
    <>
      <p className="demo-label">Chain of custody</p>
      <h2>Bag Tracking</h2>

      <p className="demo-description">
        Move bags through the operational lifecycle and maintain custody visibility.
      </p>

      <BagTable bags={bags} onViewBag={viewBag} />

      {selectedBag && (
        <BagDetail
          bag={selectedBag}
          onClose={() => setSelectedBagId(null)}
          onUpdateStatus={updateStatus}
        />
      )}
    </>
  );
}