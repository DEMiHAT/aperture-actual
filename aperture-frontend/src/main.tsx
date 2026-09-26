import { lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Aperture from "./pages/Aperture";
import "./index.css";
const BeaconTour = lazy(() => import("./demo/BeaconTour"));
createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Aperture />} />
      <Route
        path="/beacon"
        element={
          <Suspense
            fallback={
              <div className="tour-loading">
                Preparing the Beacon walkthrough…
              </div>
            }
          >
            <BeaconTour />
          </Suspense>
        }
      />
      <Route path="*" element={<Aperture />} />
    </Routes>
  </BrowserRouter>,
);
