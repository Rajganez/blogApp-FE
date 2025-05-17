// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import AuthForm from "../components/authComponents/AuthForm";
import { LiaBlogSolid } from "react-icons/lia";

const containerVariants = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const letterVariants = {
  hidden: { opacity: 0, y: `0.25em` },
  visible: {
    opacity: 1,
    y: `0em`,
    transition: {
      duration: 0.4,
      ease: [0.2, 0.65, 0.3, 0.9],
    },
  },
};

// In this Component divided into two Left for welcome message and Right for Sign In and Sign Up
const Home = () => {
  const text = "Welcome to Bloggers\nCommunity!";

  return (
    <div className="bg-gradient-to-tl from-blue-950 to-blue-900 w-screen h-screen">
      <div className="lg:h-1/2 lg:flex lg:flex-row lg:justify-between lg:px-32 px-5">
        {/* Left: Welcome Message with Animation */}
        <motion.div className="text-[#f0f8ff] md:flex md:items-center md:text-4xl text-2xl font-bold leading-snug">
          <motion.div
            className="block"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="text-red-500 flex flex-row gap-2 text-xl lg:pt-0 pt-10">
              <LiaBlogSolid className="text-2xl"/>
              <span className="text-red-300">Blogcom</span>
            </div>
            {text.split("").map((char, i) => {
              if (char === "\n") {
                return <br key={`br-${i}`} />;
              } else if (char === " ") {
                return (
                  <motion.span key={i} variants={letterVariants}>
                    {"\u00A0"}
                  </motion.span>
                );
              } else {
                return (
                  <motion.span key={i} variants={letterVariants}>
                    {char}
                  </motion.span>
                );
              }
            })}
          </motion.div>
        </motion.div>

        {/* Right: Sign up and Sign in Content  */}
        <div className="self-start">
          <AuthForm />
        </div>
      </div>
    </div>
  );
};

export default Home;
