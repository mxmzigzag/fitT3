import React, { useEffect } from "react";
import type { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";

import CardLayout from "~/layouts/card.layout";

import GoogleIcon from "~/assets/icons/google.icon";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.status === "authenticated") {
      void router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <CardLayout
      title="Log In"
      subtitle="That's easy! Just use your Google account :D"
    >
      <button
        onClick={() => void signIn()}
        className="rounded-lg bg-white p-3 hover:bg-slate-100"
      >
        <GoogleIcon width={24} height={24} className="text-fDark" />
      </button>
    </CardLayout>
  );
};

export default Login;
