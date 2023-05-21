import React from "react";
import AddForm from "~/components/AddForm/AddForm";
import CardLayout from "~/layouts/card.layout";

function Add() {
  return (
    <CardLayout
      title="Add day"
      subtitle="Select a date and add the meals"
      withGoBack
    >
      <AddForm />
    </CardLayout>
  );
}

export default Add;
