// import { useSession } from "next-auth/react";
// import React, { useState } from "react";
import { FaAngleDown, FaAngleUp, FaBars, FaUserCircle } from "react-icons/fa";
import useLogOut from "../../../hooks/useLogOut";
import useToggle from "../../../hooks/useToggle";

function Header({ admin, username, showMenu, setShowMenu }) {
  // const { data } = useSession();

  // console.log("userid", data?.user?.username);

  // const username = data?.user?.username;

  // const [showUserMenu, setShowUserMenu] = useState(false);

  const { toggle, setToggle, node } = useToggle();

  const { logoutUser } = useLogOut();

  const handleLogout = () => {
    logoutUser();
  };

  return (
    <div className="sticky top-0 z-20">
      <div className="relative z-20">
        <div className="bg-white h-[68px] w-full flex justify-between lg:justify-end items-center shadow-md  px-7 z-30">
          {/* <div className="text-3xl font-semibold text-blue-600">Logo</div> */}
          <div
            className="text-custom-blue2 lg:hidden"
            onClick={() => setShowMenu(!showMenu)}
          >
            <FaBars size={20} />
          </div>

          <div className="text-xl text-custom-blue4 font-bold lg:hidden">
            Shannon Links
          </div>

          <div
            className="lg:hidden text-custom-blue2 p-1 rounded-full border-2 border-custom-blue2"
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? <FaAngleUp size={20} /> : <FaAngleDown size={20} />}
          </div>

          <div className="hidden lg:flex justify-between items-center gap-5 lg:gap-[200px]">
            <div className="flex justify-between items-center gap-2 lg:gap-20 text-custom-gray2 text-base font-semibold">
              <p className="">Username: {username}</p>
              <p className="">Role : {admin ? "Admin" : "Poster"}</p>
            </div>

            <button
              className="bg-custom-blue5 hover:bg-opacity-80 active:scale-95 text-sm text-white font-semibold px-2 py-1 lg:px-4 lg:py-2 rounded-md transition duration-200"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <div
        ref={node}
        className={`lg:hidden flex flex-col items-center bg-custom-blue5 absolute top-[68px] w-full py-7 text-sm text-white font-semibold shadow-md ease-out duration-300 z-10
            ${toggle ? "translate-y-0" : "-translate-y-full shadow-none"}`}
      >
        <p className="py-3">Username: {username}</p>
        <p className="py-3">Role : {admin ? "Admin" : "Poster"}</p>
        <button
          type="button"
          className="mt-2 px-5  py-3 bg-custom-blue hover:bg-opacity-80 text-sm rounded-lg active:scale-95 transition duration-200"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Header;
