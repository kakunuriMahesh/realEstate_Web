import React from "react";
import { Bed, Bath, Ratio } from "lucide-react";

const ShimmerHouseCard = () => {
  return (
    <div className="bg-green-800 border-2 border-b-0 border-t-amber-50 border-r-amber-50 border-l-amber-50 rounded-lg shadow-md overflow-hidden h-[335px] sm:w-[270px] lg:w-[270px] animate-pulse">
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <div className="w-full h-48 bg-gray-300 shimmer"></div>
        <div className="absolute top-2 left-2 bg-gray-300 rounded-md px-1 w-16 h-6 shimmer"></div>
      </div>
      {/* Content Section */}
      <div className="p-4 flex flex-col to-green-800 bg-gradient-to-t from-black">
        {/* Title */}
        <div className="bg-gray-300 h-6 w-3/4 rounded shimmer mb-2"></div>
        {/* Address */}
        <div className="bg-gray-300 h-4 w-1/2 rounded shimmer mb-2"></div>
        {/* Price */}
        <div className="bg-gray-300 h-5 w-1/3 rounded shimmer mb-2"></div>
        {/* Details */}
        <div className="mt-2 flex flex-wrap gap-2 flex-grow">
          <div className="h-fit flex gap-1 flex-wrap justify-start text-sm">
            <div className="flex items-center gap-1">
              <Bed size={16} className="text-gray-300" />
              <div className="bg-gray-300 h-4 w-12 rounded shimmer"></div>
            </div>
            <div className="flex items-center gap-1">
              <Bath size={16} className="text-gray-300" />
              <div className="bg-gray-300 h-4 w-12 rounded shimmer"></div>
            </div>
            <div className="flex items-center gap-1">
              <Ratio size={16} className="text-gray-300" />
              <div className="bg-gray-300 h-4 w-12 rounded shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShimmerHouseCard;