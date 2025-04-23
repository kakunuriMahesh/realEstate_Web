import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { DollarSign, Home, TrendingUp, Award } from "lucide-react";

const Counter = ({ value, prefix = "", suffix = "", duration = 2 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    stiffness: 100,
    damping: 30,
  });
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [springValue]);

  const formatNumber = (num) => {
    if (suffix === "B") return `${(num / 1_000_000_000).toFixed(1)}`;
    if (suffix === "M" || suffix === "M+")
      return `${(num / 1_000_000).toFixed(1)}`;
    return Math.floor(num).toLocaleString();
  };

  return (
    <motion.span ref={ref}>
      {prefix}
      {formatNumber(displayValue)}
      {suffix}
    </motion.span>
  );
};

const StatsCounter = () => {
  const stats = [
    {
      value: 2_000_000_000,
      prefix: "$",
      suffix: "B",
      label: "In Total Lifetime Sales",
      icon: <DollarSign className="h-8 w-8 text-gray-500" />,
    },
    {
      value: 3000,
      suffix: "+",
      label: "Sold Homes",
      icon: <Home className="h-8 w-8 text-gray-500" />,
    },
    {
      value: 155_000_000,
      prefix: "$",
      suffix: "M+",
      label: "In Sales in 2023",
      icon: <TrendingUp className="h-8 w-8 text-gray-500" />,
    },
    {
      value: 1,
      prefix: "#",
      label: "Ohio's Real Estate Agent",
      icon: <Award className="h-8 w-8 text-gray-500" />,
    },
  ];

  return (
    <div className="bg-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          Our Achievements
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg"
            >
              <div className="text-4xl font-bold flex items-center text-gray-800 mt-4">
                {stat.icon}
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;
