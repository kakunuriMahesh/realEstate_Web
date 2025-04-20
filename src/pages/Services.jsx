import { useState } from "react";

const Services = () => {
  const [activeTab, setActiveTab] = useState("sell");

  const tabs = {
    sell: {
      title: "Sell Your Property",
      content:
        "We help you sell your property quickly and at the best price. Our team provides professional staging, marketing, and negotiation services.",
    },
    purchase: {
      title: "Buy a Home",
      content:
        "Find your dream home with our expert guidance. We offer personalized search tools and market insights to match your needs.",
    },
    rental: {
      title: "Rent a Property",
      content:
        "Explore our rental listings for apartments, townhouses, and more. We ensure a smooth leasing process with flexible terms.",
    },
    management: {
      title: "Property Management",
      content:
        "Let us manage your investment properties. From tenant screening to maintenance, we handle it all for hassle-free ownership.",
    },
  };

  return (
    <div className="bg-green-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-200">Our Services</h1>
        <div className="mt-6">
          <div className="flex border-b">
            {Object.keys(tabs).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-600 hover:text-blue-600"
                }`}
              >
                {tabs[tab].title}
              </button>
            ))}
          </div>
          <div className="mt-4">
            <h2 className="text-xl font-semibold text-gray-800">
              {tabs[activeTab].title}
            </h2>
            <p className="mt-2 text-gray-600">{tabs[activeTab].content}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
