import { HeroComponent } from "../../components/HeroComponent";
import { LatestCollection } from "../../components/LatestCollection";

export const HomePage = () => {
  return (
    <div>
      <HeroComponent />

      <LatestCollection />
    </div>
  );
};
