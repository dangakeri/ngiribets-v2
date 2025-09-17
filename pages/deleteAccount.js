// import { useState, useEffect } from "react";
// import Router from "next/router";
// import axios from "axios";

// import Footer from "../components/footer";
// import CustomNotification from "../components/notification";
// import { API_URL } from "../utils/config";

// export default function DeleteAccount() {
//   const [surname, setSurname] = useState("");
//   const [givenNames, setGivenNames] = useState("");
//   const [accountNumber, setAccountNumber] = useState("");
//   const [phoneNumber, setPhoneNumber] = useState("");
//   const [idNumber, setIdNumber] = useState("");
//   const [reason, setReason] = useState("");
//   const [otherReason, setOtherReason] = useState("");
//   const [attachment, setAttachment] = useState(null);
//   const [notification, setNotification] = useState({ message: "", type: "" });
//   const [loading, setLoading] = useState(false);

//   const handleDeleteAccount = async (e) => {
//     e.preventDefault();
//     if (
//       !surname ||
//       !givenNames ||
//       !accountNumber ||
//       !phoneNumber ||
//       !idNumber ||
//       !reason
//     ) {
//       setNotification({
//         message: "Please fill in all required fields.",
//         type: "error",
//       });
//       return;
//     }

//     setNotification({ message: "", type: "" });
//     setLoading(true);

//     try {
//       const token = localStorage.getItem("token");
//       const formData = new FormData();
//       formData.append("surname", surname);
//       formData.append("given_names", givenNames);
//       formData.append("account_number", accountNumber);
//       formData.append("phone_number", phoneNumber);
//       formData.append("id_number", idNumber);
//       formData.append("reason", reason);
//       formData.append("other_reason", otherReason);
//       if (attachment) formData.append("attachment", attachment);

//       const response = await axios.post(
//         `${API_URL}/api/auth/delete_account`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "multipart/form-data",
//           },
//         }
//       );

//       setNotification({ message: response?.data?.message, type: "success" });
//     } catch (error) {
//       setNotification({
//         message: error.response?.data?.message || "An error occurred",
//         type: "error",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (notification.message) {
//       const timer = setTimeout(
//         () => setNotification({ message: "", type: "" }),
//         3000
//       );
//       return () => clearTimeout(timer);
//     }
//   }, [notification.message]);

//   return (
//     <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900">
//       <div className="flex-1 max-w-3xl mx-auto px-4 py-8">
//         <h4 className="text-xl font-semibold mb-6 text-gray-800 dark:text-gray-200">
//           Account Deletion Request
//         </h4>

//         <form onSubmit={handleDeleteAccount} className="space-y-4">
//           {/* Surname */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Surname
//             </label>
//             <input
//               type="text"
//               value={surname}
//               onChange={(e) => setSurname(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Given Names */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Given Names
//             </label>
//             <input
//               type="text"
//               value={givenNames}
//               onChange={(e) => setGivenNames(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Account Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Account Number
//             </label>
//             <input
//               type="text"
//               value={accountNumber}
//               onChange={(e) => setAccountNumber(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Phone Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Registered Phone Number
//             </label>
//             <input
//               type="text"
//               value={phoneNumber}
//               onChange={(e) => setPhoneNumber(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* ID Number */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               ID Number
//             </label>
//             <input
//               type="text"
//               value={idNumber}
//               onChange={(e) => setIdNumber(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             />
//           </div>

//           {/* Reason */}
//           <div>
//             <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//               Reason for Deletion
//             </label>
//             <select
//               value={reason}
//               onChange={(e) => setReason(e.target.value)}
//               required
//               className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//             >
//               <option value="">Select a reason</option>
//               <option value="Addiction">Addiction</option>
//               <option value="Gambling Harm">Gambling Harm</option>
//               <option value="Financial Constraints">
//                 Financial Constraints
//               </option>
//               <option value="Dissatisfaction">Dissatisfaction</option>
//               <option value="Other">Other (Specify)</option>
//             </select>
//           </div>

//           {/* Other Reason */}
//           {reason === "Other" && (
//             <div>
//               <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Specify the Reason
//               </label>
//               <input
//                 type="text"
//                 value={otherReason}
//                 onChange={(e) => setOtherReason(e.target.value)}
//                 className="w-full border rounded px-3 py-2 text-sm dark:bg-gray-700 dark:text-white"
//               />
//             </div>
//           )}
//         </form>

//         {/* Delete Button */}
//         <div className="mt-6">
//           <button
//             onClick={handleDeleteAccount}
//             disabled={loading}
//             className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
//           >
//             {loading ? "Processing..." : "Delete My Account"}
//           </button>
//         </div>

//         {/* Info Section */}
//         <div className="mt-8 text-sm text-gray-700 dark:text-gray-300 space-y-4">
//           <h5 className="font-semibold">Attachments</h5>
//           <p>
//             Kindly submit the following documents via email to{" "}
//             <strong>support@ngiribets.com</strong> with the title:
//             <br />
//             <em>Account closure for [Your Account Number]</em>
//           </p>
//           <ul className="list-disc pl-5">
//             <li>Copy of National ID (both sides)</li>
//             <li>At least 3 months M-Pesa statement</li>
//           </ul>

//           <h5 className="font-semibold mt-4">Important Notes</h5>
//           <p>
//             Ngiribets may request additional documents under AML laws before
//             deletion. Incorrect or incomplete info may delay your request. By
//             clicking <strong>Delete My Account</strong> you confirm acceptance
//             of these conditions.
//           </p>
//         </div>

