import React from "react";
import appBg from "~/assets/images/app-bg.webp";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <main
      className="flex h-full min-h-screen w-full items-center justify-center"
      style={{ backgroundImage: `url(${appBg.src})` }}
    >
      <div className="w-full max-w-xl">{children}</div>
    </main>
  );
};

export default AppLayout;
