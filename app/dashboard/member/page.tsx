
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios"; // ❌ Removed unused { AxiosError }
// import { toast } from "react-hot-toast";
// import { Loader, CheckCircle, XCircle } from "lucide-react";
// import useUserStore from "../../../stores/userStore";

// const MEMBERSHIP_PLANS = [
//   { name: "Monthly", price: 1000 },
//   { name: "Quarterly", price: 2500 },
//   { name: "Annual", price: 5000 },
// ];

// export default function DashboardHome() {
//   const { user, isAuthenticated } = useUserStore();
//   const [loading, setLoading] = useState(true);
//   const [membershipStatus, setMembershipStatus] = useState<"Active" | "Inactive">("Inactive");
//   const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);

//   useEffect(() => {
//     const fetchMembershipStatus = async () => {
//       if (!isAuthenticated || !user) {
//         setLoading(false);
//         return;
//       }

//       try {
//         const { data } = await axios.get(
//           `${process.env.NEXT_PUBLIC_API_BASE_URL}/members/status`,
//           { withCredentials: true }
//         );
//         setMembershipStatus(data?.status || "Inactive");
//       } catch (err: unknown) {  // ✅ Corrected `any` -> `unknown`
//         if (axios.isAxiosError(err)) {  // ✅ Type assertion
//           toast.error(err.response?.data?.message || "Failed to load membership status");
//         } else {
//           toast.error("An unexpected error occurred");
//         }
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchMembershipStatus();
//   }, [isAuthenticated, user]);

//   const handleSelectPlan = (plan: { name: string; price: number }) => setSelectedPlan(plan);

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
//         alert("Payment failed. Try again");
//       }
//     } catch (err) {
//       console.error("Payment error:", err); // ✅ Log the error to use `err`
//       alert("Error processing payment");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
//         <Loader className="animate-spin h-12 w-12 text-red-500" />
//       </div>
//     );
//   }

//   if (!isAuthenticated || !user) {
//     return (
//       <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
//         <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
//         <a href="/login" className="px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600">
//           Login
//         </a>
//       </div>
//     );
//   }

//   return (
//     <div className="p-6 md:p-10 bg-gray-900 min-h-screen text-white">
//       <h1 className="text-3xl font-bold">Welcome, {user.name || user.email.split('@')[0]}</h1>
//       <p className="text-gray-400">{user.email}</p>

//       {user.role && <p className="text-gray-400 mt-1">Account Type: {user.role}</p>}

//       <p className="mt-4 flex items-center space-x-2">
//         <strong className="text-lg">Membership Status:</strong>
//         {membershipStatus === "Active" ? (
//           <span className="text-green-400 flex items-center">
//             <CheckCircle className="h-5 w-5 mr-1" /> Active
//           </span>
//         ) : (
//           <span className="text-red-400 flex items-center">
//             <XCircle className="h-5 w-5 mr-1" /> Inactive
//           </span>
//         )}
//       </p>

//       <h2 className="text-2xl font-bold my-6 text-center">Choose a Membership Plan</h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
//         {MEMBERSHIP_PLANS.map((plan) => (
//           <div
//             key={plan.name}
//             className={`p-6 rounded-lg cursor-pointer ${
//               selectedPlan?.name === plan.name ? "border-2 border-red-500 bg-gray-700" : "border border-gray-600 bg-gray-800 hover:border-red-400"
//             }`}
//             onClick={() => handleSelectPlan(plan)}
//           >
//             <h3 className="text-xl font-semibold text-center">{plan.name}</h3>
//             <p className="text-gray-300 text-center mt-2 text-lg">₹{plan.price}</p>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={handlePayment}
//         disabled={membershipStatus === "Active"}
//         className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg ${
//           membershipStatus === "Active" ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
//         }`}
//       >
//         {membershipStatus === "Active" ? "Membership Active" : "Proceed to Payment"}
//       </button>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Loader, CheckCircle, XCircle } from "lucide-react";
import useUserStore from "../../../stores/userStore";
import { useSearchParams } from "next/navigation";

const MEMBERSHIP_PLANS = [
  { name: "Monthly", price: 1000 },
  { name: "Quarterly", price: 2500 },
  { name: "Annual", price: 5000 },
];

