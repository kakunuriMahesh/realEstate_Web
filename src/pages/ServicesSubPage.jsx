import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getHouses } from '../services/api';
// import HouseCard from '../Components/HouseCardItems';
import ScrollAnimation from '../Components/ScrollAnimatSmooth';

// FIXME: change this file to sub services

const ServicesSubPage = () => {
  const { type } = useParams(); // e.g., sell, purchase, rental, management
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const response = await getHouses();
        const filteredHouses = response.data.filter((house) => {
          if (type === 'sell' || type === 'purchase') {
            return house.status === 'Sale' || house.status === 'Pending';
          }
          if (type === 'rental') {
            return house.status === 'Rent';
          }
          if (type === 'management') {
            return house.status === 'Rent' || house.propertyType === 'Villa' || house.propertyType === 'Townhouse';
          }
          return true;
        });
        setHouses(filteredHouses);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching houses:', err);
        setError('Failed to load houses.');
        setLoading(false);
      }
    };
    fetchHouses();
  }, [type]);

  const getTitle = () => {
    switch (type) {
      case 'sell':
        return 'Properties for Sale';
      case 'purchase':
        return 'Properties to Purchase';
      case 'rental':
        return 'Properties for Rent';
      case 'management':
        return 'Property Management';
      default:
        return 'Our Services';
    }
  };

  return (
    <div className="bg-gray-100 py-8">
      {/* <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">{getTitle()}</h1>
        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-600">{error}</p>
        ) : houses.length === 0 ? (
          <p className="text-gray-600">No properties available for this service.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {houses.map((house) => (
              <ScrollAnimation key={house._id}>
                <HouseCard house={house} />
              </ScrollAnimation>
            ))}
          </div>
        )}
      </div> */}
    </div>
  );
};

export default ServicesSubPage;