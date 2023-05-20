import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

import Loader from "~/components/Loader/Loader";

import appBg from "~/assets/images/app-bg.webp";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status !== "loading" && session.status !== "authenticated") {
      void router.replace("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Head>
        <title>FitT3 | T3 Stack</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main
        className="flex h-full min-h-screen w-full items-center justify-center px-4 py-5"
        style={{ backgroundImage: `url(${appBg.src})` }}
      >
        <div className="w-full max-w-lg">
          {session.status === "loading" ? <Loader /> : children}
        </div>
      </main>
    </>
  );
};

export default AppLayout;
