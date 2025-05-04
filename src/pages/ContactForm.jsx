
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";
import contactImg from "../assets/contactform.jpg";
import handleScrollToTop from "../Components/handleScrollToTop";
import { setServiceState } from "../store/stateManage";
import { useDispatch } from "react-redux";
import { createContact } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      await createContact(formData);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
      setErrors({});
      toast.success("Thank you for your inquiry! We'll get back to you soon.");
    } catch (error) {
      toast.error("Failed to submit. Please try again.");
      console.error("Submission error:", error);
    }
  };

  return (
    <div onClick={() => dispatch(setServiceState(false))}>
      <Toaster toastOptions={{ style: { background: "#15803d", color: "#fff" } }} />
      {path === "contact" && (
        <div
          style={{
            backgroundImage: `url(${contactImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "end",
          }}
        >
          <div className="py-16 pt-[140px] bg-gradient-to-t from-black to-transparent">
            <div className="max-w-6xl p-4 text-white slide-in-text">
              <h1 className="text-4xl font-semibold md:text-7xl ">
                Contact Us
              </h1>
              <p className="mt-4 text-lg">
                Explore our listings for buying, renting, or selling properties.
              </p>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-black">Contact Us</h1>
          <form
            onSubmit={handleSubmit}
            className="mt-6 max-w-lg mx-auto space-y-4"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (123) 456-7890"
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                rows={4}
              />
              {errors.message && (
                <p className="mt-1 text-sm text-red-600">{errors.message}</p>
              )}
            </div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-green-800 text-white rounded-md hover:bg-green-900 flex items-center justify-center"
            >
              <Send className="h-5 w-5 mr-2" />
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;


// TODO: 


// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Send } from "lucide-react";
// import contactImg from "../assets/contactform.jpg";
// import handleScrollToTop from "../Components/handleScrollToTop";
// import { setServiceState } from "../store/stateManage";
// import { useDispatch } from "react-redux";
// import { createContact } from "../services/api";
// import toast, { Toaster } from "react-hot-toast";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     intent: "",
//     budget: "",
//     message: "",
//   });
//   const [errors, setErrors] = useState({});
//   const dispatch = useDispatch();
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setFormData((prev) => ({
//       ...prev,
//       intent: params.get("intent") || "",
//       budget: params.get("budget") || "",
//     }));
//   }, [location]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.name.trim()) {
//       newErrors.name = "Name is required";
//     }
//     if (!formData.email || !/^\S+@\S+\.\S+$/.test(formData.email)) {
//       newErrors.email = "Valid email is required";
//     }
//     if (!formData.message.trim()) {
//       newErrors.message = "Message is required";
//     }
//     return newErrors;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }

//     try {
//       await createContact(formData);
//       setFormData({ name: "", email: "", intent: "", budget: "", message: "" });
//       setErrors({});
//       toast.success("Thank you for your inquiry! We'll get back to you soon.");
//     } catch (error) {
//       toast.error("Failed to submit. Please try again.");
//       console.error("Submission error:", error);
//     }
//   };

//   return (
//     <div onClick={() => dispatch(setServiceState(false))}>
//       <Toaster toastOptions={{ style: { background: "#166534", color: "#fff" } }} />
//       {path === "contact" && (
//         <div
//           style={{
//             backgroundImage: `url(${contactImg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "end",
//           }}
//         >
//           <div className="py-16 pt-[140px] bg-gradient-to-t from-black to-transparent">
//             <div className="max-w-6xl p-4 text-white slide-in-text">
//               <h1 className="text-4xl font-semibold md:text-7xl ">
//                 Contact Us
//               </h1>
//               <p className="mt-4 text-lg">
//                 Explore our listings for buying, renting, or selling properties.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="bg-white px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-black">Contact Us</h1>
//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 max-w-lg mx-auto space-y-4"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//               {errors.name && (
//                 <p className="mt-1 text-sm text-red-600">{errors.name}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//               {errors.email && (
//                 <p className="mt-1 text-sm text-red-600">{errors.email}</p>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Intent
//               </label>
//               <input
//                 type="text"
//                 name="intent"
//                 value={formData.intent}
//                 onChange={handleChange}
//                 placeholder="e.g., Buy, Rent, Sell"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Budget
//               </label>
//               <input
//                 type="text"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleChange}
//                 placeholder="e.g., $200,000 - $500,000"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//                 rows={4}
//               />
//               {errors.message && (
//                 <p className="mt-1 text-sm text-red-600">{errors.message}</p>
//               )}
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-green-800 text-white rounded-md hover:bg-green-900 flex items-center justify-center"
//             >
//               <Send className="h-5 w-5 mr-2" />
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;


// TODO: adding api


// import { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { Send } from "lucide-react";
// import contactImg from "../assets/contactform.jpg";
// import handleScrollToTop from "../Components/handleScrollToTop";
// import { setServiceState } from "../store/stateManage";
// import { useDispatch } from "react-redux";

// const Contact = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     intent: "",
//     budget: "",
//     message: "",
//   });
//   const dispatch =  useDispatch()
//   const location = useLocation();
//   const path = location.pathname.split("/")[1];

//   useEffect(() => {
//     const params = new URLSearchParams(location.search);
//     setFormData((prev) => ({
//       ...prev,
//       intent: params.get("intent") || "",
//       budget: params.get("budget") || "",
//     }));
//   }, [location]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Form submitted:", formData);
//     alert("Thank you for your inquiry! We'll get back to you soon.");
//     setFormData({ name: "", email: "", intent: "", budget: "", message: "" });
//   };

//   return (
//     <div onClick={() => dispatch(setServiceState(false))}>
//       {path === "contact" && (
//         <div
//           style={{
//             backgroundImage: `url(${contactImg})`,
//             backgroundSize: "cover",
//             backgroundPosition: "center",
//             height: "100vh",
//             display: "flex",
//             flexDirection: "column",
//             justifyContent: "end",
//           }}
//         >
//           <div className="py-16 pt-[140px] bg-gradient-to-t from-black to-transparent">
//             <div className="max-w-6xl p-4 text-white slide-in-text">
//               <h1 className="text-4xl font-semibold md:text-7xl ">
//                 Contact Us
//               </h1>
//               <p className="mt-4 text-lg">
//                 Explore our listings for buying, renting, or selling properties.
//               </p>
//             </div>
//           </div>
//         </div>
//       )}
//       <div className="bg-white px-4 sm:px-6 lg:px-8 py-8">
//         <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//           <h1 className="text-3xl font-bold text-black">Contact Us</h1>
//           <form
//             onSubmit={handleSubmit}
//             className="mt-6 max-w-lg mx-auto space-y-4"
//           >
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Name
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 value={formData.name}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Intent
//               </label>
//               <input
//                 type="text"
//                 name="intent"
//                 value={formData.intent}
//                 onChange={handleChange}
//                 placeholder="e.g., Buy, Rent, Sell"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Budget
//               </label>
//               <input
//                 type="text"
//                 name="budget"
//                 value={formData.budget}
//                 onChange={handleChange}
//                 placeholder="e.g., $200,000 - $500,000"
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700">
//                 Message
//               </label>
//               <textarea
//                 name="message"
//                 value={formData.message}
//                 onChange={handleChange}
//                 className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <button
//               type="submit"
//               className="w-full py-2 px-4 bg-green-800 text-white rounded-md hover:bg-green-900 flex items-center justify-center"
//             >
//               <Send className="h-5 w-5 mr-2" />
//               Submit
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Contact;
