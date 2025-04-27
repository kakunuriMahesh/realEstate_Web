import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, X } from "lucide-react";

const ChatbotModel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [userData, setUserData] = useState({ intent: "", budget: "" });
  const navigate = useNavigate();

  const questions = [
    {
      text: "Are you looking to buy, rent, or sell a property?",
      options: ["Buy", "Rent", "Sell"],
      key: "intent",
    },
    {
      text: "What is your budget range?",
      options: ["Under $200,000", "$200,000 - $500,000", "Over $500,000"],
      key: "budget",
    },
  ];

  const handleOptionClick = (option) => {
    setUserData({ ...userData, [questions[step].key]: option });
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      navigate(`/contact?intent=${encodeURIComponent(option)}&budget=${encodeURIComponent(userData.budget)}`);
      setIsOpen(false);
      setStep(0);
      setUserData({ intent: "", budget: "" });
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-lg p-4 w-80 max-h-96 overflow-y-auto">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-700">Real Estate Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="mb-4">
            <p className="text-sm text-gray-600">{questions[step].text}</p>
            <div className="mt-2 space-y-2">
              {questions[step].options.map((option) => (
                <button
                  key={option}
                  onClick={() => handleOptionClick(option)}
                  className="w-full text-left px-3 py-2 bg-blue-100 text-blue-600 rounded-md hover:bg-blue-200"
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700"
        >
          <MessageCircle className="h-6 w-6" />
        </button>
      )}
    </div>
  );
};

export default ChatbotModel;