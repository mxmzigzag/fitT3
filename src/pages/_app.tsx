import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import { api } from "~/utils/api";

import AppLayout from "~/layouts/app.layout";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppLayout>
        <Component {...pageProps} />
        <Toaster />
      </AppLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
