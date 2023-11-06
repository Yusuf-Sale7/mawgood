import React from "react";
import TopAndOffers from "./TopAndOffers";
import Featured from "./Featured";
import Categories from "./Categories";
import TopProducts from "./TopProducts";
import Offers from "./Offers";
import Partners from "./Partners";

function Home() {
  return (
    <div>
      <TopAndOffers />
      <Featured />
      <Categories />
      <TopProducts />
      <Offers />
      <Partners />
    </div>
  );
}

export default Home;
