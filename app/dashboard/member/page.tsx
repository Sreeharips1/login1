
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-hot-toast";
// import { Loader, CheckCircle, XCircle } from "lucide-react";

// const MEMBERSHIP_PLANS = [
//   { name: "Monthly", price: 1000 },
//   { name: "Quarterly", price: 2500 },
//   { name: "Annual", price: 5000 },
// ];

// export default function DashboardHome() {
//   const [member, setMember] = useState<Record<string, any> | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);
//   const [paymentStatus, setPaymentStatus] = useState("Inactive");

//   useEffect(() => {
//     const fetchMemberData = async () => {
//       try {
//         const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
//           withCredentials: true,
//         });

//         setMember(data);
//         setPaymentStatus(data?.membershipStatus || "Inactive");
//       } catch (err: any) {
//         toast.error(err.response?.data?.message || "Failed to load member data");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMemberData();
//   }, []);

//   const handleSelectPlan = (plan: { name: string; price: number }) => {
//     setSelectedPlan(plan);
//   };

//   const handlePayment = async () => {
//     if (!selectedPlan) {
//       toast.error("Please select a membership plan");
//       return;
//     }

//     try {
//       const { data } = await axios.post(
//         `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/pay`,
//         { plan: selectedPlan.name, amount: selectedPlan.price },
//         { withCredentials: true }
//       );

//       if (data.paymentUrl) {
//         window.location.href = data.paymentUrl;
//       } else {
//         toast.error("Payment failed. Try again");
//       }
//     } catch (err: any) {
//       toast.error(err.response?.data?.message || "Error processing payment");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
//         <Loader className="animate-spin h-12 w-12 text-red-500" />
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 md:p-10 bg-gray-900 min-h-screen text-white">
//       {/* Welcome Section */}
//       <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center mb-10">
//         <h1 className="text-3xl font-bold">Welcome, {member?.name || "User"}</h1>
//         <p className="text-gray-400">{member?.email || "Email not available"}</p>
//         <p className="mt-4 flex items-center justify-center space-x-2">
//           <strong className="text-lg">Membership Status:</strong>
//           {paymentStatus === "Active" ? (
//             <span className="flex items-center text-green-400">
//               <CheckCircle className="h-5 w-5 mr-1" /> Active
//             </span>
//           ) : (
//             <span className="flex items-center text-red-400">
//               <XCircle className="h-5 w-5 mr-1" /> Inactive
//             </span>
//           )}
//         </p>
//       </div>

//       {/* Membership Plans Section */}
//       <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
//         <h2 className="text-2xl font-bold mb-6 text-center">Choose a Membership Plan</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//           {MEMBERSHIP_PLANS.map((plan) => (
//             <div
//               key={plan.name}
//               className={`p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
//                 selectedPlan?.name === plan.name
//                   ? "border-2 border-red-500 bg-gray-700"
//                   : "border border-gray-600 bg-gray-800 hover:border-red-400"
//               }`}
//               onClick={() => handleSelectPlan(plan)}
//             >
//               <h3 className="text-xl font-semibold text-center">{plan.name}</h3>
//               <p className="text-gray-300 text-center mt-2 text-lg">₹{plan.price}</p>
//             </div>
//           ))}
//         </div>

//         {/* Payment Button */}
//         <button
//           onClick={handlePayment}
//           className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg transition-all ${
//             paymentStatus === "Active"
//               ? "bg-gray-500 cursor-not-allowed"
//               : "bg-red-500 hover:bg-red-600"
//           }`}
//           disabled={paymentStatus === "Active"}
//         >
//           {paymentStatus === "Active" ? "Membership Active" : "Proceed to Payment"}
//         </button>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader, CheckCircle, XCircle } from "lucide-react";

const MEMBERSHIP_PLANS = [
  { name: "Monthly", price: 1000 },
  { name: "Quarterly", price: 2500 },
  { name: "Annual", price: 5000 },
];

interface Member {
  name: string;
  email: string;
  membershipStatus: "Active" | "Inactive";
}

export default function DashboardHome() {
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);
  const [paymentStatus, setPaymentStatus] = useState<"Active" | "Inactive">("Inactive");

  useEffect(() => {
    const fetchMemberData = async () => {
      try {
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/me`, {
          withCredentials: true,
        });

        setMember(data);
        setPaymentStatus(data?.membershipStatus || "Inactive");
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Failed to load member data");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMemberData();
  }, []);

  const handleSelectPlan = (plan: { name: string; price: number }) => {
    setSelectedPlan(plan);
  };

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast.error("Please select a membership plan");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/pay`,
        { plan: selectedPlan.name, amount: selectedPlan.price },
        { withCredentials: true }
      );

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Payment failed. Try again");
      }
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.message || "Error processing payment");
      } else {
        toast.error("Unexpected error occurred");
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loader className="animate-spin h-12 w-12 text-red-500" />
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-900 min-h-screen text-white">
      {/* Welcome Section */}
      <div className="bg-gray-800 p-6 rounded-xl shadow-lg text-center mb-10">
        <h1 className="text-3xl font-bold">Welcome, {member?.name || "User"}</h1>
        <p className="text-gray-400">{member?.email || "Email not available"}</p>
        <p className="mt-4 flex items-center justify-center space-x-2">
          <strong className="text-lg">Membership Status:</strong>
          {paymentStatus === "Active" ? (
            <span className="flex items-center text-green-400">
              <CheckCircle className="h-5 w-5 mr-1" /> Active
            </span>
          ) : (
            <span className="flex items-center text-red-400">
              <XCircle className="h-5 w-5 mr-1" /> Inactive
            </span>
          )}
        </p>
      </div>

      {/* Membership Plans Section */}
      <div className="bg-gray-800 p-8 rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Choose a Membership Plan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {MEMBERSHIP_PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105 ${
                selectedPlan?.name === plan.name
                  ? "border-2 border-red-500 bg-gray-700"
                  : "border border-gray-600 bg-gray-800 hover:border-red-400"
              }`}
              onClick={() => handleSelectPlan(plan)}
            >
              <h3 className="text-xl font-semibold text-center">{plan.name}</h3>
              <p className="text-gray-300 text-center mt-2 text-lg">₹{plan.price}</p>
            </div>
          ))}
        </div>

        {/* Payment Button */}
        <button
          onClick={handlePayment}
          className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg transition-all ${
            paymentStatus === "Active"
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-red-500 hover:bg-red-600"
          }`}
          disabled={paymentStatus === "Active"}
        >
          {paymentStatus === "Active" ? "Membership Active" : "Proceed to Payment"}
        </button>
      </div>
    </div>
  );
}



