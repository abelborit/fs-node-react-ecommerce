import { BestSellers } from "../../components/BestSellers";
import { HeroComponent } from "../../components/HeroComponent";
import { LatestCollection } from "../../components/LatestCollection";
import { NewsletterBox } from "../../components/NewsletterBox";
import { OurPolicy } from "../../components/OurPolicy";

export const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full">
      <HeroComponent />

      <LatestCollection />

      <BestSellers />

      <OurPolicy />

      <NewsletterBox />
    </div>
  );
};
