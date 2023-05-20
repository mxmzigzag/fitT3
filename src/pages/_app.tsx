import { useEffect, useState } from "react";
import { type AppType } from "next/app";
import { useRouter } from "next/router";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

import { api } from "~/utils/api";

import AppLayout from "~/layouts/app.layout";

import "~/styles/globals.css";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!session?.user.id) {
      void router.replace("/login");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <SessionProvider session={session}>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
