import Swal from "sweetalert2";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import CustomButton from "./CustomButton";
import { UserModel } from "../models/UserModel";

interface NavbarProps {
  authUser: UserModel | null;
}

const Navbar = ({ authUser }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  const refHead = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const onToggleClick = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    window.onscroll = () => {
      const fixedNav: any = refHead.current?.offsetTop;

      if (window.pageYOffset > fixedNav) {
        refHead.current?.classList.add("navbar-fixed");
      } else {
        refHead.current?.classList.remove("navbar-fixed");
      }
    };
  }, []);

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      background: "#111",
      showCancelButton: true,
      confirmButtonText: "Logout",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        UserModel.logout();
        Swal.fire({
          icon: "success",
          background: "#111",
          title: "Log Out Success",
          showConfirmButton: false,
          timer: 1000,
        });
        navigate("/");
      }
    });
  };

  return (
    <nav>
      <div ref={refHead} className="bg-transparant absolute top-0 left-0 w-full flex items-center z-10 transition duration-100 ease-in-out pt-2">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link to="/" className="cursor-pointer text-primary font-bold text-lg block py-6 hover:text-white">
                CBS.
              </Link>
            </div>
            <div className="flex items-center px-4">
              <button type="button" className={toggle === true ? "block absolute right-4 hamburger-active lg:hidden" : "block absolute right-4 lg:hidden"} onClick={onToggleClick}>
                <span className="origin-top-left hamburger-line transition duration-300 ease-in-out"></span>
                <span className="hamburger-line transition duration-300 ease-in-out"></span>
                <span className="origin-bottom-left hamburger-line transition duration-300 ease-in-out"></span>
              </button>

              <nav
                className={
                  toggle === true
                    ? " absolute py-5 bg-bgColor border border-borderColor lg:border-0 shadow-lg rounded-lg max-w-[250px] w-full right-4 top-full lg:block lg:static lg:bg-transparent lg:max-w-full lg:shadow-none lg:py-0"
                    : " hidden lg:block lg:static lg:bg-transparent lg:max-w-full"
                }
              >
                <ul className="block lg:flex">
                  {authUser ? (
                    <>
                      <li className="group">
                        <Link to="/" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                          Home Page
                        </Link>
                      </li>
                      <li className="group">
                        <Link to="/playingNow" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                          Playing Now
                        </Link>
                      </li>
                      <li className="group">
                          <Link to="/userDashboard" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                            User Dashboard
                          </Link>
                        </li>
                      {authUser.isAdmin && (
                        <li className="group">
                          <Link to="/adminDashboard" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                            Admin Dashboard
                          </Link>
                        </li>
                      )}
                      <li className="group">
                        <CustomButton btnType="submit" title="Logout" containerStyles="ml-5 lg:ml-0 border-borderColor bg-bgColor hover:border-primary lg:my-0 py-[10px]" textStyles="text-white" onClick={onLogout} />
                      </li>
                    </>
                  ) : (
                    <li className="group">
                      <CustomButton btnType="button" title="Login" to="/login" containerStyles="border-black bg-white hover:bg-[#ededed]" textStyles="text-black hover:text-[#262626]" />
                    </li>
                  )}
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
