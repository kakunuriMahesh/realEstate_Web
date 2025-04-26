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
      className="bg-green-800 border-2 border-b-0 border-t-amber-50 border-r-amber-50 border-l-amber-50 rounded-lg shadow-md overflow-hidden h-[335px] w-[270px] sm:w-[280px] lg:w-[300px] cursor-pointer hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden">
        <img
          src={house.coverImg.url}
          alt={house.title}
          className="w-full h-48 object-cover hover:scale-150 duration-300"
        />
        <h1 className="absolute top-2 left-2 bg-white rounded-md px-1">{house.status}</h1>
      </div>
      <div className="p-4 flex flex-col   to-green-800 bg-gradient-to-t from-black">
        <h3 className="text-lg font-semibold text-white truncate">{house.title}</h3>
        <p className=" text-sm truncate">
          {house.address.street}, {house.address.city}, {house.address.state}
        </p>
        <p className="text-blue-600 font-bold mt-1 text-sm">
          ${house.price.toLocaleString()}{" "}
          {house.priceFrequency !== "One-Time" ? `/${house.priceFrequency}` : ""}
        </p>
        <div className="mt-2 flex flex-wrap gap-2 flex-grow">
          <div className="h-fit flex gap-1 flex-wrap justify-start text-sm text-white">
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