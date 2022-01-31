import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Header from "./Header";
import ReconcileOption from "./ReconcileOption";
import ReconcileOptionDetail from "./ReconcileOptionDetail";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate replace to="/reconciliation" />} />
        <Route exact path='/reconciliation' element={<ReconcileOption />} />
        <Route exact path='/reconciliation/:option' element={<ReconcileOptionDetail />} />
      </Routes>

    </>
  );
}

export default App;