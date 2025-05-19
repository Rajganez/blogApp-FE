import { LiaBlogSolid } from "react-icons/lia";
import { IoIosLogOut } from "react-icons/io";

const Navbar = () => {
  return (
    <>
      <nav className="rounded-2xl w-screen h-20 flex flex-row justify-between lg:px-10 px-5 pt-5 border-b z-50 bg-blue-950">
        <div className="text-red-500 flex flex-row gap-2 text-xl">
          <LiaBlogSolid className="text-2xl lg:text-3xl" />
          <span className="text-red-300 text-xl lg:text-2xl">Blogcom</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
