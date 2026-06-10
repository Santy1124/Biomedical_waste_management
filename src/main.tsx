import React from "react";
import ReactDOM from "react-dom/client";
import { Activity, AlertTriangle, Archive, BarChart3, ClipboardList, Home, Package, Truck } from "lucide-react";
import "./style.css";

type PageKey =
  | "dashboard"
  | "createBag"
  | "bagTracking"
  | "collection"
  | "storage"
  | "pickup"
  | "incidents"
  | "reports";

const navItems = [
  { key: "dashboard", label: "Dashboard", icon: Home },
  { key: "createBag", label: "Create Bag", icon: Package },
  { key: "bagTracking", label: "Bag Tracking", icon: ClipboardList },
  { key: "collection", label: "Collection", icon: Activity },
  { key: "storage", label: "Storage", icon: Archive },
  { key: "pickup", label: "Pickup", icon: Truck },
  { key: "incidents", label: "Incidents", icon: AlertTriangle },
  { key: "reports", label: "Reports", icon: BarChart3 },
] as const;

const bags = [
  { id: "BMW-YEL-001", category: "Yellow", dept: "OT", status: "In Storage", age: "42h", risk: "High" },
  { id: "BMW-RED-014", category: "Red", dept: "ICU", status: "Collected", age: "18h", risk: "Normal" },
  { id: "BMW-WHT-032", category: "White", dept: "Lab", status: "Ready", age: "11h", risk: "Normal" },
];

function App() {
  const [page, setPage] = React.useState<PageKey>("dashboard");

  return (
    <main>
      <nav className="navbar">
        <div className="brand">
          <div className="logo">BMW Waste OS</div>
          <div className="subtitle">Biomedical Waste Compliance Platform</div>
        </div>

        <div className="nav-links">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.key}
                className={`nav-btn ${page === item.key ? "active" : ""}`}
                onClick={() => setPage(item.key)}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </div>
      </nav>

      <section className="page-card">
        {page === "dashboard" && <Dashboard />}
        {page === "createBag" && <CreateBag />}
        {page === "bagTracking" && <BagTracking />}
        {page === "collection" && <SimplePage title="Collection Rounds" text="Start a route, scan bags, assign trolley batches, and scan into central storage." />}
        {page === "storage" && <Storage />}
        {page === "pickup" && <SimplePage title="Pickup Handover" text="Create manifest, scan-out bags, capture vehicle ID, receiver details, and digital confirmation." />}
        {page === "incidents" && <SimplePage title="Incident Management" text="Record spills, sharps risks, mis-segregation, leaking bags, and corrective actions." />}
        {page === "reports" && <SimplePage title="Reports" text="Generate daily registers, monthly summaries, annual packs, and inspection evidence." />}
      </section>
    </main>
  );
}

function Dashboard() {
  return (
    <>
      <p className="demo-label">Hospital-first MVP</p>
      <h2>Compliance Dashboard</h2>
      <p className="demo-description">
        Track biomedical waste movement from source segregation to central storage and pickup handover.
      </p>

      <div className="kpi-grid">
        <Kpi title="Bags Today" value="46" note="+12% from yesterday" />
        <Kpi title="In Storage" value="28" note="4 near threshold" danger />
        <Kpi title="Open Incidents" value="3" note="2 pending CAPA" />
        <Kpi title="Pickup SLA" value="94%" note="On-time this month" />
      </div>

      <h3 className="subsection-title">Live Bag Risk</h3>
      <BagTable />
    </>
  );
}

function Kpi({ title, value, note, danger = false }: { title: string; value: string; note: string; danger?: boolean }) {
  return (
    <div className={`featured-card ${danger ? "danger-card" : ""}`}>
      <span className="demo-label">{title}</span>
      <h3>{value}</h3>
      <p>{note}</p>
    </div>
  );
}

function CreateBag() {
  return (
    <>
      <p className="demo-label">Point of generation</p>
      <h2>Create Bag Unit</h2>

      <div className="form-card">
        <label>Department</label>
        <select>
          <option>OT</option>
          <option>ICU</option>
          <option>Lab</option>
          <option>Ward</option>
        </select>

        <label>Waste Category</label>
        <select>
          <option>Yellow</option>
          <option>Red</option>
          <option>White</option>
          <option>Blue</option>
        </select>

        <label>Approx Weight</label>
        <input placeholder="Example: 2.5 kg" />

        <button className="primary-btn">Create QR Bag</button>
      </div>
    </>
  );
}

function BagTracking() {
  return (
    <>
      <p className="demo-label">Chain of custody</p>
      <h2>Bag Tracking</h2>
      <BagTable />
    </>
  );
}

function Storage() {
  return (
    <>
      <p className="demo-label">48-hour threshold monitoring</p>
      <h2>Central BMW Storage</h2>

      <div className="section-grid">
        <StorageZone color="Yellow" bags="14" oldest="42h" risk="High" />
        <StorageZone color="Red" bags="21" oldest="18h" risk="Normal" />
        <StorageZone color="White" bags="7" oldest="11h" risk="Normal" />
      </div>
    </>
  );
}

function StorageZone({ color, bags, oldest, risk }: { color: string; bags: string; oldest: string; risk: string }) {
  return (
    <div className="card">
      <h3>{color} Zone</h3>
      <p><span>{bags}</span> bags currently stored</p>
      <p>Oldest bag: <span>{oldest}</span></p>
      <p>Risk: <span>{risk}</span></p>
    </div>
  );
}

function BagTable() {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Bag ID</th>
            <th>Category</th>
            <th>Department</th>
            <th>Status</th>
            <th>Age</th>
            <th>Risk</th>
          </tr>
        </thead>
        <tbody>
          {bags.map((bag) => (
            <tr key={bag.id}>
              <td>{bag.id}</td>
              <td>{bag.category}</td>
              <td>{bag.dept}</td>
              <td>{bag.status}</td>
              <td>{bag.age}</td>
              <td>
                <span className={`badge ${bag.risk === "High" ? "badge-danger" : ""}`}>
                  {bag.risk}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SimplePage({ title, text }: { title: string; text: string }) {
  return (
    <>
      <p className="demo-label">Module</p>
      <h2>{title}</h2>
      <p className="demo-description">{text}</p>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")!).render(<App />);