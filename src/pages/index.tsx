import { type NextPage } from "next";

import CardLayout from "~/layouts/card.layout";

const Home: NextPage = () => {
  return (
    <CardLayout>
      <h1 className="mb-3 font-rubik text-4xl font-bold text-white">
        Calc your energy
      </h1>
      <p className="font-italic mb-5 text-sm italic text-white">
        Select a day and start adding ingredients!
      </p>
    </CardLayout>
  );
};

export default Home;
