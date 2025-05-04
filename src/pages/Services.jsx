

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import { useDispatch } from "react-redux";
import { addSellSubmission } from "../store/servicesStore";
import { createService } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const Services = () => {
  const { tab } = useParams(); // Get tab from URL (e.g., sell, rent)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Active tab state, default to 'sell' if no tab in URL
  const [activeTab, setActiveTab] = useState(tab || "sell");

  // Sync activeTab with URL param
  useEffect(() => {
    const validTabs = ["sell", "rent", "management", "go-green"];
    if (tab && validTabs.includes(tab)) {
      setActiveTab(tab);
    } else {
      setActiveTab("sell");
      navigate("/services/sell", { replace: true });
    }
  }, [tab, navigate]);

  // Handle tab change
  const handleTabChange = (newTab) => {
    setActiveTab(newTab);
    navigate(`/services/${newTab}`);
  };

  // Form state for Sell tab
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    propertyType: "",
    condition: "",
    doYouWant: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isDropdownOpen, setIsDropdownOpen] = useState({
    propertyType: false,
    condition: false,
    doYouWant: false,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  // Handle dropdown selection
  const handleDropdownSelect = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setIsDropdownOpen((prev) => ({ ...prev, [name]: false }));
  };

  // Toggle dropdown
  const toggleDropdown = (name) => {
    setIsDropdownOpen((prev) => ({
      ...prev,
      [name]: !prev[name],
      ...(name !== "propertyType" && { propertyType: false }),
      ...(name !== "condition" && { condition: false }),
      ...(name !== "doYouWant" && { doYouWant: false }),
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.propertyType)
      newErrors.propertyType = "Property type is required";
    if (!formData.condition) newErrors.condition = "Condition is required";
    if (!formData.doYouWant) newErrors.doYouWant = "Please select an option";
    if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Valid email is required";
    }
    if (
      !formData.phone ||
      !/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))
    ) {
      newErrors.phone = "Valid phone number is required";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      // Send to backend
      await createService(formData);
      // Dispatch to Redux
      dispatch(addSellSubmission(formData));
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        propertyType: "",
        condition: "",
        doYouWant: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
      toast.success("Submission successful!");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      console.error("Submission error:", error);
    }
  };

  // Dropdown options
  const propertyTypes = [
    "Commercial",
    "Condo",
    "House",
    "Residential",
    "Apartment",
  ];
  const conditions = ["Excellent", "Good", "Poor", "Fair"];
  const doYouWantOptions = [
    "Buy a Property",
    "Sell a Property",
    "Rent a Property",
  ];

  return (
    <div className="bg-green-950 py-12 px-4 pt-[80px] sm:px-6 lg:px-8 min-h-screen">
      <Toaster toastOptions={{ style: { background: "#115e59", color: "#fff" } }} />
      <div className="max-w-4xl mx-auto">
        {/* Tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {["sell", "rent", "go-green", "management"].map((tabOption) => (
            <button
              key={tabOption}
              onClick={() => handleTabChange(tabOption)}
              className={`px-4 py-2 text-sm rounded-md font-semibold ${
                activeTab === tabOption
                  ? "bg-green-900 text-white"
                  : "bg-gray-200 text-gray-800 hover:bg-gray-300"
              }`}
            >
              {tabOption
                .split("-")
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(" ")}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          {activeTab === "sell" && (
            <div>
              <h2
                style={{ color: "black" }}
                className="text-2xl font-bold mb-4"
              >
                Sell Your Property
              </h2>
              <p style={{ color: "gray" }} className=" mb-6">
                Select the suitable options below:
              </p>
              <form onSubmit={handleSubmit}>
                <div className="flex items-center flex-wrap gap-4">
                  <div className="flex gap-5">
                    {/* First Name */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder=""
                      />
                      {errors.firstName && (
                        <p style={{ color: "red" }} className="mt-1 text-sm">
                          {errors.firstName}
                        </p>
                      )}
                    </div>

                    {/* Last Name */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder=""
                      />
                      {errors.lastName && (
                        <p style={{ color: "red" }} className="mt-1 text-sm">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex gap-5">
                    {/* Property Type Dropdown */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Property Type
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown("propertyType")}
                          className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <span>
                            {formData.propertyType || "Select Property Type"}
                          </span>
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </button>
                        {isDropdownOpen.propertyType && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                            {propertyTypes.map((type) => (
                              <button
                                key={type}
                                type="button"
                                onClick={() =>
                                  handleDropdownSelect("propertyType", type)
                                }
                                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                              >
                                {type}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.propertyType && (
                        <p style={{ color: "red" }} className="mt-1 text-sm">
                          {errors.propertyType}
                        </p>
                      )}
                    </div>

                    {/* Condition Dropdown */}
                    <div className="mb-4">
                      <label className="block text-sm font-medium text-gray-700">
                        Condition
                      </label>
                      <div className="relative">
                        <button
                          type="button"
                          onClick={() => toggleDropdown("condition")}
                          className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                        >
                          <span>
                            {formData.condition || "Select Condition"}
                          </span>
                          <ChevronDown className="h-5 w-5 text-gray-500" />
                        </button>
                        {isDropdownOpen.condition && (
                          <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                            {conditions.map((cond) => (
                              <button
                                key={cond}
                                type="button"
                                onClick={() =>
                                  handleDropdownSelect("condition", cond)
                                }
                                className="w-full text-left px-3 py-2 hover:bg-gray-100"
                              >
                                {cond}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                      {errors.condition && (
                        <p style={{ color: "red" }} className="mt-1 text-sm">
                          {errors.condition}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Do You Want Dropdown */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Do You Want
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => toggleDropdown("doYouWant")}
                      className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <span>{formData.doYouWant || "Select an Option"}</span>
                      <ChevronDown className="h-5 w-5 text-gray-500" />
                    </button>
                    {isDropdownOpen.doYouWant && (
                      <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
                        {doYouWantOptions.map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() =>
                              handleDropdownSelect("doYouWant", option)
                            }
                            className="w-full text-left px-3 py-2 hover:bg-gray-100"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.doYouWant && (
                    <p style={{ color: "red" }} className="mt-1 text-sm">
                      {errors.doYouWant}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p style={{ color: "red" }} className="mt-1 text-sm">{errors.email}</p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="+1 (123) 456-7890"
                  />
                  {errors.phone && (
                    <p style={{ color: "red" }} className="mt-1 text-sm">{errors.phone}</p>
                  )}
                </div>

                {/* Message */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
                    rows={4}
                    placeholder="Tell us about your needs..."
                  />
                  {errors.message && (
                    <p style={{ color: "red" }} className="mt-1 text-sm">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  Submit
                </button>
              </form>
            </div>
          )}

          {activeTab === "rent" && (
            <div className="prose prose-teal max-w-none">
              <h2
                style={{ color: "black" }}
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Rent a Property
              </h2>
              <p style={{ color: "gray" }} className="text-gray-600">
                Discover your perfect rental with Heights Realty. Whether you're
                looking for a cozy apartment, a spacious house, or a commercial
                space, our team is here to help you find the ideal property. We
                offer personalized rental services, ensuring you get the best
                options tailored to your needs and budget.
              </p>
              <p style={{ color: "gray" }} className="text-gray-600">
                Contact us today to explore our rental listings and start your
                journey to finding your next home or business space!
              </p>
              <Link
                to="/services/sell"
                className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
              >
                Rent
              </Link>
            </div>
          )}

          {activeTab === "management" && (
            <div className="prose prose-teal max-w-none">
              <h2
                style={{ color: "black" }}
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Property Management
              </h2>
              <p style={{ color: "gray" }} className="text-gray-600">
                Heights Realty offers comprehensive property management services
                to maximize your investment. From tenant screening to
                maintenance and rent collection, we handle it all. Our goal is
                to make property ownership stress-free, ensuring your properties
                are well-maintained and profitable.
              </p>
              <p style={{ color: "gray" }} className="text-gray-600">
                Let us take care of your properties so you can focus on what
                matters most. Contact us to learn more about our management
                services!
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
              >
                Contact Us
              </Link>
            </div>
          )}

          {activeTab === "go-green" && (
            <div className="prose prose-teal max-w-none">
              <h2
                style={{ color: "black" }}
                className="text-2xl font-bold text-gray-800 mb-4"
              >
                Go Green
              </h2>
              <p style={{ color: "gray" }} className="text-gray-600">
                Contact Us today for a free 15-minute ‘Go Green’ consultation.
                Heights Realty specializes in sustainability. Want to learn more
                about solar, Electric Vehicle adaptations, composting,
                homesteading practices in the Heights, and more! Contact Us
                today!
              </p>
              <Link
                to="/contact"
                className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
              >
                Contact Us
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Services;


// TODO: adding api for sell

// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate, Link } from "react-router-dom";
// import { ChevronDown } from "lucide-react";
// import { useDispatch } from "react-redux";
// import { addSellSubmission } from "../store/servicesStore";

// const Services = () => {
//   const { tab } = useParams(); // Get tab from URL (e.g., sell, rent)
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   // Active tab state, default to 'sell' if no tab in URL
//   const [activeTab, setActiveTab] = useState(tab || "sell");

//   // Sync activeTab with URL param
//   useEffect(() => {
//     const validTabs = ["sell", "rent", "management", "go-green"];
//     if (tab && validTabs.includes(tab)) {
//       setActiveTab(tab);
//     } else {
//       setActiveTab("sell");
//       navigate("/services/sell", { replace: true });
//     }
//   }, [tab, navigate]);

//   // Handle tab change
//   const handleTabChange = (newTab) => {
//     setActiveTab(newTab);
//     navigate(`/services/${newTab}`);
//   };

//   // Form state for Sell tab
//   const [formData, setFormData] = useState({
//     firstName: "",
//     lastName: "",
//     propertyType: "",
//     condition: "",
//     doYouWant: "",
//     email: "",
//     phone: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const [isDropdownOpen, setIsDropdownOpen] = useState({
//     propertyType: false,
//     condition: false,
//     doYouWant: false,
//   });

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   // Handle dropdown selection
//   const handleDropdownSelect = (name, value) => {
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//     setIsDropdownOpen((prev) => ({ ...prev, [name]: false }));
//   };

//   // Toggle dropdown
//   const toggleDropdown = (name) => {
//     setIsDropdownOpen((prev) => ({
//       ...prev,
//       [name]: !prev[name],
//       ...(name !== "propertyType" && { propertyType: false }),
//       ...(name !== "condition" && { condition: false }),
//       ...(name !== "doYouWant" && { doYouWant: false }),
//     }));
//   };

//   // Validate form
//   const validate = () => {
//     const newErrors = {};
//     if (!formData.firstName.trim())
//       newErrors.firstName = "First name is required";
//     if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
//     if (!formData.propertyType)
//       newErrors.propertyType = "Property type is required";
//     if (!formData.condition) newErrors.condition = "Condition is required";
//     if (!formData.doYouWant) newErrors.doYouWant = "Please select an option";
//     if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Valid email is required";
//     }
//     if (
//       !formData.phone ||
//       !/^\+?\d{10,15}$/.test(formData.phone.replace(/\D/g, ""))
//     ) {
//       newErrors.phone = "Valid phone number is required";
//     }
//     if (!formData.message.trim()) newErrors.message = "Message is required";
//     return newErrors;
//   };

//   // Handle form submission
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     // Dispatch submission to Redux
//     dispatch(addSellSubmission(formData));

//     // Reset form
//     setFormData({
//       firstName: "",
//       lastName: "",
//       propertyType: "",
//       condition: "",
//       doYouWant: "",
//       email: "",
//       phone: "",
//       message: "",
//     });
//     setErrors({});
//     alert("Submission successful!"); // Replace with toast/notification
//   };

//   // Dropdown options
//   const propertyTypes = [
//     "Commercial",
//     "Condo",
//     "House",
//     "Residential",
//     "Apartment",
//   ];
//   const conditions = ["Excellent", "Good", "Poor", "Fair"];
//   const doYouWantOptions = [
//     "Buy a Property",
//     "Sell a Property",
//     "Rent a Property",
//   ];

//   return (
//     <div className="bg-green-950 py-12 px-4 pt-[80px] sm:px-6 lg:px-8 min-h-screen">
//       <div className="max-w-4xl mx-auto">
//         {/* Tabs */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           {["sell", "rent", "go-green", "management"].map((tabOption) => (
//             <button
//               key={tabOption}
//               onClick={() => handleTabChange(tabOption)}
//               className={`px-4 py-2 text-sm rounded-md font-semibold ${
//                 activeTab === tabOption
//                   ? "bg-green-900 text-white"
//                   : "bg-gray-200 text-gray-800 hover:bg-gray-300"
//               }`}
//             >
//               {tabOption
//                 .split("-")
//                 .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
//                 .join(" ")}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <div className="bg-white rounded-xl shadow-lg p-6">
//           {activeTab === "sell" && (
//             <div>
//               <h2
//                 style={{ color: "black" }}
//                 className="text-2xl font-bold mb-4"
//               >
//                 Sell Your Property
//               </h2>
//               <p style={{ color: "gray" }} className=" mb-6">
//                 Select the suitable options below:
//               </p>
//               <form onSubmit={handleSubmit}>
//                 <div className="flex items-center flex-wrap gap-4">
//                   <div className="flex gap-5">
//                     {/* First Name */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         First Name
//                       </label>
//                       <input
//                         type="text"
//                         name="firstName"
//                         value={formData.firstName}
//                         onChange={handleChange}
//                         // className="mt-1 w-full  rounded-md  focus:ring-teal-500 focus:border-teal-500"
//                         className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"

//                         placeholder=""
//                       />
//                       {errors.firstName && (
//                         <p style={{ color: "red" }} className="mt-1 text-sm">
//                           {errors.firstName}
//                         </p>
//                       )}
//                     </div>

//                     {/* Last Name */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Last Name
//                       </label>
//                       <input
//                         type="text"
//                         name="lastName"
//                         value={formData.lastName}
//                         onChange={handleChange}
//                         // className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                         className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"

//                         placeholder=""
//                       />
//                       {errors.lastName && (
//                         <p style={{ color: "red" }} className="mt-1 text-sm">
//                           {errors.lastName}
//                         </p>
//                       )}
//                     </div>
//                   </div>

//                   <div className="flex gap-5">
//                     {/* Property Type Dropdown */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Property Type
//                       </label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           onClick={() => toggleDropdown("propertyType")}
//                           className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         >
//                           <span>
//                             {formData.propertyType || "Select Property Type"}
//                           </span>
//                           <ChevronDown className="h-5 w-5 text-gray-500" />
//                         </button>
//                         {isDropdownOpen.propertyType && (
//                           <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
//                             {propertyTypes.map((type) => (
//                               <button
//                                 key={type}
//                                 type="button"
//                                 onClick={() =>
//                                   handleDropdownSelect("propertyType", type)
//                                 }
//                                 className="w-full text-left px-3 py-2 hover:bg-gray-100"
//                               >
//                                 {type}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                       {errors.propertyType && (
//                         <p style={{ color: "red" }} className="mt-1 text-sm">
//                           {errors.propertyType}
//                         </p>
//                       )}
//                     </div>

//                     {/* Condition Dropdown */}
//                     <div className="mb-4">
//                       <label className="block text-sm font-medium text-gray-700">
//                         Condition
//                       </label>
//                       <div className="relative">
//                         <button
//                           type="button"
//                           onClick={() => toggleDropdown("condition")}
//                           className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
//                         >
//                           <span>
//                             {formData.condition || "Select Condition"}
//                           </span>
//                           <ChevronDown className="h-5 w-5 text-gray-500" />
//                         </button>
//                         {isDropdownOpen.condition && (
//                           <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
//                             {conditions.map((cond) => (
//                               <button
//                                 key={cond}
//                                 type="button"
//                                 onClick={() =>
//                                   handleDropdownSelect("condition", cond)
//                                 }
//                                 className="w-full text-left px-3 py-2 hover:bg-gray-100"
//                               >
//                                 {cond}
//                               </button>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                       {errors.condition && (
//                         <p style={{ color: "red" }} className="mt-1 text-sm">
//                           {errors.condition}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Do You Want Dropdown */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Do You Want
//                   </label>
//                   <div className="relative">
//                     <button
//                       type="button"
//                       onClick={() => toggleDropdown("doYouWant")}
//                       className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"
//                     >
//                       <span>{formData.doYouWant || "Select an Option"}</span>
//                       <ChevronDown className="h-5 w-5 text-gray-500" />
//                     </button>
//                     {isDropdownOpen.doYouWant && (
//                       <div className="absolute z-10 w-full bg-white border border-gray-300 rounded-md shadow-lg mt-1">
//                         {doYouWantOptions.map((option) => (
//                           <button
//                             key={option}
//                             type="button"
//                             onClick={() =>
//                               handleDropdownSelect("doYouWant", option)
//                             }
//                             className="w-full text-left px-3 py-2 hover:bg-gray-100"
//                           >
//                             {option}
//                           </button>
//                         ))}
//                       </div>
//                     )}
//                   </div>
//                   {errors.doYouWant && (
//                     <p style={{ color: "red" }} className="mt-1 text-sm">
//                       {errors.doYouWant}
//                     </p>
//                   )}
//                 </div>

//                 {/* Email */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Email
//                   </label>
//                   <input
//                     type="email"
//                     name="email"
//                     value={formData.email}
//                     onChange={handleChange}
//                     // className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                     className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"

//                     placeholder="you@example.com"
//                   />
//                   {errors.email && (
//                     <p style={{ color: "red" }} className="mt-1 text-sm">{errors.email}</p>
//                   )}
//                 </div>

//                 {/* Phone Number */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Phone Number
//                   </label>
//                   <input
//                     type="tel"
//                     name="phone"
//                     value={formData.phone}
//                     onChange={handleChange}
//                     // className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                     className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"

//                     placeholder="+1 (123) 456-7890"
//                   />
//                   {errors.phone && (
//                     <p style={{ color: "red" }} className="mt-1 text-sm">{errors.phone}</p>
//                   )}
//                 </div>

//                 {/* Message */}
//                 <div className="mb-4">
//                   <label className="block text-sm font-medium text-gray-700">
//                     Message
//                   </label>
//                   <textarea
//                     name="message"
//                     value={formData.message}
//                     onChange={handleChange}
//                     // className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500"
//                     className="w-full bg-white border border-gray-300 rounded-md py-2 px-3 text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-teal-500"

//                     rows={4}
//                     placeholder="Tell us about your needs..."
//                   />
//                   {errors.message && (
//                     <p style={{ color: "red" }} className="mt-1 text-sm">
//                       {errors.message}
//                     </p>
//                   )}
//                 </div>

//                 {/* Submit Button */}
//                 <button
//                   type="submit"
//                   className="w-full bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//                 >
//                   Submit
//                 </button>
//               </form>
//             </div>
//           )}

//           {activeTab === "rent" && (
//             <div className="prose prose-teal max-w-none">
//               <h2
//                 style={{ color: "black" }}
//                 className="text-2xl font-bold text-gray-800 mb-4"
//               >
//                 Rent a Property
//               </h2>
//               <p style={{ color: "gray" }} className="text-gray-600">
//                 Discover your perfect rental with Heights Realty. Whether you're
//                 looking for a cozy apartment, a spacious house, or a commercial
//                 space, our team is here to help you find the ideal property. We
//                 offer personalized rental services, ensuring you get the best
//                 options tailored to your needs and budget.
//               </p>
//               <p style={{ color: "gray" }} className="text-gray-600">
//                 Contact us today to explore our rental listings and start your
//                 journey to finding your next home or business space!
//               </p>
//               <Link
//                 to="/contact"
//                 className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           )}

//           {activeTab === "management" && (
//             <div className="prose prose-teal max-w-none">
//               <h2
//                 style={{ color: "black" }}
//                 className="text-2xl font-bold text-gray-800 mb-4"
//               >
//                 Property Management
//               </h2>
//               <p style={{ color: "gray" }} className="text-gray-600">
//                 Heights Realty offers comprehensive property management services
//                 to maximize your investment. From tenant screening to
//                 maintenance and rent collection, we handle it all. Our goal is
//                 to make property ownership stress-free, ensuring your properties
//                 are well-maintained and profitable.
//               </p>
//               <p style={{ color: "gray" }} className="text-gray-600">
//                 Let us take care of your properties so you can focus on what
//                 matters most. Contact us to learn more about our management
//                 services!
//               </p>
//               <Link
//                 to="/contact"
//                 className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           )}

//           {activeTab === "go-green" && (
//             <div className="prose prose-teal max-w-none">
//               <h2
//                 style={{ color: "black" }}
//                 className="text-2xl font-bold text-gray-800 mb-4"
//               >
//                 Go Green
//               </h2>
//               <p style={{ color: "gray" }} className="text-gray-600">
//                 Contact Us today for a free 15-minute ‘Go Green’ consultation.
//                 Heights Realty specializes in sustainability. Want to learn more
//                 about solar, Electric Vehicle adaptations, composting,
//                 homesteading practices in the Heights, and more! Contact Us
//                 today!
//               </p>
//               <Link
//                 to="/contact"
//                 className="inline-block mt-4 bg-teal-700 text-white font-semibold py-2 px-4 rounded-md hover:bg-teal-600"
//               >
//                 Contact Us
//               </Link>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Services;
