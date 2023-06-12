import { signOut, useSession } from "next-auth/react";
import React from "react";
import Button from "~/components/Button/Button";
import UserForm from "~/components/UserForm/UserForm";
import CardLayout from "~/layouts/card.layout";

function User() {
  const { data } = useSession();

  const handleLogout = () => {
    void signOut();
  };

  return (
    <CardLayout
      title={data?.user.name || "User"}
      subtitle="Select a calories plan and other stuff"
      withGoBack
    >
      <UserForm />
      <Button variant="danger" onClick={handleLogout} className="mt-2.5">
        Logout
      </Button>
    </CardLayout>
  );
}

export default User;
