import { useState } from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { useDrawingArea } from "@mui/x-charts/hooks";
import { styled } from "@mui/material/styles";
import ScrollAnimation from "./ScrollAnimation";
import { DollarSign, Percent, Home } from "lucide-react";

const StyledText = styled("text")(({ theme }) => ({
  fill: theme.palette.text.primary,
  textAnchor: "middle",
  dominantBaseline: "central",
  fontSize: 20,
  fontWeight: "bold",
}));

function PieCenterLabel({ children }) {
  const { width, height, left, top } = useDrawingArea();
  return (
    <StyledText x={left + width / 2} y={top + height / 2}>
      {children}
    </StyledText>
  );
}

const MortgageCalculator = () => {
  const [form, setForm] = useState({
    totalAmount: "2500",
    downPayment: "15",
    interestRate: "3.5",
    loanTerm: "30",
    propertyTax: "1.2",
    homeInsurance: "2000",
    hoaFees: "250",
    pmi: "0",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const calculateMortgage = () => {
    const totalAmount = parseFloat(form.totalAmount) || 0;
    const downPaymentPercent = parseFloat(form.downPayment) || 0;
    const interestRate = parseFloat(form.interestRate) || 0;
    const loanTerm = parseInt(form.loanTerm) || 0;
    const propertyTax = parseFloat(form.propertyTax) || 0;
    const homeInsurance = parseFloat(form.homeInsurance) || 0;
    const hoaFees = parseFloat(form.hoaFees) || 0;
    const pmi = parseFloat(form.pmi) || 0;

    // Calculations
    const downPayment = totalAmount * (downPaymentPercent / 100);
    const loanAmount = totalAmount - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;
    const monthlyMortgage =
      loanAmount *
      ((monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) /
        (Math.pow(1 + monthlyRate, numberOfPayments) - 1));
    const monthlyPropertyTax = (totalAmount * (propertyTax / 100)) / 12;
    const monthlyHomeInsurance = homeInsurance / 12;
    const monthlyPMI = (loanAmount * (pmi / 100)) / 12;
    const totalMonthly =
      monthlyMortgage +
      monthlyPropertyTax +
      monthlyHomeInsurance +
      monthlyPMI +
      hoaFees;

    return {
      downPayment: downPayment.toFixed(2),
      loanAmount: loanAmount.toFixed(2),
      monthlyMortgage: monthlyMortgage.toFixed(2),
      propertyTax: monthlyPropertyTax.toFixed(2),
      homeInsurance: monthlyHomeInsurance.toFixed(2),
      pmi: monthlyPMI.toFixed(2),
      hoaFees: hoaFees.toFixed(2),
      totalMonthly: totalMonthly.toFixed(2),
    };
  };

  const results = calculateMortgage();

  const chartData = [
    {
      value: parseFloat(results.monthlyMortgage),
      label: "Monthly Mortgage Payment",
      color: "#3B82F6",
    },
    {
      value: parseFloat(results.propertyTax),
      label: "Property Tax (Monthly)",
      color: "#10B981",
    },
    {
      value: parseFloat(results.homeInsurance),
      label: "Home Insurance (Monthly)",
      color: "#F59E0B",
    },
    {
      value: parseFloat(results.hoaFees),
      label: "Monthly HOA Fees",
      color: "#6B7280",
    },
  ].filter((item) => item.value > 0);

  const COLORS = ["#3B82F6", "#10B981", "#F59E0B", "#6B7280"];

  return (
    <ScrollAnimation>
      <div className="bg-gray-100 py-8">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">
            Mortgage Calculator
          </h1>
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Chart and Results */}
            <div className="md:flex md:flex-row justify-center items-center">
              {/* Chart */}
              <div>
                {form.totalAmount ? (
                  <PieChart
                    series={[
                      {
                        data: chartData,
                        innerRadius: 80,
                        outerRadius: 120,
                        cx: 200,
                        cy: 200,
                      },
                    ]}
                    width={400}
                    height={400}
                    slotProps={{
                      legend: { hidden: true },
                    }}
                    sx={{
                      "& .MuiChartsSurface-root": {
                        "& path": {
                          fill: "transparent",
                          strokeWidth: 2,
                          stroke: (d) => d.data?.color || "#000",
                        },
                      },
                    }}
                  >
                    <PieCenterLabel>
                      ${results.totalMonthly}/month
                    </PieCenterLabel>
                  </PieChart>
                ) : (
                  <p className="text-gray-600 text-center">
                    Enter a total amount to see results.
                  </p>
                )}
              </div>
              {/* Results */}
              <div className="flex justify-center">

              <div className="flex flex-col gap-2 w-fit">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <p style={{color:"gray"}} className="text-sm">
                    Down Payment:{" "}
                    <span className="font-semibold">
                      ${results.downPayment}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Loan Amount:{" "}
                    <span className="font-semibold">${results.loanAmount}</span>
                  </p>
                </div>
                <div  style={{color:"gray"}} className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[0] }}
                  ></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Monthly Mortgage Payment:{" "}
                    <span className="font-semibold">
                      ${results.monthlyMortgage}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[1] }}
                  ></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Property Tax (Monthly):{" "}
                    <span className="font-semibold">
                      ${results.propertyTax}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[2] }}
                  ></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Home Insurance (Monthly):{" "}
                    <span className="font-semibold">
                      ${results.homeInsurance}
                    </span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    PMI (Monthly):{" "}
                    <span className="font-semibold">${results.pmi}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded-full"
                    style={{ backgroundColor: COLORS[3] }}
                  ></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Monthly HOA Fees:{" "}
                    <span className="font-semibold">${results.hoaFees}</span>
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full bg-gray-400"></div>
                  <p  style={{color:"gray"}} className="text-sm">
                    Total Monthly Payment:{" "}
                    <span className="font-semibold">
                      ${results.totalMonthly}
                    </span>
                  </p>
                </div>
              </div>
              </div>
            </div>
            {/* Form */}
            <div className="">
              <form className="flex flex-col justify-center items-center">
                <div className="flex flex-wrap gap-2">
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> Total Amount ($)
                    </label>
                    <input
                      type="number"
                      name="totalAmount"
                      value={form.totalAmount}
                      onChange={handleInputChange}
                      placeholder="e.g., 250000"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Percent className="h-4 w-4 mr-1" /> Down Payment (%)
                    </label>
                    <input
                      type="number"
                      name="downPayment"
                      value={form.downPayment}
                      onChange={handleInputChange}
                      step="0.1"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Percent className="h-4 w-4 mr-1" /> Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      name="interestRate"
                      value={form.interestRate}
                      onChange={handleInputChange}
                      step="0.1"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Home className="h-4 w-4 mr-1" /> Loan Term (Years)
                    </label>
                    <input
                      type="number"
                      name="loanTerm"
                      value={form.loanTerm}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Percent className="h-4 w-4 mr-1" /> Property Tax (%)
                    </label>
                    <input
                      type="number"
                      name="propertyTax"
                      value={form.propertyTax}
                      onChange={handleInputChange}
                      step="0.1"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> Home Insurance
                      ($/Year)
                    </label>
                    <input
                      type="number"
                      name="homeInsurance"
                      value={form.homeInsurance}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <DollarSign className="h-4 w-4 mr-1" /> Monthly HOA Fees
                      ($)
                    </label>
                    <input
                      type="number"
                      name="hoaFees"
                      value={form.hoaFees}
                      onChange={handleInputChange}
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                  <div className=" ">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <Percent className="h-4 w-4 mr-1" /> PMI (%)
                    </label>
                    <input
                      type="number"
                      name="pmi"
                      value={form.pmi}
                      onChange={handleInputChange}
                      step="0.1"
                      className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </ScrollAnimation>
  );
};

