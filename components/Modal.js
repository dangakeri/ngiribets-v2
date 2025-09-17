// "use client";

// import { useState, useEffect, useCallback } from "react";
// import { API_URL } from "../utils/config";
// import Router from "next/router";
// import { useUser } from "../contexts/UserContext";
// import axios from "axios";

// const Modal = ({ isOpen, onClose, defaultTab = "deposit" }) => {
//   const [activeTab, setActiveTab] = useState(defaultTab);
//   const [depositAmount, setDepositAmount] = useState("");
//   const [verifyCode, setVerifyCode] = useState("");
//   const [withdrawAmount, setWithdrawAmount] = useState("");
//   const [response, setResponse] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [responseTimer, setResponseTimer] = useState(null);

//   const { user, setUser } = useUser();

//   const handleOutsideClick = useCallback(
//     (event) => {
//       if (event.target.id === "modal-overlay") {
//         onClose();
//       }
//     },
//     [onClose]
//   );

//   useEffect(() => {
//     if (isOpen) {
//       setActiveTab(defaultTab);
//       document.addEventListener("mousedown", handleOutsideClick);
//     } else {
//       document.removeEventListener("mousedown", handleOutsideClick);
//     }
//     return () => document.removeEventListener("mousedown", handleOutsideClick);
//   }, [isOpen, handleOutsideClick, defaultTab]);

//   if (!isOpen) return null;

//   const handleAmountClick = (value) => {
//     if (activeTab === "deposit") {
//       setDepositAmount(value);
//     } else if (activeTab === "withdraw") {
//       setWithdrawAmount(value);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     switch (activeTab) {
//       case "deposit":
//         setDepositAmount(value);
//         break;
//       case "verify":
//         setVerifyCode(value);
//         break;
//       case "withdraw":
//         setWithdrawAmount(value);
//         break;
//       default:
//         break;
//     }
//   };

//   const fetchUserData = async () => {
//     const token = localStorage.getItem("token");
//     try {
//       const res = await axios.get(`${API_URL}/api/auth/user`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       if (res.data) {
//         setUser(res.data);
//         localStorage.setItem("user", JSON.stringify(res.data));
//       }
//     } catch (err) {
//       console.error("Failed to refresh user:", err);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const token = localStorage.getItem("token");
//     if (!token) {
//       Router.push("/login");
//       return;
//     }

//     let url = `${API_URL}`;
//     let body = {};
//     switch (activeTab) {
//       case "deposit":
//         url += "/api/wallet/deposit";
//         body = { amount: depositAmount };
//         break;
//       case "verify":
//         url += "/api/wallet/verify";
//         body = { code: verifyCode };
//         break;
//       case "withdraw":
//         url += "/api/wallet/withdraw";
//         body = { amount: withdrawAmount };
//         break;
//       default:
//         return;
//     }

//     setLoading(true);

//     setTimeout(async () => {
//       try {
//         const response = await fetch(url, {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(body),
//         });

//         const result = await response.json();
//         setResponse(result.message || "Submission successful");

//         if (activeTab === "withdraw") {
//           await fetchUserData();
//         }
//       } catch (error) {
//         setResponse("Error submitting data");
//       } finally {
//         setLoading(false);
//       }

//       if (responseTimer) clearTimeout(responseTimer);
//       const timer = setTimeout(() => setResponse(""), 5000);
//       setResponseTimer(timer);
//     }, 3000);
//   };

//   return (
//     <div
//       id="modal-overlay"
//       className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
//     >
//       <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg w-11/12 max-w-md p-5">
//         {/* Tabs */}
//         <div className="flex justify-around mb-4">
//           {["deposit", "verify", "withdraw"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => setActiveTab(tab)}
//               className={`px-3 py-1 rounded font-medium transition-colors ${
//                 activeTab === tab
//                   ? "border-b-2 border-orange-500 text-orange-500"
//                   : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
//               }`}
//             >
//               {tab.charAt(0).toUpperCase() + tab.slice(1)}
//             </button>
//           ))}
//         </div>

//         <hr className="border-gray-300 dark:border-gray-700 mb-4" />

