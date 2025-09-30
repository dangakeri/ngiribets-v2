import { useState, useEffect } from "react";
import Router from "next/router";

import { FaUserCircle, FaArrowRight, FaSignOutAlt } from "react-icons/fa";
import FooterContent from "../components/footerContent";
import Footer from "../components/footer";
import Modal from "../components/Modal";
import UserLinkModal from "../components/linkModal";
import { useUser } from "../contexts/UserContext";
import NotificationListener from "../components/listener";
import Header from "../components/authenticated";

const Profile = () => {
  const { setUser, user } = useUser();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUserLinkModalOpen, setIsUserLinkModalOpen] = useState(false);
  const [userLink, setUserLink] = useState("");
  const [activeTab, setActiveTab] = useState("deposit");

  const openModal = (tab) => {
    setActiveTab(tab);
    setIsModalOpen(true);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    Router.push("/login");
  };

  useEffect(() => {
    if (user) {
      setUserLink(`https://ngiribets.com/register?ref=${user._id}`);
    }
  }, [user]);

  useEffect(() => {
    if (!user) {
      Router.push("/login");
    }
  }, [user]);

  // Settings items
  const settings = (router) => [
    {
      title: "Transactions",
      icon: "💳",
      onClick: () => router.push("/transactions"),
    },
    {
      title: "Deposit Unsuccessful?",
      icon: "⚠️",
      onClick: () => openModal("verify"),
    },
    {
      title: "Refer and Earn",
      icon: "🎁",
      onClick: () => setIsUserLinkModalOpen(true),
    },
    {
      title: "Change Password",
      icon: "🔑",
      onClick: () => router.push("/change_password"),
    },
    {
      title: "Delete Account",
      icon: "🗑️",
      onClick: () => router.push("/deleteAccount"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NotificationListener />
      <Header />
      <div className="p-4 md:p-8 max-w-4xl mx-auto flex flex-col gap-8">
        {/* --- Wallet Section --- */}
        <div className="bg-[#a21cf0] text-white rounded-2xl p-6 shadow-lg flex flex-col gap-6">
          {/* Profile & Phone */}
          <div className="flex items-center gap-4">
            <FaUserCircle className="text-5xl text-white/90" />
            <div>
              <p className="text-sm opacity-80">Phone</p>
              <p className="text-lg font-semibold">{user?.phone ?? "..."}</p>
            </div>
          </div>

          {/* Balance Info */}
          <div className="grid grid-cols-2 gap-6 text-center">
            <div>
              <p className="text-sm opacity-80">Balance</p>
              <p className="text-2xl font-bold">
                KES{" "}
                {typeof user?.balance === "number"
                  ? user.balance.toFixed(1)
                  : "0.0"}
              </p>
            </div>
            <div>
              <p className="text-sm opacity-80">Bonus</p>
              <p className="text-2xl font-bold">KES 0.0</p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex gap-3 flex-col sm:flex-row">
            {[
              { title: "Deposit", action: () => openModal("deposit") },
              { title: "Withdraw", action: () => openModal("withdraw") },
            ].map((item) => (
              <button
                key={item.title}
                onClick={item.action}
                className="flex-1 py-3 font-bold border border-white rounded-xl shadow-md bg-background text-white hover:bg-background/90"
              >
                {item.title}
              </button>
            ))}
          </div>
        </div>

        {/* --- Settings Section --- */}
        <div>
          <h2 className="text-lg font-semibold mb-3">Settings & More</h2>
          <div className="flex flex-col divide-y divide-[#a21cf0] border border-[#a21cf0] rounded-xl overflow-hidden">
            {settings(Router).map((item) => (
              <button
                key={item.title}
                onClick={item.onClick}
                className="flex items-center justify-between p-4 bg-[##303d4a] transition hover:bg-[#1d2933]/80"
              >
                <div className="flex items-center gap-3">
                  <div className="text-xl text-[#a21cf0]">{item.icon}</div>
                  <p className="text-sm font-medium text-white">{item.title}</p>
                </div>
                <FaArrowRight className="text-[#a21cf0]" />
              </button>
            ))}
          </div>
        </div>

        {/* --- Logout --- */}
        <div className="w-full ">
          <button
            onClick={logout}
            className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-red-600 text-white hover:bg-red-700 shadow-lg font-semibold w-full"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      </div>
      <FooterContent />
      {/* Modals */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        defaultTab={activeTab}
      />
      <UserLinkModal
        isOpen={isUserLinkModalOpen}
        onClose={() => setIsUserLinkModalOpen(false)}
        userLink={userLink}
      />

      <Footer />
    </div>
  );
};

export default Profile;