export default MortgageCalculator;

// import { useState } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import ScrollAnimation from "./ScrollAnimation";
// import { DollarSign, Percent, Home } from "lucide-react";

// const MortgageCalculator = () => {
//   const [form, setForm] = useState({
//     totalAmount: "",
//     downPayment: 15,
//     interestRate: 3.5,
//     loanTerm: 30,
//     propertyTax: 1.2,
//     homeInsurance: 2000,
//     hoaFees: 250,
//     pmi: 0,
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const calculateMortgage = () => {
//     const totalAmount = parseFloat(form.totalAmount) || 0;
//     const downPaymentPercent = parseFloat(form.downPayment) || 0;
//     const interestRate = parseFloat(form.interestRate) || 0;
//     const loanTerm = parseInt(form.loanTerm) || 0;
//     const propertyTax = parseFloat(form.propertyTax) || 0;
//     const homeInsurance = parseFloat(form.homeInsurance) || 0;
//     const hoaFees = parseFloat(form.hoaFees) || 0;
//     const pmi = parseFloat(form.pmi) || 0;

//     // Calculations
//     const downPayment = totalAmount * (downPaymentPercent / 100);
//     const loanAmount = totalAmount - downPayment;
//     const monthlyRate = interestRate / 100 / 12;
//     const numberOfPayments = loanTerm * 12;
//     const monthlyMortgage =
//       (loanAmount *
//         (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
//       (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
//     const monthlyPropertyTax = (totalAmount * (propertyTax / 100)) / 12;
//     const monthlyHomeInsurance = homeInsurance / 12;
//     const monthlyPMI = (loanAmount * (pmi / 100)) / 12;

//     return {
//       downPayment: downPayment.toFixed(2),
//       loanAmount: loanAmount.toFixed(2),
//       monthlyMortgage: monthlyMortgage.toFixed(2),
//       propertyTax: monthlyPropertyTax.toFixed(2),
//       homeInsurance: monthlyHomeInsurance.toFixed(2),
//       pmi: monthlyPMI.toFixed(2),
//       hoaFees: hoaFees.toFixed(2),
//     };
//   };

//   const results = calculateMortgage();

//   const chartData = [
//     { name: "Down Payment", value: parseFloat(results.downPayment) },
//     { name: "Loan Amount", value: parseFloat(results.loanAmount) },
//     { name: "Monthly Mortgage", value: parseFloat(results.monthlyMortgage) },
//     { name: "Property Tax", value: parseFloat(results.propertyTax) },
//     { name: "Home Insurance", value: parseFloat(results.homeInsurance) },
//     { name: "PMI", value: parseFloat(results.pmi) },
//     { name: "Monthly HOA Fees", value: parseFloat(results.hoaFees) },
//   ].filter((item) => item.value > 0);

//   const COLORS = [
//     "#3B82F6", // blue-600
//     "#10B981", // green-500
//     "#EF4444", // red-500
//     "#F59E0B", // yellow-500
//     "#8B5CF6", // purple-500
//     "#EC4899", // pink-500
//     "#6B7280", // gray-500
//   ];

//   return (
//     <div className="bg-gray-100 py-8">
//       <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
//         <h1 className="text-3xl font-bold text-gray-800 mb-6">
//           Mortgage Calculator
//         </h1>
//         <div className="flex flex-col lg:flex-row gap-8">
//           {/* Form */}
//           <div className="">
//             <form className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div className="flex flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <DollarSign className="h-4 w-4 mr-1" /> Total Amount ($)
//                   </label>
//                   <input
//                     type="number"
//                     name="totalAmount"
//                     value={form.totalAmount}
//                     onChange={handleInputChange}
//                     placeholder="e.g., 250000"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <Percent className="h-4 w-4 mr-1" /> Down Payment (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="downPayment"
//                     value={form.downPayment}
//                     onChange={handleInputChange}
//                     step="0.1"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <Percent className="h-4 w-4 mr-1" /> Interest Rate (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="interestRate"
//                     value={form.interestRate}
//                     onChange={handleInputChange}
//                     step="0.1"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <Home className="h-4 w-4 mr-1" /> Loan Term (Years)
//                   </label>
//                   <input
//                     type="number"
//                     name="loanTerm"
//                     value={form.loanTerm}
//                     onChange={handleInputChange}
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <Percent className="h-4 w-4 mr-1" /> Property Tax (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="propertyTax"
//                     value={form.propertyTax}
//                     onChange={handleInputChange}
//                     step="0.1"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <DollarSign className="h-4 w-4 mr-1" /> Home Insurance
//                     ($/Year)
//                   </label>
//                   <input
//                     type="number"
//                     name="homeInsurance"
//                     value={form.homeInsurance}
//                     onChange={handleInputChange}
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <DollarSign className="h-4 w-4 mr-1" /> Monthly HOA Fees ($)
//                   </label>
//                   <input
//                     type="number"
//                     name="hoaFees"
//                     value={form.hoaFees}
//                     onChange={handleInputChange}
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 flex items-center">
//                     <Percent className="h-4 w-4 mr-1" /> PMI (%)
//                   </label>
//                   <input
//                     type="number"
//                     name="pmi"
//                     value={form.pmi}
//                     onChange={handleInputChange}
//                     step="0.1"
//                     className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
//                   />
//                 </div>
//               </div>
//             </form>
//           </div>
//           {/* Chart */}
//           <div className="">
//             {form.totalAmount ? (
//               <PieChart width={400} height={400}>
//                 <Pie
//                   data={chartData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={120}
//                   fill="#8884d8"
//                   dataKey="value"
//                   // label={({ name, value }) => `${name}: $${value.toFixed(2)}`}
//                 >
//                   {chartData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 {
//                   chartData.map((e,i)=>(
//                     <div>{e.name}</div>
//                   ))
//                 }
//                 <Tooltip
//                   formatter={(value, name) => [`$${value.toFixed(2)}`, name]}
//                 />
//                 <Legend />
//               </PieChart>
//             ) : (
//               <p className="text-gray-600 text-center">
//                 Enter a total amount to see results.
//               </p>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MortgageCalculator;
