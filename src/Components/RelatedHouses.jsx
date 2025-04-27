import { useState, useEffect } from 'react';
import { getHouses } from '../services/api';
import HouseCard from './HouseCardItems';
import ScrollAnimation from './ScrollAnimation';

const RelatedHouses = ({ currentHouseId, propertyType, price }) => {
  const [relatedHouses, setRelatedHouses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRelatedHouses = async () => {
      try {
        const response = await getHouses();
        const houses = response.data.filter(
          (house) =>
            house._id !== currentHouseId &&
            house.isActive &&
            (house.propertyType === propertyType ||
              Math.abs(house.price - price) / price <= 0.2)
        );
        setRelatedHouses(houses.slice(0, 3)); // Limit to 3 houses
        setLoading(false);
      } catch (error) {
        console.error('Error fetching related houses:', error);
        setLoading(false);
      }
    };
    fetchRelatedHouses();
  }, [currentHouseId, propertyType, price]);

  if (loading) return <p className="text-gray-600 text-center">Loading related houses...</p>;
  if (relatedHouses.length === 0) return null;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 style={{color:"black"}} className="text-2xl font-semibold text-gray-800 mb-6">Related Properties</h2>
      <div className=" flex items-center max-w-6xl overflow-x-scroll mx-auto px-4 sm:px-6 lg:px-8 py-8 gap-3">
        {relatedHouses.map((house) => (
          <ScrollAnimation key={house._id}>
              <HouseCard house={house} />
          </ScrollAnimation>
        ))}
      </div>
    </div>
  );
};

export default RelatedHouses;