export default function DashboardHome() {
  const { user, isAuthenticated } = useUserStore();
  const [loading, setLoading] = useState(true);
  const [membershipStatus, setMembershipStatus] = useState<"Active" | "Inactive">("Inactive");
  const [selectedPlan, setSelectedPlan] = useState<{ name: string; price: number } | null>(null);
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState({
    isChecking: false,
    message: "",
    success: false,
  });

  useEffect(() => {
    const fetchMembershipStatus = async () => {
      if (!isAuthenticated || !user) {
        setLoading(false);
        return;
      }

      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/status`,
          { withCredentials: true }
        );
        setMembershipStatus(data?.status || "Inactive");
      } catch (err) {
        if (axios.isAxiosError(err)) {
          toast.error(err.response?.data?.message || "Failed to load membership status");
        } else {
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchMembershipStatus();
  }, [isAuthenticated, user]);

  // Check payment status if redirected from payment
  useEffect(() => {
    const status = searchParams.get("status");
    const transactionId = searchParams.get("transactionId");

    if (transactionId) {
      const checkPaymentStatus = async () => {
        setPaymentStatus({ isChecking: true, message: "Checking payment status...", success: false });
        
        try {
          const { data } = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/payment-status?transactionId=${transactionId}`,
            { withCredentials: true }
          );

          if (data.status === "Active") {
            setPaymentStatus({
              isChecking: false,
              message: `Your ${data.plan} membership is now active! Valid until ${new Date(data.expiryDate).toLocaleDateString()}`,
              success: true,
            });
            setMembershipStatus("Active");
          } else {
            setPaymentStatus({
              isChecking: false,
              message: "Payment was not successful. Please try again.",
              success: false,
            });
          }
        } catch (err) {
          setPaymentStatus({
            isChecking: false,
            message: "Error checking payment status",
            success: false,
          });
        }
      };

      checkPaymentStatus();
    }
  }, [searchParams]);

  const handleSelectPlan = (plan: { name: string; price: number }) => setSelectedPlan(plan);

  const handlePayment = async () => {
    if (!selectedPlan) {
      toast.error("Please select a membership plan");
      return;
    }

    try {
      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/api/pay`,
        { plan: selectedPlan.name, amount: selectedPlan.price },
        { withCredentials: true }
      );

      if (data.paymentUrl) {
        window.location.href = data.paymentUrl;
      } else {
        toast.error("Payment initialization failed. Try again");
      }
    } catch (err) {
      console.error("Payment error:", err);
      toast.error("Error processing payment");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
        <Loader className="animate-spin h-12 w-12 text-red-500" />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Please log in to access your dashboard</h1>
        <a href="/login" className="px-6 py-3 bg-red-500 rounded-lg hover:bg-red-600">
          Login
        </a>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-3xl font-bold">Welcome, {user.name || user.email.split('@')[0]}</h1>
      <p className="text-gray-400">{user.email}</p>

      {user.role && <p className="text-gray-400 mt-1">Account Type: {user.role}</p>}

      {paymentStatus.message && (
        <div className={`mt-4 p-4 rounded-lg ${paymentStatus.success ? "bg-green-800" : "bg-red-800"}`}>
          <p className="flex items-center">
            {paymentStatus.success ? (
              <CheckCircle className="h-5 w-5 mr-2" />
            ) : (
              <XCircle className="h-5 w-5 mr-2" />
            )}
            {paymentStatus.message}
          </p>
        </div>
      )}

      <p className="mt-4 flex items-center space-x-2">
        <strong className="text-lg">Membership Status:</strong>
        {membershipStatus === "Active" ? (
          <span className="text-green-400 flex items-center">
            <CheckCircle className="h-5 w-5 mr-1" /> Active
          </span>
        ) : (
          <span className="text-red-400 flex items-center">
            <XCircle className="h-5 w-5 mr-1" /> Inactive
          </span>
        )}
      </p>

      <h2 className="text-2xl font-bold my-6 text-center">Choose a Membership Plan</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {MEMBERSHIP_PLANS.map((plan) => (
          <div
            key={plan.name}
            className={`p-6 rounded-lg cursor-pointer ${
              selectedPlan?.name === plan.name ? "border-2 border-red-500 bg-gray-700" : "border border-gray-600 bg-gray-800 hover:border-red-400"
            }`}
            onClick={() => handleSelectPlan(plan)}
          >
            <h3 className="text-xl font-semibold text-center">{plan.name}</h3>
            <p className="text-gray-300 text-center mt-2 text-lg">₹{plan.price}</p>
          </div>
        ))}
      </div>

      <button
        onClick={handlePayment}
        disabled={membershipStatus === "Active" || paymentStatus.isChecking}
        className={`w-full mt-8 py-3 rounded-lg font-semibold text-lg ${
          membershipStatus === "Active" || paymentStatus.isChecking
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-red-500 hover:bg-red-600"
        }`}
      >
        {membershipStatus === "Active"
          ? "Membership Active"
          : paymentStatus.isChecking
          ? "Checking Payment..."
          : "Proceed to Payment"}
      </button>
    </div>
  );
}