import React from "react";
import Header from "./dashboard/_components/Header";
import Footer from "./dashboard/_components/Footer";

function DashboardLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header stays on top */}
      <Header />

      {/* Main content grows to fill remaining space */}
      <main className="flex-grow mx-5 md:mx-20 lg:mx-36">
        {children}
      </main>

      {/* Footer stays pinned to the bottom */}
      <Footer />
    </div>
  );
}

export default DashboardLayout;
