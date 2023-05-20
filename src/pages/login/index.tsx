import React from "react";
import type { NextPage } from "next";
import { signIn } from "next-auth/react";

import CardLayout from "~/layouts/card.layout";

import GoogleIcon from "~/assets/icons/google.icon";

const Login: NextPage = () => {
  return (
    <CardLayout>
      <div className="flex flex-col items-center">
        <h1 className="mb-3 font-rubik text-4xl font-bold text-white">
          Log In
        </h1>
        <p className="font-italic mb-5 text-sm italic text-white">
          That&apos;s easy! Just use your Google account :D
        </p>
        <button
          onClick={() => void signIn()}
          className="rounded-lg bg-white p-3 hover:bg-slate-100"
        >
          <GoogleIcon width={24} height={24} className="text-fDark" />
        </button>
      </div>
    </CardLayout>
  );
};

export default Login;
