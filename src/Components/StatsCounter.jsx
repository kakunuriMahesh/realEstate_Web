


import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { DollarSign, Home, TrendingUp, Award, Users, Briefcase, MapPin } from "lucide-react";
import { getStats } from "../services/api";
import toast, { Toaster } from "react-hot-toast";

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

const ShimmerStats = () => {
  return (
    <div className="bg-green-950 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
        <div className="bg-gray-300 h-8 w-1/3 rounded mb-8"></div>
        <div className="flex flex-wrap justify-center gap-6">
          {Array(4).fill().map((_, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg"
            >
              <div className="flex items-center">
                <div className="bg-gray-300 h-8 w-8 rounded-full mr-2"></div>
                <div className="bg-gray-300 h-10 w-24 rounded"></div>
              </div>
              <div className="bg-gray-300 h-5 w-32 mt-2 rounded"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const StatsCounter = () => {
  const [stats, setStats] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Map icon strings to lucide-react components
  const iconMap = {
    DollarSign: <DollarSign className="h-8 w-8 mr-2" />,
    Home: <Home className="h-8 w-8 mr-2" />,
    TrendingUp: <TrendingUp className="h-8 w-8 mr-2" />,
    Award: <Award className="h-8 w-8 mr-2" />,
    Users: <Users className="h-8 w-8 mr-2" />,
    Briefcase: <Briefcase className="h-8 w-8 mr-2" />,
    MapPin: <MapPin className="h-8 w-8 mr-2" />,
  };

  useEffect(() => {
    const fetchStats = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getStats();
        const data = Array.isArray(response.data) ? response.data : [];
        // Transform API data to match Counter props
        const transformedStats = data.map((stat) => ({
          value: stat.value,
          prefix: stat.title.includes("$") ? "$" : stat.title.includes("#") ? "#" : "",
          suffix: stat.title.includes("Billion") || stat.value >= 1_000_000_000 ? "B" :
                   stat.title.includes("Million") || stat.value >= 1_000_000 ? "M+" : 
                   stat.value > 1000 ? "+" : "",
          label: stat.title,
          icon: iconMap[stat.icon] || <DollarSign className={`h-8 w-8 ${stat.color} mr-2`} />,
          color: stat.color,
        }));
        setStats(transformedStats);
        setIsLoading(false);
      } catch (err) {
        // console.error("Error fetching stats:", err);
        // const errorMessage = err.response
        //   ? `Failed to load stats: ${err.response.status} ${err.response.statusText}`
        //   : "Network error: Unable to Racial and ethnic disparities in health insurance coverage rates among adults aged 18-64 have persisted, and in some cases grown, in recent years.
        // setError(errorMessage);
        toast.error(errorMessage);
        setIsLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (isLoading) {
    return (
      <div>
        <Toaster toastOptions={{ style: { background: "#115e59", color: "#fff" } }} />
        <ShimmerStats />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-green-950 py-12 text-center">
        <Toaster toastOptions={{ style: { background: "#115e59", color: "#fff" } }} />
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-green-950 py-12">
      <Toaster toastOptions={{ style: { background: "#115e59", color: "#fff" } }} />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold mb-8 text-amber-50">Our Achievements</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 rounded-lg"
            >
              <div className={`text-4xl text-amber-50 font-bold flex items-center mt-4 ${stat.color}`}>
                {stat.icon}
                <Counter
                  value={stat.value}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  duration={2}
                />
              </div>
              <p className="mt-2 text-amber-200">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;


// TODO:

// import { useEffect, useRef, useState } from "react";
// import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
// import { DollarSign, Home, TrendingUp, Award } from "lucide-react";

// const Counter = ({ value, prefix = "", suffix = "", duration = 2 }) => {
//   const ref = useRef(null);
//   const isInView = useInView(ref, { once: true, margin: "0px 0px -50px 0px" });
//   const motionValue = useMotionValue(0);
//   const springValue = useSpring(motionValue, {
//     duration: duration * 1000,
//     stiffness: 100,
//     damping: 30,
//   });
//   const [displayValue, setDisplayValue] = useState(0);

//   useEffect(() => {
//     if (isInView) {
//       motionValue.set(value);
//     }
//   }, [isInView, motionValue, value]);

//   useEffect(() => {
//     const unsubscribe = springValue.on("change", (latest) => {
//       setDisplayValue(latest);
//     });
//     return () => unsubscribe();
//   }, [springValue]);

//   const formatNumber = (num) => {
//     if (suffix === "B") return `${(num / 1_000_000_000).toFixed(1)}`;
//     if (suffix === "M" || suffix === "M+")
//       return `${(num / 1_000_000).toFixed(1)}`;
//     return Math.floor(num).toLocaleString();
//   };

//   return (
//     <motion.span ref={ref}>
//       {prefix}
//       {formatNumber(displayValue)}
//       {suffix}
//     </motion.span>
//   );
// };

// const StatsCounter = () => {
//   const stats = [
//     {
//       value: 2_000_000_000,
//       prefix: "$",
//       suffix: "B",
//       label: "In Total Lifetime Sales",
//       icon: <DollarSign className="h-8 w-8 text-amber-200 mr-2" />,
//     },
//     {
//       value: 3000,
//       suffix: "+",
//       label: "Sold Homes",
//       icon: <Home className="h-8 w-8 text-amber-200 mr-2" />,
//     },
//     {
//       value: 155_000_000,
//       prefix: "$",
//       suffix: "M+",
//       label: "In Sales in 2023",
//       icon: <TrendingUp className="h-8 w-8 text-amber-200 mr-2" />,
//     },
//     {
//       value: 1,
//       prefix: "#",
//       label: "Ohio's Real Estate Agent",
//       icon: <Award className="h-8 w-8 text-amber-200 mr-2" />,
//     },
//   ];

//   return (
//     <div className="bg-green-950 py-12">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h2 className="text-3xl font-bold mb-8">
//           Our Achievements
//         </h2>
//         <div className="flex flex-wrap justify-center gap-6">
//           {stats.map((stat, index) => (
//             <div
//               key={index}
//               className="flex flex-col items-center text-center p-6 rounded-lg"
//             >
//               <div className="text-4xl text-amber-50 font-bold flex items-center mt-4">
//                 {stat.icon}
//                 <Counter
//                   value={stat.value}
//                   prefix={stat.prefix}
//                   suffix={stat.suffix}
//                   duration={2}
//                 />
//               </div>
//               <p className="mt-2">{stat.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StatsCounter;
