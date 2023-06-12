import React from "react";
import { useRouter } from "next/router";
import BackIcon from "~/assets/icons/back.icon";
import UserIcon from "~/assets/icons/user.icon";
import Link from "next/link";

type Props = {
  title: string;
  subtitle?: string;
  withGoBack?: boolean;
  children: React.ReactNode;
};

const CardLayout = ({
  title,
  subtitle,
  withGoBack = false,
  children,
}: Props) => {
  const router = useRouter();

  const goBack = () => {
    void router.back();
  };

  return (
    <div className="relative flex flex-col items-center rounded-xl bg-fDark px-8 py-5">
      <h1 className="mb-3 font-rubik text-4xl font-bold text-white">{title}</h1>
      <p className="font-italic mb-5 text-sm italic text-white">{subtitle}</p>
      {children}
      {withGoBack && (
        <button
          onClick={goBack}
          className="absolute left-3 top-3 rounded-lg bg-fOrange p-1"
        >
          <BackIcon className="text-fDark" />
        </button>
      )}
      <Link
        href="/user"
        className="absolute right-3 top-3 rounded-lg bg-fOrange p-1.5"
      >
        <UserIcon size={20} />
      </Link>
    </div>
  );
};

export default CardLayout;