//         {/* Content */}
//         <div>
//           {activeTab === "deposit" && (
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <div className="flex gap-2">
//                 {[100, 200, 500, 1000].map((value) => (
//                   <button
//                     key={value}
//                     type="button"
//                     onClick={() => handleAmountClick(value)}
//                     className="flex-1 bg-gray-100 dark:bg-gray-800 text-sm rounded py-2 hover:bg-gray-200 dark:hover:bg-gray-700"
//                   >
//                     {value}
//                   </button>
//                 ))}
//               </div>
//               <input
//                 type="number"
//                 name="depositAmount"
//                 value={depositAmount}
//                 onChange={handleChange}
//                 placeholder="Enter amount"
//                 className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Deposit"}
//               </button>
//               <div className="text-xs text-gray-500 mt-2">
//                 Paybill: 4474747 <br />
//                 Account: {user?.phone || "Not available"}
//               </div>
//             </form>
//           )}

//           {activeTab === "verify" && (
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="text"
//                 name="verifyCode"
//                 value={verifyCode}
//                 onChange={handleChange}
//                 placeholder="SI64NTAX4U"
//                 className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Verify"}
//               </button>
//               <div className="text-xs text-gray-500 mt-2">
//                 In case of unsuccessful deposit, enter the Mpesa code sent to
//                 your phone, e.g., SI64NTAX4U
//               </div>
//             </form>
//           )}

//           {activeTab === "withdraw" && (
//             <form onSubmit={handleSubmit} className="space-y-3">
//               <input
//                 type="number"
//                 name="withdrawAmount"
//                 value={withdrawAmount}
//                 onChange={handleChange}
//                 placeholder="Enter amount"
//                 className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-700"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600"
//                 disabled={loading}
//               >
//                 {loading ? "Loading..." : "Withdraw"}
//               </button>
//               <div className="text-xs text-gray-500 mt-2">
//                 1. Only MPESA supported <br />
//                 2. No withdrawal charges <br />
//                 3. Minimum withdrawal is KES 100
//               </div>
//             </form>
//           )}

//           {response && (
//             <div className="mt-3 text-center text-sm font-medium text-green-600">
//               {response}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Modal;

"use client";

import { useState, useEffect, useCallback } from "react";
import { API_URL } from "../utils/config";
import Router from "next/router";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import { FaWallet, FaCheckCircle, FaMoneyBillWave } from "react-icons/fa";

