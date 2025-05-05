import React from 'react'
import { Link } from "react-router-dom";
import handleScrollToTop from '../Components/handleScrollToTop';

const ServicesScroll = () => {

  const brands = ["Appartment", "Townhouse", "Villa", "Rental", "Sale","Appartment", "Townhouse", "Villa", "Rental", "Sale"];


  return (
    <div>
        <div className=" bg-gradient-to-t from-green-950 to-black overflow-hidden py-4">
        <div className="brand-track">
          {brands.concat(brands).map((brand, idx) => (
            <Link
              key={idx}
              // to={`/${brand.toLowerCase()}`}
              to={`/contact`}
              className="brand-item"
              onClick={()=>handleScrollToTop()}
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