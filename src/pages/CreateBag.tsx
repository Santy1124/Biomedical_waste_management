import React from "react";
import { QrLabel } from "../components/QrLabel";
import { useBagStore } from "../store/bagStore";
import type { Bag } from "../types/bmw";

type Category = Bag["category"];

export function CreateBag() {
  const addBag = useBagStore((state) => state.addBag);

  const [department, setDepartment] = React.useState("OT");
  const [category, setCategory] = React.useState<Category>("Yellow");
  const [weight, setWeight] = React.useState("");
  const [createdBagId, setCreatedBagId] = React.useState("BMW-YEL-001");

  function createBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newBag = addBag({
      category,
      department,
      weight: weight ? `${weight} kg` : "Pending",
    });

    setCreatedBagId(newBag.id);
  }

  return (
    <>
      <p className="demo-label">Point of generation</p>
      <h2>Create Bag Unit</h2>

      <p className="demo-description">
        Create a bag/container unit, assign category, origin department, and generate a real QR label.
      </p>

      <div className="form-grid">
        <form className="form-card" onSubmit={createBag}>
          <label>Department</label>
          <select value={department} onChange={(e) => setDepartment(e.target.value)}>
            <option>OT</option>
            <option>ICU</option>
            <option>Lab</option>
            <option>Ward</option>
            <option>Pharmacy</option>
          </select>

          <label>Waste Category</label>
          <select value={category} onChange={(e) => setCategory(e.target.value as Category)}>
            <option>Yellow</option>
            <option>Red</option>
            <option>White</option>
            <option>Blue</option>
          </select>

          <label>Approx Weight</label>
          <input
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Example: 2.5"
          />

          <button className="primary-btn">Create QR Bag</button>
        </form>

        <div className="qr-label-card">
          <p className="demo-label">Printable QR Label</p>

          <QrLabel
            bagId={createdBagId}
            category={category}
            department={department}
            weight={weight ? `${weight} kg` : "Pending"}
          />

          <button className="secondary-btn" onClick={() => window.print()}>
            Print Label
          </button>
        </div>
      </div>
    </>
  );
}