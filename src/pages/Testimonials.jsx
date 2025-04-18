const testimonials = [
    {
      name: "John Doe",
      text: "The team helped us find our dream home in just two weeks! Their expertise and dedication are unmatched.",
      role: "Home Buyer",
    },
    {
      name: "Jane Smith",
      text: "Selling our property was a breeze thanks to their professional marketing and negotiation skills.",
      role: "Seller",
    },
    {
      name: "Mike Johnson",
      text: "Their property management services have made owning rental properties stress-free and profitable.",
      role: "Landlord",
    },
  ];
  
  const Testimonials = () => {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-800">Testimonials</h1>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6">
              <p className="text-gray-600 italic">"{testimonial.text}"</p>
              <p className="mt-4 text-gray-800 font-semibold">{testimonial.name}</p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default Testimonials;