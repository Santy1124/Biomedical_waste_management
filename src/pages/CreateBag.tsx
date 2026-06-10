import React from "react";

const categoryPrefix = {
  Yellow: "YEL",
  Red: "RED",
  White: "WHT",
  Blue: "BLU",
};

type Category = keyof typeof categoryPrefix;

export function CreateBag() {
  const [department, setDepartment] = React.useState("OT");
  const [category, setCategory] = React.useState<Category>("Yellow");
  const [weight, setWeight] = React.useState("");
  const [createdBagId, setCreatedBagId] = React.useState("BMW-YEL-NEW");

  function createBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const randomId = Math.floor(100 + Math.random() * 900);
    setCreatedBagId(`BMW-${categoryPrefix[category]}-${randomId}`);
  }

  return (
    <>
      <p className="demo-label">Point of generation</p>
      <h2>Create Bag Unit</h2>

      <p className="demo-description">
        Create a bag/container unit, assign category, origin department, and generate a printable QR label.
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
            placeholder="Example: 2.5 kg"
          />

          <button className="primary-btn">Create QR Bag</button>
        </form>

        <div className="qr-label-card">
          <p className="demo-label">Printable Label</p>

          <div className="qr-label">
            <div className="fake-qr">QR</div>

            <div className="qr-label-info">
              <h3>{createdBagId}</h3>
              <p>Category: <span>{category}</span></p>
              <p>Department: <span>{department}</span></p>
              <p>Weight: <span>{weight || "Pending"}</span></p>
              <p>Status: <span>Created</span></p>
            </div>
          </div>

          <button className="secondary-btn">Print Label</button>
        </div>
      </div>
    </>
  );
}