//         {/* Notification */}
//         {notification.message && (
//           <div className="mt-4">
//             <CustomNotification
//               message={notification.message}
//               type={notification.type}
//               onClose={() => setNotification({ message: "", type: "" })}
//             />
//           </div>
//         )}
//       </div>

//       <Footer />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import Router from "next/router";
import axios from "axios";

import Footer from "../components/footer";
import CustomNotification from "../components/notification";
import { API_URL } from "../utils/config";
import { FaTrashAlt } from "react-icons/fa";

export default function DeleteAccount() {
  const [surname, setSurname] = useState("");
  const [givenNames, setGivenNames] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [idNumber, setIdNumber] = useState("");
  const [reason, setReason] = useState("");
  const [otherReason, setOtherReason] = useState("");
  const [attachment, setAttachment] = useState(null);
  const [notification, setNotification] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const handleDeleteAccount = async (e) => {
    e.preventDefault();
    if (
      !surname ||
      !givenNames ||
      !accountNumber ||
      !phoneNumber ||
      !idNumber ||
      !reason
    ) {
      setNotification({
        message: "Please fill in all required fields.",
        type: "error",
      });
      return;
    }

    setNotification({ message: "", type: "" });
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("surname", surname);
      formData.append("given_names", givenNames);
      formData.append("account_number", accountNumber);
      formData.append("phone_number", phoneNumber);
      formData.append("id_number", idNumber);
      formData.append("reason", reason);
      formData.append("other_reason", otherReason);
      if (attachment) formData.append("attachment", attachment);

      const response = await axios.post(
        `${API_URL}/api/auth/delete_account`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setNotification({ message: response?.data?.message, type: "success" });
    } catch (error) {
      setNotification({
        message: error.response?.data?.message || "An error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(
        () => setNotification({ message: "", type: "" }),
        3000
      );
      return () => clearTimeout(timer);
    }
  }, [notification.message]);

  return (
    <div
      className="min-h-screen flex flex-col mb-12 sm:mb-10"
      style={{ backgroundColor: "#1d2933" }}
    >
      <div className="flex-1 max-w-3xl mx-auto px-4 py-10 text-gray-100">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <FaTrashAlt className="text-2xl text-red-500" />
          <h4 className="text-2xl font-bold">Account Deletion Request</h4>
        </div>

        {/* Form */}
        <form
          onSubmit={handleDeleteAccount}
          className="space-y-6 bg-[#303d4a] rounded-2xl p-6 shadow-lg"
        >
          {/* Surname */}
          <div>
            <label className="block text-sm font-medium mb-1">Surname</label>
            <input
              type="text"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Given Names */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Given Names
            </label>
            <input
              type="text"
              value={givenNames}
              onChange={(e) => setGivenNames(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Account Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Account Number
            </label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Registered Phone Number
            </label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* ID Number */}
          <div>
            <label className="block text-sm font-medium mb-1">ID Number</label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => setIdNumber(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Reason */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Reason for Deletion
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              required
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            >
              <option value="">Select a reason</option>
              <option value="Addiction">Addiction</option>
              <option value="Gambling Harm">Gambling Harm</option>
              <option value="Financial Constraints">
                Financial Constraints
              </option>
              <option value="Dissatisfaction">Dissatisfaction</option>
              <option value="Other">Other (Specify)</option>
            </select>
          </div>

          {/* Other Reason */}
          {reason === "Other" && (
            <div>
              <label className="block text-sm font-medium mb-1">
                Specify the Reason
              </label>
              <input
                type="text"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
              />
            </div>
          )}

          {/* Attachment */}
          <div>
            <label className="block text-sm font-medium mb-1">
              Upload Attachment (Optional)
            </label>
            <input
              type="file"
              onChange={(e) => setAttachment(e.target.files[0])}
              className="w-full border border-gray-600 rounded-lg px-3 py-2 text-sm bg-gray-900/70 focus:ring-2 focus:ring-red-500 outline-none"
            />
          </div>

          {/* Delete Button */}
          <div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 rounded-xl font-semibold shadow-md transition"
            >
              {loading ? "Processing..." : "Delete My Account"}
            </button>
          </div>
        </form>

        {/* Info Section */}
        <div className="mt-10 space-y-6 text-sm leading-relaxed text-gray-300">
          <div>
            <h5 className="font-semibold text-lg mb-2">Attachments</h5>
            <p>
              Kindly submit the following documents via email to{" "}
              <strong>support@ngiribets.com</strong> with the title:
              <br />
              <em>Account closure for [Your Account Number]</em>
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Copy of National ID (both sides)</li>
              <li>At least 3 months M-Pesa statement</li>
            </ul>
          </div>

          <div>
            <h5 className="font-semibold text-lg mb-2">Important Notes</h5>
            <p>
              Ngiribets may request additional documents under AML laws before
              deletion. Incorrect or incomplete info may delay your request. By
              clicking <strong>Delete My Account</strong>, you confirm
              acceptance of these conditions.
            </p>
          </div>
        </div>

        {/* Notification */}
        {notification.message && (
          <div className="mt-6">
            <CustomNotification
              message={notification.message}
              type={notification.type}
              onClose={() => setNotification({ message: "", type: "" })}
            />
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
