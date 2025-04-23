import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Send } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    intent: "",
    budget: "",
    message: "",
  });
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setFormData((prev) => ({
      ...prev,
      intent: params.get("intent") || "",
      budget: params.get("budget") || "",
    }));
  }, [location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Send form data to backend (e.g., POST /contact)
    console.log("Form submitted:", formData);
    alert("Thank you for your inquiry! We'll get back to you soon.");
    setFormData({ name: "", email: "", intent: "", budget: "", message: "" });
  };

  return (
    <div className="bg-green-950 px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-200">Contact Us</h1>
        <form
          onSubmit={handleSubmit}
          className="mt-6 max-w-lg mx-auto space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
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
              required
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Intent
            </label>
            <input
              type="text"
              name="intent"
              value={formData.intent}
              onChange={handleChange}
              placeholder="e.g., Buy, Rent, Sell"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Budget
            </label>
            <input
              type="text"
              name="budget"
              value={formData.budget}
              onChange={handleChange}
              placeholder="e.g., $200,000 - $500,000"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
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
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center"
          >
            <Send className="h-5 w-5 mr-2" />
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
