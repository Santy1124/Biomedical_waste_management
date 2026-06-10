import React from "react";
import { Layout } from "./components/Layout";
import { demoUsers } from "./data/roles";
import { BagTracking } from "./pages/BagTracking";
import { CreateBag } from "./pages/CreateBag";
import { Dashboard } from "./pages/Dashboard";
import { FacilitySetup } from "./pages/FacilitySetup";
import { Incidents } from "./pages/Incidents";
import { Pickup } from "./pages/Pickup";
import { Reports } from "./pages/Reports";
import { Scanner } from "./pages/Scanner";
import { Storage } from "./pages/Storage";
import { Training } from "./pages/Training";
import type { DemoUser } from "./types/auth";
import type { PageKey } from "./types/bmw";
import { Compliance } from "./pages/Compliance";
import { Alerts } from "./pages/Alerts";
import { useBagStore } from "./store/bagStore";

export function App() {
  const loadBags = useBagStore((state) => state.loadBags);

  React.useEffect(() => {
    loadBags();
  }, [loadBags]);

  const [user, setUser] = React.useState<DemoUser>(demoUsers[0]);
  const [page, setPage] = React.useState<PageKey>(demoUsers[0].allowedPages[0]);

  const allowed = user.allowedPages.includes(page);

  return (
    <Layout
      page={page}
      setPage={setPage}
      user={user}
      setUser={setUser}
      users={demoUsers}
    >
      {!allowed && (
        <div className="card">
          <h3>Access Restricted</h3>
          <p>Your current role does not have access to this module.</p>
        </div>
      )}

      {allowed && page === "dashboard" && <Dashboard />}
      {allowed && page === "facility" && <FacilitySetup />}
      {allowed && page === "createBag" && <CreateBag />}
      {allowed && page === "bagTracking" && <BagTracking />}
      {allowed && page === "scanner" && <Scanner />}
      {allowed && page === "storage" && <Storage />}
      {allowed && page === "pickup" && <Pickup />}
      {allowed && page === "incidents" && <Incidents />}
      {allowed && page === "reports" && <Reports />}
      {allowed && page === "training" && <Training />}
      {allowed && page === "compliance" && (<Compliance />)}
      {allowed && page === "alerts" && <Alerts />}
    </Layout>
  );
}