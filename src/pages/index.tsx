import { type NextPage } from "next";
import Days from "~/components/Days/Days";

import CardLayout from "~/layouts/card.layout";

const Home: NextPage = () => {
  return (
    <CardLayout
      title="Calc your energy"
      subtitle="Select a day and start adding ingredients!"
    >
      <Days />
    </CardLayout>
  );
};

export default Home;
