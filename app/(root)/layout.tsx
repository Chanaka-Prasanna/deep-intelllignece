import Navigation from "@/components/Navigation";
import React, { ReactNode } from "react";

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className="root-layout">
      <Navigation />
      {children}
    </div>
  );
};

export default RootLayout;
