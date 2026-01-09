import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import BudgetPage from "../src/pages/BudgetPage";
import Itinerary from "../src/pages/Itinerary";
import AppLayout from "../src/layout/AppLayout";

function App() {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route path="/budget" element={<BudgetPage />} />
          <Route path="/itinerary" element={<Itinerary />} />
        </Routes>
      </AppLayout>
    </Router>
  );
}

export default App;