const Modal = ({ isOpen, onClose, defaultTab = "deposit" }) => {
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [depositAmount, setDepositAmount] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseTimer, setResponseTimer] = useState(null);

  const { user, setUser } = useUser();

  const handleOutsideClick = useCallback(
    (event) => {
      if (event.target.id === "modal-overlay") {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      setActiveTab(defaultTab);
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [isOpen, handleOutsideClick, defaultTab]);

  if (!isOpen) return null;

  const handleAmountClick = (value) => {
    if (activeTab === "deposit") {
      setDepositAmount(value);
    } else if (activeTab === "withdraw") {
      setWithdrawAmount(value);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (activeTab === "deposit") setDepositAmount(value);
    if (activeTab === "verify") setVerifyCode(value);
    if (activeTab === "withdraw") setWithdrawAmount(value);
  };

  const fetchUserData = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${API_URL}/api/auth/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.data) {
        setUser(res.data);
        localStorage.setItem("user", JSON.stringify(res.data));
      }
    } catch (err) {
      console.error("Failed to refresh user:", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      Router.push("/login");
      return;
    }

    let url = `${API_URL}`;
    let body = {};
    if (activeTab === "deposit") {
      url += "/api/wallet/deposit";
      body = { amount: depositAmount };
    } else if (activeTab === "verify") {
      url += "/api/wallet/verify";
      body = { code: verifyCode };
    } else if (activeTab === "withdraw") {
      url += "/api/wallet/withdraw";
      body = { amount: withdrawAmount };
    }

    setLoading(true);

    setTimeout(async () => {
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        });

        const result = await response.json();
        setResponse(result.message || "Submission successful");

        if (activeTab === "withdraw") {
          await fetchUserData();
        }
      } catch (error) {
        setResponse("Error submitting data");
      } finally {
        setLoading(false);
      }

      if (responseTimer) clearTimeout(responseTimer);
      const timer = setTimeout(() => setResponse(""), 5000);
      setResponseTimer(timer);
    }, 1500);
  };

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black/70 flex justify-center items-center z-50 animate-fadeIn"
    >
      <div
        className="rounded-2xl shadow-2xl w-11/12 max-w-md p-6 animate-slideUp border border-white/10"
        style={{ backgroundColor: "#1d2933" }}
      >
        {/* Tabs */}
        <div className="flex justify-between mb-6 bg-gray-800/40 rounded-lg overflow-hidden">
          {[
            { key: "deposit", label: "Deposit", icon: <FaWallet /> },
            { key: "verify", label: "Verify", icon: <FaCheckCircle /> },
            { key: "withdraw", label: "Withdraw", icon: <FaMoneyBillWave /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                activeTab === tab.key
                  ? "bg-[#a21cf0] text-white shadow-inner"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === "deposit" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex gap-2">
                {[100, 200, 500, 1000].map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => handleAmountClick(value)}
                    className="flex-1 bg-gray-800/70 text-gray-300 border-2 border-[#a21cf0] rounded-lg py-2 text-sm font-semibold hover:bg-gray-700 transition"
                  >
                    {value}
                  </button>
                ))}
              </div>
              <input
                type="number"
                name="depositAmount"
                value={depositAmount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full h-12 border border-gray-700 rounded-lg px-3 bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#a21cf0] outline-none"
                required
              />
              <button
                type="submit"
                className="w-full h-12 bg-[#a21cf0]  text-white rounded-lg font-semibold hover:scale-[1.02] transition-all shadow-md"
                disabled={loading}
              >
                {loading ? "Processing..." : "Deposit"}
              </button>
              <div className="text-xs text-gray-400 mt-2 text-center">
                Paybill: <span className="font-semibold">4474747</span> <br />
                Account: {user?.phone || "Not available"}
              </div>
            </form>
          )}

          {activeTab === "verify" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="verifyCode"
                value={verifyCode}
                onChange={handleChange}
                placeholder="e.g. SI64NTAX4U"
                className="w-full h-12 border border-gray-500 rounded-lg px-3 bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#a21cf0] outline-none"
                required
              />
              <button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-[#a21cf0] to-purple-700 text-white rounded-lg font-semibold hover:scale-[1.02] transition-all shadow-md"
                disabled={loading}
              >
                {loading ? "Verifying..." : "Verify"}
              </button>
              <p className="text-xs text-gray-400 mt-2 text-center">
                Enter the Mpesa code sent to your phone.
              </p>
            </form>
          )}

          {activeTab === "withdraw" && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="number"
                name="withdrawAmount"
                value={withdrawAmount}
                onChange={handleChange}
                placeholder="Enter amount"
                className="w-full h-12 border border-gray-700 rounded-lg px-3 bg-gray-800/80 text-white placeholder-gray-500 focus:ring-2 focus:ring-[#a21cf0] outline-none"
                required
              />
              <button
                type="submit"
                className="w-full h-12 bg-[#a21cf0] text-white rounded-lg font-semibold hover:scale-[1.02] transition-all shadow-md"
                disabled={loading}
              >
                {loading ? "Processing..." : "Withdraw"}
              </button>

              <div className="mt-4 bg-gray-800/50 border border-[#a21cf0]/40 rounded-lg p-3 text-xs text-gray-300 space-y-2">
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#a21cf0] text-sm" />
                  <span>Only MPESA supported</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#a21cf0] text-sm" />
                  <span>No withdrawal charges</span>
                </div>
                <div className="flex items-center gap-2">
                  <FaCheckCircle className="text-[#a21cf0] text-sm" />
                  <span>Minimum withdrawal: KES 100</span>
                </div>
              </div>
            </form>
          )}

          {response && (
            <div className="mt-4 text-center text-sm font-medium text-green-400 animate-fadeIn">
              {response}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
