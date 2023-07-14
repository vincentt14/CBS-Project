import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import { logout } from "../utils/authentication";
import Swal from "sweetalert2";

interface NavbarProps {
  authUser: string;
}

const Navbar = ({ authUser }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  const onToggleClick = () => {
    setToggle(!toggle);
  };

  const onLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes",
      confirmButtonColor: "#000",
      cancelButtonText: "Cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        logout();
      }
    });
  };

  return (
    <nav>
      <div className="absolute top-0 left-0 w-full flex items-center z-10 pt-2 border-b-2">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link to="/" className="cursor-pointer text-primary font-bold text-lg block py-6 hover:text-secondary">
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
                        <Link to="/attend" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                          Attend
                        </Link>
                      </li>
                      <li className="group">
                        <Link to="/employeeManagement" className="cursor-pointer text-primary text-base py-2 mx-8 flex group-hover:text-secondary" onClick={onToggleClick}>
                          employee Management
                        </Link>
                      </li>
                      <li className="group">
                        <CustomButton btnType="submit" title="Logout" containerStyles="ml-5 lg:ml-0 border-borderColor bg-bgColor hover:border-primary lg:my-0 py-[10px]" textStyles="text-secondary" onClick={onLogout} />
                      </li>
                    </>
                  ) : (
                    <li className="group">
                      <CustomButton btnType="button" title="Login" to="/login" containerStyles="bg-black hover:bg-borderColor lg:my-0 py-[10px]" textStyles="text-white" />
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
