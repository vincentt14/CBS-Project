import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import CustomButton from "./CustomButton";

const Navbar = () => {
  const [login, setLogin] = useState(true);
  const [toggle, setToggle] = useState(false);
  const refHead = useRef<HTMLDivElement>(null);

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

  const onToggleClick = () => {
    setToggle(!toggle);
  };

  return (
    <nav>
      <div ref={refHead} className="bg-transparant absolute top-0 left-0 w-full flex items-center z-10 transition duration-150 ease-in-out pt-2">
        <div className="container">
          <div className="flex items-center justify-between relative">
            <div className="px-4">
              <Link to="/" className="cursor-pointer text-primary font-bold text-lg block py-6 hover:text-white">
                Employee Management.
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
                  {login && (
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
                    </>
                  )}
                  <li className="group">
                    <CustomButton
                      title={login ? "Logout" : "Login"}
                      to={login ? "/logout" : "/login"}
                      containerStyles={login ? "ml-5 lg:ml-0 border-borderColor bg-bgColor hover:border-primary lg:my-0 py-[10px]" : "border-black bg-white hover:bg-[#ededed] lg:my-0 py-[10px]"}
                      textStyles={login ? "text-white" : "text-black hover:text-[#262626]"}
                    />
                  </li>
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
