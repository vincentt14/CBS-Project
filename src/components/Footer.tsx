import { Link } from "react-router-dom";
import { useState } from "react";

const Footer = () => {
  const [login, setLogin] = useState(true);

  return (
    <footer className="border-t border-borderColor bg-bgColor pt-24 pb-5">
      <div className="container">
        <div className="flex flex-wrap">
          <div className="mb-12 w-full flex-col place-items-center font-medium md:flex md:w-1/3">
            <ul>
              <h2 className="py-1 text-4xl font-bold bg-gradient-to-r from-red-600 to-secondary inline-block text-transparent bg-clip-text">Employee Management</h2>
              <hr className="w-[150px] my-3 p-1 bg-bgColor border border-borderColor rounded-sm" />
              <h3 className="mb-2 text-2xl font-bold text-white">Founder</h3>
              <p className="text-primary">Vincent</p>
              <p className="text-primary">Software Engineer</p>
              <p className="text-primary">stefanuslim@gmail.com</p>
            </ul>
          </div>
          <div className="mb-12 w-full flex-col place-items-center md:flex md:w-1/3">
            <ul className="text-slate-400">
              <h3 className="mb-5 mt-4 text-xl font-semibold text-white">Shortcuts</h3>
              <li>
                <a href="/" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  Home
                </a>
              </li>
              {login && (
                <>
                  <li>
                    <Link to="/attend" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                      Attend
                    </Link>
                  </li>
                  <li>
                    <Link to="/employeeManagement" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                      Employee Management
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="mb-12 w-full flex-col place-items-center md:flex md:w-1/3">
            <ul className="text-slate-400">
              <h3 className="mb-5 mt-4 text-xl font-semibold text-white">About Founder</h3>
              <li>
                <a href="https://github.com/vincentt14" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://vincentt14.github.io/" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  Portfolio
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/in/vincentt14/" target="blank" className="mb-2 inline-block text-base text-primary hover:text-secondary">
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-full">
          <p className="text-center text-sm font-medium text-primary">Copyright © 2023</p>
          <p className="font-medium text-sm text-primary text-center">
            <span className="text-white ">Vincent</span> | Build Using <span className="text-white">Next.js</span> | <span className="text-white">TypeScript</span> | <span className="text-white">Firebase</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
