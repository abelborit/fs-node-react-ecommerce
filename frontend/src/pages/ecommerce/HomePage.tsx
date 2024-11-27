import { BestSellers } from "../../components/BestSellers";
import { HeroComponent } from "../../components/HeroComponent";
import { LatestCollection } from "../../components/LatestCollection";

export const HomePage = () => {
  return (
    <div>
      <HeroComponent />

      <LatestCollection />

      <BestSellers />
    </div>
  );
};
