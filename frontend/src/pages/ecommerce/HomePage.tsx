import { BestSellers } from "../../components/BestSellers";
import { HeroComponent } from "../../components/HeroComponent";
import { LatestCollection } from "../../components/LatestCollection";
import { NewsletterBox } from "../../components/NewsletterBox";
import { OurPolicy } from "../../components/OurPolicy";

export const HomePage = () => {
  return (
    <div>
      <HeroComponent />

      <LatestCollection />

      <BestSellers />

      <OurPolicy />

      <NewsletterBox />
    </div>
  );
};
