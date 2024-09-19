import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FormDashboard from "../src/components/FormDashboard";
import FormCustomization from "../src/components/FormCustomization";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FormDashboard />} />
        <Route path="/customize/:formId" element={<FormCustomization />} />
      </Routes>
    </Router>
  );
};

export default App;
