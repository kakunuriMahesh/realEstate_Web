import {
  Flame,
  Warehouse,
  TreeDeciduous,
  Utensils,
  Fan,
  Shirt,
  Waves,
  Dumbbell,
  Car,
  ArrowUpDown,
  Shield,
  Users,
  Star,
  Gem,
  Key,
  Paintbrush,
  Leaf,
  Mountain,
  Tag,
  Bed,
  Bath,
  Ratio,
} from "lucide-react";

const iconMap = {
  Fireplace: Flame,
  Garage: Warehouse,
  "Hardwood Floors": TreeDeciduous,
  "Updated Kitchen": Utensils,
  "Central AC": Fan,
  "Walk-in Closet": Shirt,
  Pool: Waves,
  Gym: Dumbbell,
  Parking: Car,
  Elevator: ArrowUpDown,
  Security: Shield,
  Clubhouse: Users,
  New: Star,
  Luxury: Gem,
  "Move-in Ready": Key,
  Renovated: Paintbrush,
  "Eco-Friendly": Leaf,
  "Great View": Mountain,
};

const HouseCard = ({ house }) => {
  const housedetails = () => {
    window.location.href = `/houses/${house._id}`;
  };

  return (
    <div
      onClick={housedetails}
      className="bg-white rounded-lg shadow-md overflow-hidden w-[300px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <img
        src={house.coverImg.url}
        alt={house.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">{house.title}</h3>
        <p className="text-gray-600">
          {house.address.street}, {house.address.city}, {house.address.state}
        </p>
        <p className="text-blue-600 font-bold mt-1">
          ${house.price.toLocaleString()}{" "}
          {house.priceFrequency !== "One-Time"
            ? `/${house.priceFrequency}`
            : ""}
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {/* {house.features.map((f) => {
            const Icon = iconMap[f] || Tag;
            return (
              <span key={f} className="flex items-center text-gray-600 text-sm">
                <Icon className="h-4 w-4 mr-1" />
                {f}
              </span>
            );
          })}
          {house.amenities.map((a) => {
            const Icon = iconMap[a] || Tag;
            return (
              <span key={a} className="flex items-center text-gray-600 text-sm">
                <Icon className="h-4 w-4 mr-1" />
                {a}
              </span>
            );
          })}
          {house.labels.map((l) => {
            const Icon = iconMap[l] || Tag;
            return (
              <span key={l} className="flex items-center text-gray-600 text-sm">
                <Icon className="h-4 w-4 mr-1" />
                {l}
              </span>
            );
          })} */}
          {/* <div className="mt-2 flex flex-wrap gap-2">
            {house.features[0] && (
              <span
                key={`feature-${house.features[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(iconMap[house.features[0]] || Tag)({
                  className: "h-4 w-4 mr-1",
                })}
                {house.features[0]}
              </span>
            )}
            {house.amenities[0] && (
              <span
                key={`amenity-${house.amenities[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(iconMap[house.amenities[0]] || Tag)({
                  className: "h-4 w-4 mr-1",
                })}
                {house.amenities[0]}
              </span>
            )}
            {house.labels[0] && (
              <span
                key={`label-${house.labels[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(iconMap[house.labels[0]] || Tag)({
                  className: "h-4 w-4 mr-1",
                })}
                {house.labels[0]}
              </span>
            )}
          </div> */}
          {/* <div className="mt-2 flex flex-wrap gap-2">
            {house.features[0] && (
              <span
                key={`feature-${house.features[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(() => {
                  const Icon = iconMap[house.features[0]] || Tag;
                  return <Icon className="h-4 w-4 mr-1" />;
                })()}
                {house.features[0]}
              </span>
            )}
            {house.amenities[0] && (
              <span
                key={`amenity-${house.amenities[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(() => {
                  const Icon = iconMap[house.amenities[0]] || Tag;
                  return <Icon className="h-4 w-4 mr-1" />;
                })()}
                {house.amenities[0]}
              </span>
            )}
            {house.labels[0] && (
              <span
                key={`label-${house.labels[0]}`}
                className="flex items-center text-gray-600 text-sm"
              >
                {(() => {
                  const Icon = iconMap[house.labels[0]] || Tag;
                  return <Icon className="h-4 w-4 mr-1" />;
                })()}
                {house.labels[0]}
              </span>
            )}
          </div> */}
          <div className="flex gap-4 text-sm text-gray-700 mt-2">
                <div className="flex items-center gap-1">
                  <Bed size={16} /> {house.bedrooms} Beds
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={16} /> {house.bathrooms} Baths
                </div>
                <div className="flex items-center gap-1">
                  <Ratio size={16} /> {house.squareFootage} sq.ft
                </div>
              </div>
        </div>
      </div>
    </div>
  );
};

export default HouseCard;
