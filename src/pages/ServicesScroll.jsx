import React from 'react'
import { Link } from "react-router-dom";

const ServicesScroll = () => {

  const brands = ["Appartment", "Townhouse", "Villa", "Rental", "Sale","Appartment", "Townhouse", "Villa", "Rental", "Sale"];


  return (
    <div>
        <div className=" bg-gradient-to-t from-green-950 to-black overflow-hidden py-4">
        <div className="brand-track">
          {brands.concat(brands).map((brand, idx) => (
            <Link
              key={idx}
              to={`/${brand.toLowerCase()}`}
              className="brand-item"
            >
              {brand}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ServicesScroll