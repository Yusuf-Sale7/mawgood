import React from "react";
import TopBar from "./layouts/TopBar";
import Navbar from "./layouts/Navbar";
import Footer from "./layouts/Footer";
import AppRoutes from "./routes/index";

function App() {
  return (
    <>
      <TopBar />
      <Navbar />
      <AppRoutes />
      <Footer />
    </>
  );
}

export default App;
