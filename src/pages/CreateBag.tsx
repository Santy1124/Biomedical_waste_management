import React from "react";
import { QrLabel } from "../components/QrLabel";
import { useBagStore } from "../store/bagStore";
import type { Bag } from "../types/bmw";

type Category = Bag["category"];

type DetectedItem = {
  id: string;
  item: string;
  category: Category;
  confidence: number;
  reason: string;
  bbox: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

const mixedWasteDetections: DetectedItem[] = [
  {
    id: "DET-001",
    item: "Needle / sharp item",
    category: "White",
    confidence: 94,
    reason: "Sharp object should go into puncture-proof white container.",
    bbox: { x: 66, y: 12, width: 18, height: 20 },
  },
  {
    id: "DET-002",
    item: "Plastic syringe / IV tubing",
    category: "Red",
    confidence: 88,
    reason: "Contaminated recyclable plastic should go into red stream.",
    bbox: { x: 24, y: 48, width: 28, height: 18 },
  },
  {
    id: "DET-003",
    item: "Glass vial / ampoule",
    category: "Blue",
    confidence: 83,
    reason: "Glassware should go into blue stream.",
    bbox: { x: 43, y: 30, width: 15, height: 18 },
  },
  {
    id: "DET-004",
    item: "Soiled cotton / gauze",
    category: "Yellow",
    confidence: 89,
    reason: "Contaminated absorbent material should go into yellow stream.",
    bbox: { x: 57, y: 67, width: 20, height: 16 },
  },
];

export function CreateBag() {
  const addBag = useBagStore((state) => state.addBag);

  const [department, setDepartment] = React.useState("OT");
  const [category, setCategory] = React.useState<Category>("Yellow");
  const [weight, setWeight] = React.useState("");
  const [createdBagId, setCreatedBagId] = React.useState("BMW-YEL-001");
  const [photoName, setPhotoName] = React.useState("");
  const [detections, setDetections] = React.useState<DetectedItem[]>([]);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);
  const [imagePreview, setImagePreview] = React.useState("");

  async function createBag(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newBag = await addBag({
      category,
      department,
      weight: weight ? `${weight} kg` : "Pending",
    });

    setCreatedBagId(newBag.id);
  }

  function applySuggestedCategory(targetCategory: Category) {
    setCategory(targetCategory);
    setSelectedCategory(targetCategory);
  }

  function simulateMixedDetection() {
    setDetections(mixedWasteDetections);
  }

  function handlePhotoUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhotoName(file.name);
    setImagePreview(URL.createObjectURL(file));
    simulateMixedDetection();
  }

  function useDemoImage() {
    setPhotoName("demo-waste.png");
    setImagePreview("/demo-waste.png");
    simulateMixedDetection();
  }

  const categoryGroups = detections.reduce((acc, detection) => {
    acc[detection.category] = acc[detection.category] || [];
    acc[detection.category].push(detection);
    return acc;
  }, {} as Record<Category, DetectedItem[]>);

  return (
    <>
      <p className="demo-label">Point of generation</p>
      <h2>Create Bag Unit</h2>

      <p className="demo-description">
        Create a bag/container unit, use AI-assisted mixed waste detection,
        and generate a real QR label after staff confirmation.
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

        <div className="ai-card ai-wide">
          <p className="demo-label">AI Segregation Assistant</p>
          <h3>Mixed Waste Detection</h3>

          <p>
            Upload a photo of waste items. The assistant detects multiple item
            types and recommends separate colour streams. Staff confirmation is required.
          </p>

          <label className="upload-box">
            Upload Waste Photo
            <input
              type="file"
              accept="image/*"
              capture="environment"
              hidden
              onChange={handlePhotoUpload}
            />
          </label>

          <button type="button" className="secondary-btn" onClick={useDemoImage}>
            Use Demo Test Image
          </button>

          {photoName && <p className="photo-name">Photo: {photoName}</p>}

          {imagePreview && detections.length > 0 && (
            <div className="detection-preview">
              <img src={imagePreview} alt="Waste detection preview" />

              {detections.map((detection) => (
                <div
                  key={detection.id}
                  className={`bbox bbox-${detection.category.toLowerCase()}`}
                  style={{
                    left: `${detection.bbox.x}%`,
                    top: `${detection.bbox.y}%`,
                    width: `${detection.bbox.width}%`,
                    height: `${detection.bbox.height}%`,
                  }}
                >
                  <span>
                    {detection.item} · {detection.category} · {detection.confidence}%
                  </span>
                </div>
              ))}
            </div>
          )}

          {detections.length === 0 && (
            <button type="button" className="secondary-btn" onClick={simulateMixedDetection}>
              Simulate Mixed Waste Detection
            </button>
          )}

          {detections.length > 0 && (
            <>
              <div className="ai-warning">
                AI suggestion only. Staff must manually segregate items and confirm before creating bag/container records.
              </div>

              <div className="detected-grid">
                {Object.entries(categoryGroups).map(([groupCategory, items]) => (
                  <div className="detected-category-card" key={groupCategory}>
                    <h4>{groupCategory} Stream</h4>

                    {items.map((item) => (
                      <div className="detected-item" key={item.id}>
                        <strong>{item.item}</strong>
                        <span>{item.confidence}% confidence</span>
                        <p>{item.reason}</p>
                      </div>
                    ))}

                    <button
                      type="button"
                      className="primary-btn"
                      onClick={() => applySuggestedCategory(groupCategory as Category)}
                    >
                      Set Form to {groupCategory}
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="qr-label-card">
          <p className="demo-label">Printable QR Label</p>

          <QrLabel
            bagId={createdBagId}
            category={category}
            department={department}
            weight={weight ? `${weight} kg` : "Pending"}
          />

          {selectedCategory && (
            <p className="photo-name">
              AI suggested category selected: {selectedCategory} stream. Staff must create bag after manual segregation.
            </p>
          )}

          <button className="secondary-btn" onClick={() => window.print()}>
            Print Label
          </button>
        </div>
      </div>
    </>
  );
}