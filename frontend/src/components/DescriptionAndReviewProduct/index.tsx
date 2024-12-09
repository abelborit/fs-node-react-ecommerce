import { useState } from "react";
import { fakeRatingProductAndComments } from "../../../database_local/fakeRatingProductAndComments.json";

export const DescriptionAndReviewProduct = () => {
  const [activeTab, setActiveTab] = useState<"description" | "reviews">(
    "description"
  );

  const handleTabChange = (tab: "description" | "reviews") => {
    setActiveTab(tab);
  };

  return (
    <div className="mt-20">
      {/* Tab Navigation */}
      <div className="flex">
        <button
          className={`border px-5 py-3 text-sm ${
            activeTab === "description" ? "bg-gray-100 font-semibold" : ""
          }`}
          onClick={() => handleTabChange("description")}
        >
          Description
        </button>

        <button
          className={`border px-5 py-3 text-sm ${
            activeTab === "reviews" ? "bg-gray-100 font-semibold" : ""
          }`}
          onClick={() => handleTabChange("reviews")}
        >
          Reviews ({fakeRatingProductAndComments.length})
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "description" ? (
        <div className="flex flex-col gap-4 border px-6 py-6 text-xs text-gray-500">
          <p>
            An e-commerce website is an online platform that facilitates the
            buying and selling of products or services over the internet. It
            serves as a virtual marketplace where businesses and individuals can
            showcase their products, interact with customers, and conduct
            transactions without the need for a physical presence. E-commerce
            websites have gained immense popularity due to their convenience,
            accessibility, and the global reach they offer.
          </p>

          <p>
            E-commerce websites typically display products or services along
            with detailed descriptions, images, prices, and any available
            variations (e.g., sizes, colors). Each product usually has its own
            dedicated page with relevant information.
          </p>
        </div>
      ) : (
        <div className="flex flex-col gap-4 border px-6 py-6 text-xs text-gray-500 max-h-80 overflow-y-auto">
          {fakeRatingProductAndComments.map((item, index) => (
            <div
              key={index}
              className="border-b pb-4 mb-4 flex flex-col gap-2 last:border-b-0 last:pb-0"
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">
                  {item.user.name || "Anonymous"}
                </span>

                <p>
                  <span className="text-orange-500">
                    {"★".repeat(item.rating)}
                  </span>

                  <span className="text-gray-400">
                    {"★".repeat(5 - item.rating)}
                  </span>
                  {/* <span className="text-gray-400">{"☆".repeat(5 - item.rating)}</span> */}
                </p>
              </div>

              <p>{item.user.comments}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
