import { useState } from "react";
import LoginForm from "./LoginForm";

const AuthForm = () => {
  const [activeTab, setActiveTab] = useState("SignIn");

  return (
    <div className="flex flex-col items-center lg:mt-36 mt-10">
      <div className="md:w-full font-mono">
        <div className="grid grid-cols-2 md:w-full bg-gray-800 text-white rounded-md overflow-hidden">
          <button
            onClick={() => setActiveTab("SignIn")}
            className={`cursor-pointer py-2 px-4 text-center transition-all duration-300 ${
              activeTab === "SignIn"
                ? "bg-[#64ffda] text-black font-semibold"
                : "bg-transparent hover:bg-gray-700"
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setActiveTab("SignUp")}
            className={`cursor-pointer py-2 px-4 text-center transition-all duration-300 ${
              activeTab === "SignUp"
                ? "bg-[#64ffda] text-black font-semibold"
                : "bg-transparent hover:bg-gray-700"
            }`}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-full mt-6">
        {activeTab === "SignIn" && <LoginForm role="SignIn" />}
        {activeTab === "SignUp" && <LoginForm role="SignUp" />}
      </div>
    </div>
  );
};

export default AuthForm;
