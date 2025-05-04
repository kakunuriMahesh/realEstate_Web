import React from "react";
import { Bed, Bath, Ratio, Tag } from "lucide-react";

const ShimmerPropertyDetails = () => {
  return (
    <div className="bg-gray-100 min-h-screen animate-pulse">
      <div className="property-container gap-5 p-8 pl-14 pr-14 mt-[40px] grid lg:grid-cols-2">
        {/* Cover Image */}
        <div className="row-span-4 min-w-[40%]">
          <div className="rounded-[30px] h-[550px] w-full bg-gray-500 shimmer" />
        </div>

        {/* Additional Images */}
        <div className="row-span-2 house-detail-images min-w-[60%] grid md:grid-cols-2 sm:grid-cols-1 gap-4 justify-center">
          {Array(4).fill().map((_, index) => (
            <div key={index} className="relative">
              <div className="rounded-[30px] h-[268px] w-full bg-gray-500 shimmer" />
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex flex-col md:flex-row gap-6 p-6 property-container">
          {/* Left Section */}
          <div className="w-full md:w-2/3 space-y-6">
            {/* Title */}
            <div className="bg-gray-500 h-8 w-3/4 rounded shimmer" />
            {/* Address */}
            <div className="flex items-center gap-2">
              <div className="bg-gray-500 h-4 w-1/2 rounded shimmer" />
            </div>
            {/* Details */}
            <div className="flex gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Bed size={16} className="text-gray-300" />
                <div className="bg-gray-500 h-4 w-16 rounded shimmer" />
              </div>
              <div className="flex items-center gap-1">
                <Bath size={16} className="text-gray-300" />
                <div className="bg-gray-500 h-4 w-16 rounded shimmer" />
              </div>
              <div className="flex items-center gap-1">
                <Ratio size={16} className="text-gray-300" />
                <div className="bg-gray-500 h-4 w-16 rounded shimmer" />
              </div>
            </div>
            {/* Overview */}
            <div>
              <div className="bg-gray-500 h-6 w-1/4 rounded shimmer mb-2" />
              <div className="bg-gray-500 h-32 w-full rounded shimmer" />
            </div>
            {/* Description */}
            <div>
              <div className="bg-gray-500 h-6 w-1/4 rounded shimmer mb-2" />
              <div className="bg-gray-500 h-48 w-full rounded shimmer" />
            </div>
            {/* Features */}
            <div>
              <div className="bg-gray-500 h-6 w-1/4 rounded shimmer mb-2" />
              <ul className="list-disc list-inside space-y-2">
                {Array(5).fill().map((_, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Tag size={16} className="text-gray-300" />
                    <div className="bg-gray-500 h-4 w-1/3 rounded shimmer" />
                  </li>
                ))}
              </ul>
            </div>
            {/* Amenities */}
            <div>
              <div className="bg-gray-500 h-6 w-1/4 rounded shimmer mb-2" />
              <div className="flex flex-wrap gap-2">
                {Array(6).fill().map((_, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 border rounded-full px-3 py-1"
                  >
                    <Tag size={16} className="text-gray-300" />
                    <div className="bg-gray-500 h-4 w-16 rounded shimmer" />
                  </span>
                ))}
              </div>
            </div>
            {/* Labels */}
            <div>
              <div className="bg-gray-500 h-6 w-1/4 rounded shimmer mb-2" />
              <div className="flex flex-wrap gap-2">
                {Array(3).fill().map((_, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-1 border rounded-full px-3 py-1"
                  >
                    <Tag size={16} className="text-gray-300" />
                    <div className="bg-gray-500 h-4 w-16 rounded shimmer" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:w-1/3">
            <section className="p-6 space-y-4 shadow-lg bg-white rounded-2xl">
              {/* Price */}
              <div className="text-center">
                <div className="bg-gray-500 h-5 w-1/2 mx-auto rounded shimmer mb-1" />
                <div className="bg-gray-500 h-8 w-3/4 mx-auto rounded shimmer mb-1" />
                <div className="bg-gray-500 h-4 w-2/3 mx-auto rounded shimmer" />
              </div>
              {/* Button */}
              <div className="bg-gray-500 h-10 w-full rounded-md shimmer" />
              <hr className="border-gray-300" />
              {/* Agent */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-500 shimmer" />
                <div className="space-y-1">
                  <div className="bg-gray-500 h-4 w-24 rounded shimmer" />
                  <div className="bg-gray-500 h-3 w-32 rounded shimmer" />
                </div>
              </div>
              {/* Email */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-500 h-4 w-40 rounded shimmer" />
              </div>
              {/* Phone */}
              <div className="flex items-center gap-2">
                <div className="bg-gray-500 h-4 w-32 rounded shimmer" />
              </div>
            </section>
          </div>
        </div>
      </div>
      {/* Placeholder for MortgageCalculator, RelatedHouses, ContactForm, ReviewForm */}
      <div className="p-6 space-y-6">
        <div className="bg-gray-500 h-64 w-full rounded shimmer" />
        <div className="bg-gray-500 h-96 w-full rounded shimmer" />
        <div className="bg-gray-500 h-48 w-full rounded shimmer" />
        <div className="bg-gray-500 h-80 w-full rounded shimmer" />
      </div>
    </div>
  );
};

export default ShimmerPropertyDetails;