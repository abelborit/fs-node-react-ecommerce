import { FilterWrapper } from "../../components/FilterWrapper";

export const CollectionPage = () => {
  return (
    <div className="flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t">
      {/* Filter Options */}
      <FilterWrapper />
    </div>
  );
};
